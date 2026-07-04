import { getDefaultState, loadState, saveState } from "./storage.js";

const cfg = window.VIAJE_JAPON_CONFIG || {};

const UI = {
  appTitle: document.getElementById("app-title"),
  appSubtitle: document.getElementById("app-subtitle"),
  appVersion: document.getElementById("app-version"),
  driveStatus: document.getElementById("drive-status"),
  saveStatus: document.getElementById("save-status"),
  btnDriveSignin: document.getElementById("btn-drive-signin"),
  btnDriveSignout: document.getElementById("btn-drive-signout"),
  statDaysCompleted: document.getElementById("stat-days-completed"),
  statPlacesProgress: document.getElementById("stat-places-progress"),
  statExpenseTotal: document.getElementById("stat-expense-total"),
  statLastUpdated: document.getElementById("stat-last-updated"),
  sidebarSummary: document.getElementById("sidebar-summary"),
  dayList: document.getElementById("day-list"),
  dayChip: document.getElementById("day-chip"),
  dayTitle: document.getElementById("day-title"),
  dayMeta: document.getElementById("day-meta"),
  dayCompleted: document.getElementById("day-completed"),
  dayProgress: document.getElementById("day-progress"),
  scheduleList: document.getElementById("schedule-list"),
  transportList: document.getElementById("transport-list"),
  placesList: document.getElementById("places-list"),
  btnMarkAllPlaces: document.getElementById("btn-mark-all-places"),
  dayJournal: document.getElementById("day-journal"),
  btnSaveJournal: document.getElementById("btn-save-journal"),
  dayNotes: document.getElementById("day-notes"),
  expenseForm: document.getElementById("expense-form"),
  expenseDay: document.getElementById("expense-day"),
  expensePaidBy: document.getElementById("expense-paid-by"),
  expenseTitle: document.getElementById("expense-title"),
  expenseAmount: document.getElementById("expense-amount"),
  expenseIsCommon: document.getElementById("expense-is-common"),
  expensesSummary: document.getElementById("expenses-summary"),
  expensesBody: document.getElementById("expenses-body"),
  activityList: document.getElementById("activity-list")
};

