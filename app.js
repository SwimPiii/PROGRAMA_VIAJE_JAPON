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
  expenseDate: document.getElementById("expense-date"),
  expenseCategory: document.getElementById("expense-category"),
  expensePaidBy: document.getElementById("expense-paid-by"),
  expenseTitle: document.getElementById("expense-title"),
  expenseAmount: document.getElementById("expense-amount"),
  expenseNotes: document.getElementById("expense-notes"),
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
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(Number(value || 0));
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
  UI.saveStatus.textContent = message;
  UI.saveStatus.classList.toggle("muted", isMuted);
}

function setDriveStatus(message, isMuted = false) {
  UI.driveStatus.textContent = message;
  UI.driveStatus.classList.toggle("muted", isMuted);
}

function updateSyncButtons() {
  const signedIn = Boolean(window.driveApi && window.driveApi.isSignedIn && window.driveApi.isSignedIn());
  UI.btnDriveSignin.disabled = signedIn;
  UI.btnDriveSignout.disabled = !signedIn;
}

function renderAppHeader() {
  UI.appTitle.textContent = appState.meta.title || "Bitacora Japon 2026";
  UI.appSubtitle.textContent = appState.meta.subtitle || "Checklist viva del viaje";
  UI.appVersion.textContent = cfg.version || "v0.1.0";
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
              <td>${escapeHtml(formatDate(expense.date))}</td>
              <td>${escapeHtml(day ? getDayLabel(day) : "-")}</td>
              <td>
                <strong>${escapeHtml(expense.title)}</strong>
                ${expense.notes ? `<div class="muted">${escapeHtml(expense.notes)}</div>` : ""}
              </td>
              <td>${escapeHtml(expense.category)}</td>
              <td>${escapeHtml(expense.paidBy)}</td>
              <td class="amount">${escapeHtml(formatCurrency(expense.amount))}</td>
              <td><button class="btn subtle" type="button" data-action="delete-expense" data-expense-id="${escapeHtml(expense.id)}">Borrar</button></td>
            </tr>
          `;
        })
        .join("")
    : `<tr><td colspan="7"><div class="empty-state">Aun no hay gastos registrados.</div></td></tr>`;
}

function getRecentActivity() {
  const activity = [];

  appState.days.forEach((day) => {
    if (day.updatedAt) {
      activity.push({
        type: day.completed ? "dia" : "nota",
        title: `${getDayLabel(day)} · ${day.shortTitle || day.title}`,
        detail: day.completed ? "Dia marcado como completado" : "Notas del dia actualizadas",
        when: day.updatedAt
      });
    }

    day.places.forEach((place) => {
      if (place.updatedAt && place.done) {
        activity.push({
          type: "lugar",
          title: place.name,
          detail: `${getDayLabel(day)} · ${day.shortTitle || day.title}`,
          when: place.updatedAt
        });
      }
    });
  });

  appState.expenses.forEach((expense) => {
    activity.push({
      type: "gasto",
      title: `${expense.title} · ${formatCurrency(expense.amount)}`,
      detail: `${expense.category} · ${expense.paidBy}`,
      when: expense.updatedAt || expense.createdAt
    });
  });

  return activity
    .filter((entry) => entry.when)
    .sort((left, right) => new Date(right.when).getTime() - new Date(left.when).getTime())
    .slice(0, 12);
}

function renderActivity() {
  const activity = getRecentActivity();
  UI.activityList.innerHTML = activity.length
    ? activity
        .map(
          (entry) => `
            <article class="activity-item">
              <span class="activity-kind">${escapeHtml(entry.type)}</span>
              <div class="activity-title">${escapeHtml(entry.title)}</div>
              <div class="activity-meta">${escapeHtml(entry.detail)}</div>
              <div class="activity-meta">${escapeHtml(formatDateTime(entry.when))}</div>
            </article>
          `
        )
        .join("")
    : '<div class="empty-state">Todavia no hay actividad registrada. En cuanto marqueis lugares o anadais gastos, aparecera aqui.</div>';
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

  const expense = {
    id: newId("expense"),
    dayId: UI.expenseDay.value,
    date: UI.expenseDate.value,
    category: UI.expenseCategory.value,
    title: UI.expenseTitle.value.trim(),
    amount,
    paidBy: UI.expensePaidBy.value.trim() || "Comun",
    notes: UI.expenseNotes.value.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (!expense.dayId || !expense.date || !expense.title) return;

  appState.expenses.unshift(expense);
  renderExpenses();
  renderActivity();
  renderStats();
  UI.expenseForm.reset();
  UI.expensePaidBy.value = "Comun";
  UI.expenseDate.value = expense.date;
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
  UI.expenseDate.value = new Date().toISOString().slice(0, 10);

  appState = await loadState(false);
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
        appState = await loadState(true);
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