let appState = getDefaultState();
let selectedDayId = appState.days[0]?.id || null;
let saveQueue = Promise.resolve();

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(value) {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatDateTime(value) {
  if (!value) return "Sin registro";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(Number(value || 0));
}

function newId(prefix) {
  if (window.crypto && window.crypto.randomUUID) {
    return `${prefix}-${window.crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getSelectedDay() {
  return appState.days.find((day) => day.id === selectedDayId) || appState.days[0] || null;
}

function getDayLabel(day) {
  return `Dia ${day.number}`;
}

function countVisitedPlaces(day) {
  return day.places.filter((place) => place.done).length;
}

function computeStats() {
  const completedDays = appState.days.filter((day) => day.completed).length;
  const totalPlaces = appState.days.reduce((total, day) => total + day.places.length, 0);
  const visitedPlaces = appState.days.reduce((total, day) => total + countVisitedPlaces(day), 0);
  const totalExpense = appState.expenses.reduce((total, expense) => total + Number(expense.amount || 0), 0);
  return { completedDays, totalPlaces, visitedPlaces, totalExpense };
}

function setSaveStatus(message, isMuted = false) {
  if (!UI.saveStatus) return;
  UI.saveStatus.textContent = message;
  UI.saveStatus.classList.toggle("muted", isMuted);
}

function setDriveStatus(message, isMuted = false) {
  if (!UI.driveStatus) return;
  UI.driveStatus.textContent = message;
  UI.driveStatus.classList.toggle("muted", isMuted);
}

function updateSyncButtons() {
  const signedIn = Boolean(window.driveApi && window.driveApi.isSignedIn && window.driveApi.isSignedIn());
  UI.btnDriveSignin.classList.toggle("connected", signedIn);
  UI.btnDriveSignin.textContent = "Conectar Drive";
  if (UI.btnDriveSignout) {
    UI.btnDriveSignout.disabled = !signedIn;
  }
}

function renderAppHeader() {
  if (UI.appTitle) {
    UI.appTitle.textContent = appState.meta.title || "Viaje simiesco japonesil";
  }
  if (UI.appSubtitle) {
    UI.appSubtitle.textContent = appState.meta.subtitle || "";
  }
  if (UI.appVersion) {
    UI.appVersion.textContent = cfg.version || "v0.1.0";
  }
}

function renderStats() {
  const stats = computeStats();
  UI.statDaysCompleted.textContent = `${stats.completedDays} / ${appState.days.length}`;
  UI.statPlacesProgress.textContent = `${stats.visitedPlaces} / ${stats.totalPlaces}`;
  UI.statExpenseTotal.textContent = formatCurrency(stats.totalExpense);
  UI.statLastUpdated.textContent = formatDateTime(appState.lastUpdated);
  UI.sidebarSummary.textContent = `${appState.days.length} dias cargados`;
}

function renderDayList() {
  UI.dayList.innerHTML = appState.days
    .map((day) => {
      const visitedCount = countVisitedPlaces(day);
      const isActive = day.id === selectedDayId;
      const cardClasses = ["day-card"];
      if (isActive) cardClasses.push("active");
      if (day.completed) cardClasses.push("completed");

      return `
        <article class="${cardClasses.join(" ")}" data-day-id="${escapeHtml(day.id)}">
          <div class="day-card-top">
            <span class="day-number">${escapeHtml(getDayLabel(day))}</span>
            <span class="day-date">${escapeHtml(formatDate(day.date))}</span>
          </div>
          <h3>${escapeHtml(day.shortTitle || day.title)}</h3>
          <div class="day-meta-small">${escapeHtml(day.base)} · ${escapeHtml(day.weekday)}</div>
          <div class="day-card-bottom">
            <span class="progress-tag">${visitedCount}/${day.places.length} sitios</span>
            <span class="progress-tag">${day.completed ? "Completado" : "Pendiente"}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSchedule(day) {
  UI.scheduleList.innerHTML = day.schedule
    .map(
      (item) => `
        <article class="schedule-item">
          <div class="schedule-time">${escapeHtml(item.time)}</div>
          <div>
            <div class="schedule-title">${escapeHtml(item.label)}</div>
            <div class="schedule-detail">${escapeHtml(item.detail)}</div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderTransport(day) {
  UI.transportList.innerHTML = day.transport.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("");
}

function renderPlaces(day) {
  UI.placesList.innerHTML = day.places
    .map((place) => {
      const itemClasses = ["place-item"];
      if (place.done) itemClasses.push("done");
      return `
        <article class="${itemClasses.join(" ")}" data-place-id="${escapeHtml(place.id)}">
          <div class="place-item-top">
            <label class="place-check">
              <input type="checkbox" data-action="toggle-place" data-place-id="${escapeHtml(place.id)}" ${place.done ? "checked" : ""} />
              <span class="place-name">${escapeHtml(place.name)}</span>
            </label>
            <span class="place-caption">${place.done ? "Visitado" : "Pendiente"}</span>
          </div>
          <input
            class="place-note-input"
            type="text"
            data-action="place-note"
            data-place-id="${escapeHtml(place.id)}"
            placeholder="Anotacion rapida de este lugar"
            value="${escapeHtml(place.notes)}"
          />
        </article>
      `;
    })
    .join("");
}

function renderDayNotes(day) {
  UI.dayNotes.innerHTML = day.notes.length
    ? day.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")
    : "<li>Sin notas de plan para este dia.</li>";
}

function renderDayDetail() {
  const day = getSelectedDay();
  if (!day) return;
  const visitedCount = countVisitedPlaces(day);

  UI.dayChip.textContent = `${getDayLabel(day)} · ${formatDate(day.date)}`;
  UI.dayTitle.textContent = day.title;
  UI.dayMeta.textContent = `${day.weekday} · Base: ${day.base} · Noche: ${day.overnight}`;
  UI.dayCompleted.checked = day.completed;
  UI.dayProgress.textContent = `${visitedCount} / ${day.places.length} lugares marcados`;
  UI.dayJournal.value = day.journal || "";

  renderSchedule(day);
  renderTransport(day);
  renderPlaces(day);
  renderDayNotes(day);
}

function populateExpenseDayOptions() {
  const previousValue = UI.expenseDay.value;
  UI.expenseDay.innerHTML = appState.days
    .map((day) => `<option value="${escapeHtml(day.id)}">${escapeHtml(getDayLabel(day))} · ${escapeHtml(day.shortTitle || day.title)}</option>`)
    .join("");

  if (previousValue && appState.days.some((day) => day.id === previousValue)) {
    UI.expenseDay.value = previousValue;
  } else if (selectedDayId) {
    UI.expenseDay.value = selectedDayId;
  }
}

function getDayById(dayId) {
  return appState.days.find((day) => day.id === dayId) || null;
}

function getSafeState(state) {
  if (!state || !Array.isArray(state.days) || !state.days.length) {
    return getDefaultState();
  }
  return state;
}

function renderExpenses() {
  const expenses = [...appState.expenses].sort((left, right) => {
    const leftTime = new Date(left.date || left.createdAt).getTime();
    const rightTime = new Date(right.date || right.createdAt).getTime();
    return rightTime - leftTime;
  });

  UI.expensesSummary.textContent = `${expenses.length} gastos`;

  UI.expensesBody.innerHTML = expenses.length
    ? expenses
        .map((expense) => {
          const day = getDayById(expense.dayId);
          return `
            <tr>
              <td>${escapeHtml(day ? getDayLabel(day) : "-")}</td>
              <td>
                <strong>${escapeHtml(expense.title)}</strong>
              </td>
              <td>${escapeHtml(expense.paidBy)}</td>
              <td>${expense.isCommon ? "Si" : "No"}</td>
              <td class="amount">${escapeHtml(formatCurrency(expense.amount))}</td>
              <td><button class="btn subtle" type="button" data-action="delete-expense" data-expense-id="${escapeHtml(expense.id)}">Borrar</button></td>
            </tr>
          `;
        })
        .join("")
    : `<tr><td colspan="5"><div class="empty-state">Aun no hay gastos registrados.</div></td></tr>`;
}

function computeCommonExpenseSummary() {
  const commonExpenses = appState.expenses.filter((expense) => expense.isCommon);
  const totalCommon = commonExpenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  let davidOwesIsmael = 0;
  let ismaelOwesDavid = 0;

  commonExpenses.forEach((expense) => {
    const half = Number(expense.amount || 0) / 2;
    if (expense.paidBy === "ISMAEL") {
      davidOwesIsmael += half;
    } else if (expense.paidBy === "DAVID") {
      ismaelOwesDavid += half;
    }
  });

  const net = davidOwesIsmael - ismaelOwesDavid;

  return {
    totalCommon,
    davidOwesIsmael,
    ismaelOwesDavid,
    net
  };
}

function renderActivity() {
  const summary = computeCommonExpenseSummary();
  const netText = summary.net > 0
    ? `DAVID debe a ISMAEL ${formatCurrency(summary.net)}`
    : summary.net < 0
      ? `ISMAEL debe a DAVID ${formatCurrency(Math.abs(summary.net))}`
      : "No hay deuda neta";

  UI.activityList.innerHTML = `
    <article class="activity-item summary-card">
      <div class="activity-title">Total gastos comunes</div>
      <div class="summary-amount">${escapeHtml(formatCurrency(summary.totalCommon))}</div>
    </article>
    <article class="activity-item summary-card">
      <div class="activity-title">DAVID debe a ISMAEL</div>
      <div class="summary-amount">${escapeHtml(formatCurrency(summary.davidOwesIsmael))}</div>
    </article>
    <article class="activity-item summary-card">
      <div class="activity-title">ISMAEL debe a DAVID</div>
      <div class="summary-amount">${escapeHtml(formatCurrency(summary.ismaelOwesDavid))}</div>
    </article>
    <article class="activity-item summary-card">
      <div class="activity-title">Saldo neto</div>
      <div class="activity-meta summary-net">${escapeHtml(netText)}</div>
    </article>
  `;
}

function renderAll() {
  renderAppHeader();
  renderStats();
  renderDayList();
  renderDayDetail();
  populateExpenseDayOptions();
  renderExpenses();
  renderActivity();
  updateSyncButtons();
}

function setSelectedDay(dayId) {
  if (!appState.days.some((day) => day.id === dayId)) return;
  selectedDayId = dayId;
  UI.expenseDay.value = dayId;
  renderDayList();
  renderDayDetail();
}

async function persistState(message = "Cambios guardados") {
  saveQueue = saveQueue.then(async () => {
    appState.lastUpdated = new Date().toISOString();
    const preferDrive = Boolean(window.driveApi && window.driveApi.isReady && window.driveApi.isReady() && window.driveApi.isSignedIn && window.driveApi.isSignedIn());
    setSaveStatus(preferDrive ? "Guardando en Drive..." : "Guardando en este navegador...", false);

    try {
      const savedToDrive = await saveState(appState, preferDrive);
      setSaveStatus(savedToDrive ? `${message} · Drive` : `${message} · local`, false);
      renderStats();
      renderActivity();
    } catch (error) {
      console.error(error);
      setSaveStatus(`Error al guardar: ${error.message || error}`, false);
    }
  });

  return saveQueue;
}

function updateDay(dayId, updater) {
  const day = getDayById(dayId);
  if (!day) return null;
  updater(day);
  day.updatedAt = new Date().toISOString();
  renderAll();
  return day;
}

async function handlePlaceToggle(placeId, checked) {
  const day = getSelectedDay();
  if (!day) return;
  updateDay(day.id, (editableDay) => {
    const place = editableDay.places.find((entry) => entry.id === placeId);
    if (!place) return;
    place.done = checked;
    place.updatedAt = new Date().toISOString();
  });
  await persistState(checked ? "Lugar marcado" : "Lugar desmarcado");
}

async function handlePlaceNote(placeId, value) {
  const day = getSelectedDay();
  if (!day) return;
  updateDay(day.id, (editableDay) => {
    const place = editableDay.places.find((entry) => entry.id === placeId);
    if (!place) return;
    place.notes = value.trim();
    place.updatedAt = new Date().toISOString();
  });
  await persistState("Nota de lugar guardada");
}

async function handleDayCompleted(checked) {
  const day = getSelectedDay();
  if (!day) return;
  updateDay(day.id, (editableDay) => {
    editableDay.completed = checked;
  });
  await persistState(checked ? "Dia completado" : "Dia reabierto");
}

async function handleMarkAllPlaces() {
  const day = getSelectedDay();
  if (!day) return;
  updateDay(day.id, (editableDay) => {
    const now = new Date().toISOString();
    editableDay.places.forEach((place) => {
      place.done = true;
      place.updatedAt = now;
    });
  });
  await persistState("Checklist del dia completada");
}

async function handleSaveJournal() {
  const day = getSelectedDay();
  if (!day) return;
  updateDay(day.id, (editableDay) => {
    editableDay.journal = UI.dayJournal.value.trim();
  });
  await persistState("Notas del dia guardadas");
}

async function handleAddExpense(event) {
  event.preventDefault();
  const amount = Number(UI.expenseAmount.value);
  if (!Number.isFinite(amount) || amount <= 0) return;
  const selectedDay = getDayById(UI.expenseDay.value);

  const expense = {
    id: newId("expense"),
    dayId: UI.expenseDay.value,
    date: selectedDay?.date || new Date().toISOString().slice(0, 10),
    category: "General",
    title: UI.expenseTitle.value.trim(),
    amount,
    paidBy: UI.expensePaidBy.value,
    isCommon: Boolean(UI.expenseIsCommon.checked),
    notes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (!expense.dayId || !expense.title) return;

  appState.expenses.unshift(expense);
  renderExpenses();
  renderActivity();
  renderStats();
  UI.expenseForm.reset();
  UI.expensePaidBy.value = "ISMAEL";
  if (selectedDayId) {
    UI.expenseDay.value = selectedDayId;
  }

  await persistState("Gasto anadido");
}

async function handleDeleteExpense(expenseId) {
  appState.expenses = appState.expenses.filter((expense) => expense.id !== expenseId);
  renderExpenses();
  renderActivity();
  renderStats();
  await persistState("Gasto borrado");
}

async function handleDriveSignIn() {
  if (!window.driveApi) return;
  try {
    if (window.driveApi.isSignedIn && window.driveApi.isSignedIn()) {
      await handleDriveSignOut();
      return;
    }
    setDriveStatus("Conectando...", false);
    await window.driveApi.signIn();
    setDriveStatus("Drive conectado", false);
    appState = await loadState(true);
    if (!appState.days.length) {
      appState = getDefaultState();
    }
    if (!appState.days.some((day) => day.id === selectedDayId)) {
      selectedDayId = appState.days[0]?.id || null;
    }
    renderAll();
    await persistState("Estado sincronizado");
  } catch (error) {
    console.error(error);
    setDriveStatus(`Error: ${error.message || error}`, false);
  }
}

async function handleDriveSignOut() {
  if (!window.driveApi) return;
  await window.driveApi.signOut();
  setDriveStatus("Modo local", true);
  updateSyncButtons();
  setSaveStatus("Guardado solo en este navegador", true);
}

function bindEvents() {
  UI.dayList.addEventListener("click", (event) => {
    const card = event.target.closest("[data-day-id]");
    if (!card) return;
    setSelectedDay(card.getAttribute("data-day-id"));
  });

  UI.placesList.addEventListener("change", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    const action = target.getAttribute("data-action");
    const placeId = target.getAttribute("data-place-id");
    if (!placeId) return;
    if (action === "toggle-place") {
      await handlePlaceToggle(placeId, target.checked);
    }
  });

  UI.placesList.addEventListener(
    "blur",
    async (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      const action = target.getAttribute("data-action");
      const placeId = target.getAttribute("data-place-id");
      if (action === "place-note" && placeId) {
        await handlePlaceNote(placeId, target.value);
      }
    },
    true
  );

  UI.dayCompleted.addEventListener("change", async () => {
    await handleDayCompleted(UI.dayCompleted.checked);
  });

  UI.btnMarkAllPlaces.addEventListener("click", async () => {
    await handleMarkAllPlaces();
  });

  UI.btnSaveJournal.addEventListener("click", async () => {
    await handleSaveJournal();
  });

  UI.expenseForm.addEventListener("submit", handleAddExpense);

  UI.expensesBody.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-expense-id]");
    if (!button) return;
    await handleDeleteExpense(button.getAttribute("data-expense-id"));
  });

  UI.btnDriveSignin.addEventListener("click", handleDriveSignIn);
  UI.btnDriveSignout.addEventListener("click", handleDriveSignOut);
}

async function initApp() {
  bindEvents();

  appState = getSafeState(await loadState(false));
  if (!appState.days.some((day) => day.id === selectedDayId)) {
    selectedDayId = appState.days[0]?.id || null;
  }

  setDriveStatus(window.driveApi ? "Modo local" : "Drive no disponible", true);
  renderAll();
  updateSyncButtons();
  setSaveStatus("Estado local cargado", true);

  if (window.driveApi) {
    try {
      await window.driveApi.prepare();
      const signedIn = await window.driveApi.trySilentSignIn();
      setDriveStatus(signedIn ? "Drive conectado" : "Modo local", !signedIn);

      if (signedIn) {
        appState = getSafeState(await loadState(true));
        if (!appState.days.some((day) => day.id === selectedDayId)) {
          selectedDayId = appState.days[0]?.id || null;
        }
        renderAll();
        setSaveStatus("Estado cargado desde Drive", true);
      }
    } catch (error) {
      console.error(error);
      setDriveStatus("Modo local", true);
      setSaveStatus("Estado local cargado", true);
    }
  }
}

initApp().catch((error) => {
  console.error(error);
  setSaveStatus(`Error al iniciar: ${error.message || error}`, false);
});
