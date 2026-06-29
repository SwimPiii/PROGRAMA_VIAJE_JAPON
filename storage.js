const LOCAL_KEY = "viaje_japon_2026_state_v1";

const BASE_DAYS = [
  {
    id: "day-0",
    number: 0,
    title: "Vuelo",
    shortTitle: "Vuelo",
    date: "2026-07-14",
    weekday: "martes",
    base: "En ruta",
    overnight: "-",
    transport: ["MAD -> MUC", "Escala en Munich", "MUC -> HND"],
    schedule: [
      { time: "07:00-09:30", label: "MAD -> MUC", detail: "Primer tramo de vuelo" },
      { time: "09:30-11:15", label: "Escala", detail: "Escala de 1h45m" },
      { time: "11:15-06:55", label: "MUC -> HND", detail: "Vuelo largo con llegada al dia siguiente" }
    ],
    places: [
      { id: "p0-mad", name: "Aeropuerto Madrid" },
      { id: "p0-muc", name: "Aeropuerto Munich" },
      { id: "p0-hnd", name: "Aeropuerto Haneda" }
    ],
    notes: [
      "Tener a mano pasaporte, direccion del primer hotel y QR de vuelos.",
      "Activar eSIM o SIM al aterrizar facilita transporte y mapas."
    ]
  },
  {
    id: "day-1",
    number: 1,
    title: "Tokio (Asakusa)",
    shortTitle: "Tokio Asakusa",
    date: "2026-07-15",
    weekday: "miercoles",
    base: "Tokio",
    overnight: "APA Hotel Asakusa Tawaramachi Ekimae",
    transport: ["Llegada a Haneda", "Traslado a Asakusa"],
    schedule: [
      { time: "07:00-09:00", label: "Llegada a HND", detail: "Inmigracion y recogida de maletas" },
      { time: "09:00-11:00", label: "Traslado a Asakusa", detail: "45-70 min + paseo a pie" },
      { time: "11:00-15:00", label: "Check-in y descanso", detail: "Dejar maletas y recuperar energia" },
      { time: "15:15-17:00", label: "Opcional", detail: "Tokyo Skytree, Kappabashi-dori o Sumida Park" },
      { time: "17:30-19:00", label: "Asakusa", detail: "Senso-ji y Nakamise-dori" },
      { time: "19:15-20:30", label: "Cena", detail: "Cena por Asakusa" },
      { time: "20:45-21:30", label: "Paseo", detail: "Rio Sumida" }
    ],
    places: [
      { id: "p1-haneda", name: "Haneda" },
      { id: "p1-asakusa", name: "Asakusa" },
      { id: "p1-skytree", name: "Tokyo Skytree" },
      { id: "p1-kappabashi", name: "Kappabashi-dori" },
      { id: "p1-sumida-park", name: "Sumida Park" },
      { id: "p1-sensoji", name: "Senso-ji" },
      { id: "p1-nakamise", name: "Nakamise-dori" },
      { id: "p1-sumida-river", name: "Paseo rio Sumida" }
    ],
    notes: ["Dia condicionado por jetlag. Si hace falta, saltad el bloque opcional."]
  },
  {
    id: "day-2",
    number: 2,
    title: "Tokio tradicional (Ueno / Yanaka)",
    shortTitle: "Ueno y Yanaka",
    date: "2026-07-16",
    weekday: "jueves",
    base: "Tokio",
    overnight: "APA Hotel Asakusa Tawaramachi Ekimae",
    transport: ["Metro y tren urbano por Tokio"],
    schedule: [
      { time: "08:30", label: "Salida", detail: "Salida desde el hotel" },
      { time: "09:00-10:30", label: "Ueno Park", detail: "Paseo por la zona" },
      { time: "10:40-12:00", label: "Ameyoko", detail: "Mercado" },
      { time: "12:15-13:15", label: "Comida", detail: "Zona Ueno / Okachimachi" },
      { time: "13:30-16:30", label: "Yanaka Ginza", detail: "Barrio tradicional" },
      { time: "16:45-17:45", label: "Nezu Shrine", detail: "Visita" },
      { time: "18:30", label: "Cena", detail: "Cena tranquila cerca del hotel" }
    ],
    places: [
      { id: "p2-ueno", name: "Ueno Park" },
      { id: "p2-ameyoko", name: "Ameyoko" },
      { id: "p2-yanaka", name: "Yanaka Ginza" },
      { id: "p2-nezu", name: "Nezu Shrine" }
    ],
    notes: []
  },
  {
    id: "day-3",
    number: 3,
    title: "Tokio -> Kanazawa",
    shortTitle: "Kanazawa",
    date: "2026-07-17",
    weekday: "viernes",
    base: "Traslado",
    overnight: "Kanazawa Tokyu Hotel",
    transport: [
      "Hokuriku Shinkansen desde Tokyo Station o Ueno Station",
      "Servicios recomendados: Kagayaki o Hakutaka"
    ],
    schedule: [
      { time: "08:00-09:00", label: "Check-out", detail: "Traslado a la estacion" },
      { time: "09:30-12:00", label: "Tokio -> Kanazawa", detail: "Shinkansen ~2h30" },
      { time: "12:00-13:15", label: "Llegada y comida", detail: "Zona Omicho Market" },
      { time: "13:30-15:30", label: "Kenroku-en", detail: "Jardin y zona de castillo" },
      { time: "15:45-18:00", label: "Higashi Chaya", detail: "Tiendas y casas de te" },
      { time: "18:15-19:00", label: "Paseo por el centro", detail: "Saigawa o Asanogawa" },
      { time: "19:30", label: "Cena", detail: "Cena en Kanazawa" }
    ],
    places: [
      { id: "p3-tokyo-station", name: "Tokyo Station / Ueno Station" },
      { id: "p3-omicho", name: "Omicho Market" },
      { id: "p3-kenrokuen", name: "Kenroku-en" },
      { id: "p3-castle", name: "Castillo de Kanazawa" },
      { id: "p3-higashi", name: "Higashi Chaya" }
    ],
    notes: ["Hotel muy centrico para moveros andando por la tarde y la noche."]
  },
  {
    id: "day-4",
    number: 4,
    title: "Kanazawa -> Fukui (Eiheiji)",
    shortTitle: "Fukui y Eiheiji",
    date: "2026-07-18",
    weekday: "sabado",
    base: "Traslado",
    overnight: "Fukui Manten Hotel Ekimae",
    transport: [
      "Hokuriku Shinkansen directo desde Kanazawa",
      "Servicios recomendados: Tsurugi o Hakutaka"
    ],
    schedule: [
      { time: "08:00-10:30", label: "Kanazawa", detail: "Kenroku-en y vistas del castillo" },
      { time: "10:30-11:30", label: "Check-out", detail: "Equipaje y salida a la estacion" },
      { time: "11:30-12:30", label: "Kanazawa -> Fukui", detail: "Tren 45-50 min" },
      { time: "12:30-13:30", label: "Llegada y comida", detail: "Comida ligera" },
      { time: "13:30-17:00", label: "Templo Eiheiji", detail: "Bus + visita de 2-3 h" },
      { time: "17:30-18:30", label: "Vuelta a Fukui", detail: "Regreso" },
      { time: "19:30", label: "Cena", detail: "Cena en Fukui" }
    ],
    places: [
      { id: "p4-kenrokuen", name: "Kenroku-en" },
      { id: "p4-fukui", name: "Fukui" },
      { id: "p4-eiheiji", name: "Templo Eiheiji" }
    ],
    notes: ["Si llueve fuerte, mejor priorizar interiores en Eiheiji."]
  },
  {
    id: "day-5",
    number: 5,
    title: "Fukui -> Takayama",
    shortTitle: "Takayama",
    date: "2026-07-19",
    weekday: "domingo",
    base: "Traslado",
    overnight: "Spa Hotel Alpina Hida Takayama",
    transport: [
      "Hokuriku Shinkansen hasta Toyama via Kanazawa",
      "Limited Express Hida hasta Takayama"
    ],
    schedule: [
      { time: "08:30-10:00", label: "Check-out", detail: "Maruoka Castle opcional" },
      { time: "10:30-13:30", label: "Fukui -> Takayama", detail: "Via Kanazawa / Toyama" },
      { time: "13:30-15:00", label: "Llegada y almuerzo", detail: "Cerca de la estacion o Hida Kokubun-ji" },
      { time: "15:00", label: "Check-in", detail: "Entrada en el hotel" },
      { time: "15:30-16:30", label: "Takayama Jinya", detail: "Visita" },
      { time: "16:45-18:15", label: "Sanmachi Suji", detail: "Casco antiguo" },
      { time: "19:00", label: "Cena", detail: "Probar ternera de Hida" }
    ],
    places: [
      { id: "p5-maruoka", name: "Maruoka Castle" },
      { id: "p5-hida-kokubunji", name: "Hida Kokubun-ji" },
      { id: "p5-jinya", name: "Takayama Jinya" },
      { id: "p5-sanmachi", name: "Sanmachi Suji" }
    ],
    notes: []
  },
  {
    id: "day-6",
    number: 6,
    title: "Takayama -> Shirakawa-go -> Kioto",
    shortTitle: "Shirakawa-go y Kioto",
    date: "2026-07-20",
    weekday: "lunes",
    base: "Traslado",
    overnight: "HOTEL MYSTAYS KYOTO SHIJO",
    transport: [
      "Nohi Bus Takayama <-> Shirakawa-go",
      "Limited Express Hida hasta Nagoya",
      "Tokaido Shinkansen hasta Kioto"
    ],
    schedule: [
      { time: "08:00-08:30", label: "Check-out", detail: "Dejar maletas en recepcion o taquillas" },
      { time: "08:50-09:40", label: "Takayama -> Shirakawa-go", detail: "Autobus Nohi Bus" },
      { time: "09:40-12:30", label: "Shirakawa-go", detail: "Mirador de Shiroyama y paseo por la aldea" },
      { time: "12:30-13:20", label: "Regreso a Takayama", detail: "Autobus de vuelta" },
      { time: "13:30-14:30", label: "Comida", detail: "Comida y recogida de equipaje" },
      { time: "14:30-17:30", label: "Takayama -> Kioto", detail: "Hida hasta Nagoya + shinkansen" },
      { time: "18:00", label: "Llegada a Kioto", detail: "Check-in" },
      { time: "19:00", label: "Paseo y cena", detail: "Kamogawa y primera toma de contacto" }
    ],
    places: [
      { id: "p6-takayama-station", name: "Estacion de Takayama" },
      { id: "p6-shirakawago", name: "Shirakawa-go" },
      { id: "p6-shiroyama", name: "Mirador de Shiroyama" },
      { id: "p6-gassho", name: "Casa Gassho-zukuri" },
      { id: "p6-kioto", name: "Kioto" },
      { id: "p6-kamogawa", name: "Rio Kamogawa" }
    ],
    notes: ["Dia sensible a horarios. Reservar bus si es posible y dejar margen al tren de tarde."]
  },
  {
    id: "day-7",
    number: 7,
    title: "Kioto este (ruta de la plata) y centro",
    shortTitle: "Ginkaku-ji y centro",
    date: "2026-07-21",
    weekday: "martes",
    base: "Kioto",
    overnight: "HOTEL MYSTAYS KYOTO SHIJO",
    transport: ["Bus y metro por Kioto", "Mucho tramo a pie en zona este"],
    schedule: [
      { time: "08:30-09:30", label: "Ginkaku-ji", detail: "Pabellon de Plata" },
      { time: "09:45-11:00", label: "Camino de la Filosofia", detail: "Paseo" },
      { time: "11:15-12:30", label: "Nanzen-ji", detail: "Jardines y acueducto" },
      { time: "12:45-14:00", label: "Comida", detail: "Centro de Kioto" },
      { time: "14:15-16:30", label: "Nishiki + galerias", detail: "Teramachi y Shinkyogoku" },
      { time: "17:00-19:00", label: "Gion", detail: "Paseo al atardecer" },
      { time: "19:30", label: "Cena", detail: "Cena" }
    ],
    places: [
      { id: "p7-ginkakuji", name: "Ginkaku-ji" },
      { id: "p7-filosofia", name: "Camino de la Filosofia" },
      { id: "p7-nanzenji", name: "Nanzen-ji" },
      { id: "p7-nishiki", name: "Nishiki Market" },
      { id: "p7-teramachi", name: "Teramachi" },
      { id: "p7-shinkyogoku", name: "Shinkyogoku" },
      { id: "p7-gion", name: "Gion" }
    ],
    notes: []
  },
  {
    id: "day-8",
    number: 8,
    title: "Kioto norte + Arashiyama",
    shortTitle: "Kinkaku-ji y Arashiyama",
    date: "2026-07-22",
    weekday: "miercoles",
    base: "Kioto",
    overnight: "HOTEL MYSTAYS KYOTO SHIJO",
    transport: ["Bus / tren urbano por Kioto"],
    schedule: [
      { time: "08:00", label: "Salida", detail: "Salida del hotel" },
      { time: "08:30-09:45", label: "Kinkaku-ji", detail: "Pabellon de Oro" },
      { time: "10:15-11:15", label: "Ryoan-ji", detail: "Jardin seco" },
      { time: "11:20-12:20", label: "Opcional", detail: "Ninna-ji o Kitano Tenmangu" },
      { time: "12:30-13:30", label: "Comida", detail: "Comida" },
      { time: "14:00-18:00", label: "Arashiyama", detail: "Bosque de bambu, Tenryu-ji y riberas" },
      { time: "19:30", label: "Cena", detail: "Cena" }
    ],
    places: [
      { id: "p8-kinkakuji", name: "Kinkaku-ji" },
      { id: "p8-ryoanji", name: "Ryoan-ji" },
      { id: "p8-ninnaji", name: "Ninna-ji" },
      { id: "p8-kitano", name: "Kitano Tenmangu" },
      { id: "p8-arashiyama", name: "Arashiyama" },
      { id: "p8-bambu", name: "Bosque de bambu" },
      { id: "p8-tenryuji", name: "Templo Tenryu-ji" }
    ],
    notes: []
  },
  {
    id: "day-9",
    number: 9,
    title: "Fushimi Inari + Higashiyama",
    shortTitle: "Fushimi e Higashiyama",
    date: "2026-07-23",
    weekday: "jueves",
    base: "Kioto",
    overnight: "HOTEL MYSTAYS KYOTO SHIJO",
    transport: ["Tren corto a Fushimi Inari", "Traslado a Higashiyama"],
    schedule: [
      { time: "07:00", label: "Salida", detail: "Salida hacia Fushimi Inari" },
      { time: "07:30-10:00", label: "Fushimi Inari Taisha", detail: "Subida parcial o completa" },
      { time: "10:30-11:30", label: "Traslado", detail: "Hacia Higashiyama y snack" },
      { time: "12:00-14:00", label: "Kiyomizu-dera", detail: "Y templos cercanos" },
      { time: "14:00-16:00", label: "Sannenzaka / Ninenzaka", detail: "Paseo fotografico" },
      { time: "16:30-18:30", label: "Pontocho", detail: "Paseo con calma" },
      { time: "19:30", label: "Cena", detail: "Pontocho o kawadoko" }
    ],
    places: [
      { id: "p9-fushimi", name: "Fushimi Inari Taisha" },
      { id: "p9-higashiyama", name: "Higashiyama" },
      { id: "p9-kiyomizu", name: "Kiyomizu-dera" },
      { id: "p9-kodaiji", name: "Kodai-ji" },
      { id: "p9-sannenzaka", name: "Sannenzaka" },
      { id: "p9-ninenzaka", name: "Ninenzaka" },
      { id: "p9-pontocho", name: "Pontocho" }
    ],
    notes: []
  },
  {
    id: "day-10",
    number: 10,
    title: "Kioto (naturaleza: Kurama y Kifune)",
    shortTitle: "Kurama y Kifune",
    date: "2026-07-24",
    weekday: "viernes",
    base: "Kioto",
    overnight: "HOTEL MYSTAYS KYOTO SHIJO",
    transport: ["Kioto -> Kurama", "Sendero Kurama -> Kifune", "Vuelta a Kioto"],
    schedule: [
      { time: "08:30-10:00", label: "Kioto -> Kurama", detail: "60-90 min segun ruta" },
      { time: "10:00-12:30", label: "Sendero", detail: "Kurama -> Kifune" },
      { time: "12:45-14:00", label: "Almuerzo", detail: "Restaurantes sobre el rio" },
      { time: "14:30-16:00", label: "Vuelta a Kioto", detail: "Regreso" },
      { time: "16:30-19:00", label: "Tarde libre", detail: "Compras, lavanderia o descanso" },
      { time: "19:30", label: "Ultima cena", detail: "Cena final en Kioto" }
    ],
    places: [
      { id: "p10-kurama", name: "Kurama" },
      { id: "p10-kifune", name: "Kifune" },
      { id: "p10-sendero", name: "Sendero de montana" }
    ],
    notes: [
      "Dia dedicado a la naturaleza para evitar una jornada demasiado dura.",
      "Llevar calzado comodo y repelente de mosquitos."
    ]
  },
  {
    id: "day-11",
    number: 11,
    title: "Kioto -> Nara -> Osaka",
    shortTitle: "Nara y Osaka",
    date: "2026-07-25",
    weekday: "sabado",
    base: "Traslado",
    overnight: "Hotel Yu-shu (Osaka)",
    transport: [
      "Kintetsu Kioto -> Kintetsu Nara",
      "Kintetsu Nara -> Kintetsu Nippombashi"
    ],
    schedule: [
      { time: "08:30-09:00", label: "Check-out", detail: "Salida de Kioto" },
      { time: "09:15-10:15", label: "Kioto -> Nara", detail: "Tren Kintetsu" },
      { time: "10:15-10:45", label: "Taquillas", detail: "Guardar maletas" },
      { time: "11:00-14:30", label: "Nara", detail: "Todai-ji, ciervos y almuerzo" },
      { time: "14:45-15:45", label: "Nara -> Osaka", detail: "Directo hasta Nippombashi" },
      { time: "16:00", label: "Check-in Osaka", detail: "Hotel Yu-shu" },
      { time: "17:00-21:00", label: "Tarde libre", detail: "Dotonbori y cena" }
    ],
    places: [
      { id: "p11-kioto", name: "Estacion Kintetsu Kyoto" },
      { id: "p11-nara", name: "Kintetsu Nara" },
      { id: "p11-todaiji", name: "Todai-ji" },
      { id: "p11-ciervos", name: "Parque de los ciervos" },
      { id: "p11-osaka", name: "Kintetsu Nippombashi" },
      { id: "p11-dotonbori", name: "Dotonbori" }
    ],
    notes: ["Las maletas se guardan en taquillas en Nara."]
  },
  {
    id: "day-12",
    number: 12,
    title: "Katsuoji + Osaka centro",
    shortTitle: "Katsuoji y Osaka",
    date: "2026-07-26",
    weekday: "domingo",
    base: "Osaka",
    overnight: "Hotel Yu-shu (Osaka)",
    transport: ["Desplazamiento a Katsuoji", "Regreso a Osaka centro"],
    schedule: [
      { time: "07:00", label: "Salida", detail: "Salida temprana" },
      { time: "08:30-10:30", label: "Katsuoji Temple", detail: "Visita" },
      { time: "10:30-12:00", label: "Regreso a Osaka", detail: "75-105 min segun conexiones" },
      { time: "12:00-13:30", label: "Comida", detail: "Kuromon Ichiba" },
      { time: "14:00-16:00", label: "Osaka Castle Park", detail: "Paseo y fotos" },
      { time: "16:30-18:00", label: "Tarde urbana", detail: "Shinsaibashi-suji o Umeda Sky" },
      { time: "18:30-21:00", label: "Noche", detail: "Dotonbori o Shinsekai" }
    ],
    places: [
      { id: "p12-katsuoji", name: "Katsuoji Temple" },
      { id: "p12-kuromon", name: "Kuromon Ichiba Market" },
      { id: "p12-castle", name: "Osaka Castle Park" },
      { id: "p12-shinsaibashi", name: "Shinsaibashi-suji" },
      { id: "p12-umeda", name: "Umeda Sky Building" },
      { id: "p12-shinsekai", name: "Shinsekai" }
    ],
    notes: []
  },
  {
    id: "day-13",
    number: 13,
    title: "Osaka -> Tokio + Shinjuku",
    shortTitle: "Vuelta a Tokio",
    date: "2026-07-27",
    weekday: "lunes",
    base: "Traslado",
    overnight: "APA Hotel Asakusa Tawaramachi Ekimae",
    transport: [
      "Traslado a Shin-Osaka",
      "Tokaido Shinkansen a Tokio",
      "Servicio recomendado: Nozomi"
    ],
    schedule: [
      { time: "10:00", label: "Check-out", detail: "Salida de Osaka" },
      { time: "10:30-14:00", label: "Osaka -> Tokio", detail: "Shinkansen y traslados" },
      { time: "15:00", label: "Check-in Tokio", detail: "Entrada en hotel" },
      { time: "16:30-18:30", label: "Shinjuku", detail: "Paseo por la zona" },
      { time: "18:30-19:00", label: "Mirador opcional", detail: "Tokyo Metropolitan Government Building" },
      { time: "19:00-20:00", label: "Cena", detail: "Omoide Yokocho" },
      { time: "20:15-21:15", label: "Paseo", detail: "Kabukicho" }
    ],
    places: [
      { id: "p13-shin-osaka", name: "Shin-Osaka" },
      { id: "p13-shinkansen", name: "Tokaido Shinkansen" },
      { id: "p13-shinjuku", name: "Shinjuku" },
      { id: "p13-tmg", name: "Tokyo Metropolitan Government Building" },
      { id: "p13-omoide", name: "Omoide Yokocho" },
      { id: "p13-kabukicho", name: "Kabukicho" }
    ],
    notes: []
  },
  {
    id: "day-14",
    number: 14,
    title: "Tokio (Meiji / Harajuku / Shibuya + Akihabara)",
    shortTitle: "Shibuya y Akihabara",
    date: "2026-07-28",
    weekday: "martes",
    base: "Tokio",
    overnight: "APA Hotel Asakusa Tawaramachi Ekimae",
    transport: ["Metro y tren urbano por Tokio"],
    schedule: [
      { time: "08:30-09:45", label: "Meiji Jingu", detail: "Visita" },
      { time: "10:00-11:30", label: "Harajuku / Omotesando", detail: "Paseo" },
      { time: "12:00-13:00", label: "Comida", detail: "Comida en Shibuya" },
      { time: "13:15-14:30", label: "Shibuya", detail: "Cruce y Hachiko" },
      { time: "15:15-18:00", label: "Akihabara", detail: "Electronica, anime y retro gaming" },
      { time: "18:30", label: "Cena", detail: "Akihabara o Asakusa" }
    ],
    places: [
      { id: "p14-meiji", name: "Meiji Jingu" },
      { id: "p14-harajuku", name: "Harajuku" },
      { id: "p14-omotesando", name: "Omotesando" },
      { id: "p14-shibuya", name: "Cruce de Shibuya" },
      { id: "p14-hachiko", name: "Hachiko" },
      { id: "p14-akihabara", name: "Akihabara" }
    ],
    notes: ["En Akihabara suele haber mas ambiente por la tarde."]
  },
  {
    id: "day-15",
    number: 15,
    title: "Nikko (dia completo)",
    shortTitle: "Nikko",
    date: "2026-07-29",
    weekday: "miercoles",
    base: "Excursion",
    overnight: "APA Hotel Asakusa Tawaramachi Ekimae",
    transport: ["Limited Express Tobu desde Tobu Asakusa", "Servicios recomendados: Spacia o Revaty"],
    schedule: [
      { time: "07:00", label: "Salida", detail: "Salida hacia Nikko" },
      { time: "09:30-13:30", label: "Zona sagrada", detail: "Toshogu, Rinno-ji y Futarasan" },
      { time: "13:45-14:45", label: "Comida", detail: "Comida" },
      { time: "15:00-16:30", label: "Kanmangafuchi Abyss", detail: "Paseo" },
      { time: "17:00", label: "Regreso", detail: "Vuelta a Tokio" },
      { time: "20:00", label: "Llegada", detail: "Llegada aproximada" }
    ],
    places: [
      { id: "p15-tobu-asakusa", name: "Tobu Asakusa" },
      { id: "p15-toshogu", name: "Toshogu" },
      { id: "p15-rinnoji", name: "Rinno-ji" },
      { id: "p15-futarasan", name: "Futarasan" },
      { id: "p15-kanmangafuchi", name: "Kanmangafuchi Abyss" }
    ],
    notes: []
  },
  {
    id: "day-16",
    number: 16,
    title: "Kamakura (dia completo) + opcional Akihabara",
    shortTitle: "Kamakura",
    date: "2026-07-30",
    weekday: "jueves",
    base: "Excursion",
    overnight: "APA Hotel Asakusa Tawaramachi Ekimae",
    transport: ["Trenes JR regionales", "Lineas recomendadas: Yokosuka o Shonan-Shinjuku"],
    schedule: [
      { time: "09:00-10:00", label: "Tokio -> Kamakura", detail: "Tren 50-70 min" },
      { time: "10:00-12:00", label: "Gran Buda", detail: "Daibutsu y Kotoku-in" },
      { time: "12:15-13:30", label: "Hasedera", detail: "Templo" },
      { time: "13:30-14:30", label: "Comida", detail: "Comida" },
      { time: "14:45-16:00", label: "Tsurugaoka Hachimangu", detail: "Visita" },
      { time: "16:15-17:00", label: "Komachi-dori", detail: "Paseo y compras" },
      { time: "17:30-19:00", label: "Regreso", detail: "Vuelta a Tokio" },
      { time: "Noche", label: "Opcional", detail: "Akihabara" }
    ],
    places: [
      { id: "p16-kamakura", name: "Kamakura" },
      { id: "p16-daibutsu", name: "Gran Buda (Daibutsu)" },
      { id: "p16-kotokuin", name: "Kotoku-in" },
      { id: "p16-hasedera", name: "Hasedera" },
      { id: "p16-tsurugaoka", name: "Tsurugaoka Hachimangu" },
      { id: "p16-komachi", name: "Komachi-dori" },
      { id: "p16-akihabara", name: "Akihabara opcional" }
    ],
    notes: []
  },
  {
    id: "day-17",
    number: 17,
    title: "Regreso",
    shortTitle: "Vuelta a casa",
    date: "2026-07-31",
    weekday: "viernes",
    base: "Tokio",
    overnight: "-",
    transport: ["Traslado a Haneda", "HND -> FRA", "FRA -> MAD"],
    schedule: [
      { time: "Antes del vuelo", label: "Salida del hotel", detail: "~3h30 antes del vuelo" },
      { time: "Manana", label: "Traslado a Haneda", detail: "Llegada con margen" },
      { time: "11:45-19:00", label: "HND -> FRA", detail: "Vuelo" },
      { time: "21:00-23:40", label: "FRA -> MAD", detail: "Vuelo final" }
    ],
    places: [
      { id: "p17-hotel", name: "Hotel en Tokio" },
      { id: "p17-haneda", name: "Haneda" },
      { id: "p17-frankfurt", name: "Frankfurt" },
      { id: "p17-madrid", name: "Madrid" }
    ],
    notes: ["Dejar el equipaje preparado la noche anterior."]
  }
];

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeString(value) {
  return String(value || "").trim();
}

function normalizeNumber(value) {
  const normalized = String(value ?? "")
    .trim()
    .replace(/\s+/g, "")
    .replace(/\.(?=\d{3}(?:\D|$))/g, "")
    .replace(",", ".");
  const numericValue = Number(normalized);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function normalizePlace(rawPlace, basePlace) {
  return {
    id: basePlace.id,
    name: basePlace.name,
    done: Boolean(rawPlace && rawPlace.done),
    notes: normalizeString(rawPlace && rawPlace.notes),
    updatedAt: normalizeString(rawPlace && rawPlace.updatedAt)
  };
}

function normalizeDay(rawDay, baseDay) {
  const rawPlacesById = new Map(((rawDay && rawDay.places) || []).map((place) => [place.id, place]));
  return {
    ...cloneJson(baseDay),
    completed: Boolean(rawDay && rawDay.completed),
    journal: normalizeString(rawDay && rawDay.journal),
    updatedAt: normalizeString(rawDay && rawDay.updatedAt),
    places: baseDay.places.map((place) => normalizePlace(rawPlacesById.get(place.id), place))
  };
}

function normalizeExpense(rawExpense) {
  return {
    id: normalizeString(rawExpense && rawExpense.id) || `expense-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    dayId: normalizeString(rawExpense && rawExpense.dayId),
    date: normalizeString(rawExpense && rawExpense.date),
    category: normalizeString(rawExpense && rawExpense.category) || "General",
    title: normalizeString(rawExpense && rawExpense.title),
    amount: normalizeNumber(rawExpense && rawExpense.amount),
    paidBy: normalizeString(rawExpense && rawExpense.paidBy) || "Viaje",
    notes: normalizeString(rawExpense && rawExpense.notes),
    createdAt: normalizeString(rawExpense && rawExpense.createdAt) || new Date().toISOString(),
    updatedAt: normalizeString(rawExpense && rawExpense.updatedAt) || new Date().toISOString()
  };
}

function buildDefaultState() {
  return {
    meta: {
      title: "Bitacora Japon 2026",
      subtitle: "Checklist del viaje, gastos y diario compartido",
      driveFolderName: "PROGRAMA_VIAJE_JAPON"
    },
    days: BASE_DAYS.map((day) => normalizeDay({}, day)),
    expenses: [],
    lastUpdated: new Date().toISOString()
  };
}

export function getDefaultState() {
  return buildDefaultState();
}

export function normalizeState(rawState) {
  const defaultState = buildDefaultState();
  if (!rawState || typeof rawState !== "object") {
    return defaultState;
  }

  const rawDaysById = new Map((Array.isArray(rawState.days) ? rawState.days : []).map((day) => [day.id, day]));
  return {
    meta: {
      ...defaultState.meta,
      ...(rawState.meta && typeof rawState.meta === "object" ? rawState.meta : {})
    },
    days: BASE_DAYS.map((baseDay) => normalizeDay(rawDaysById.get(baseDay.id), baseDay)),
    expenses: Array.isArray(rawState.expenses) ? rawState.expenses.map(normalizeExpense) : [],
    lastUpdated: normalizeString(rawState.lastUpdated) || new Date().toISOString()
  };
}

function loadStateFromLocalStorage() {
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    if (!raw) return null;
    return normalizeState(JSON.parse(raw));
  } catch {
    return null;
  }
}

function saveStateToLocalStorage(state) {
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
  } catch {
    // No-op
  }
}

export async function loadState(preferDrive) {
  if (preferDrive && window.driveApi && window.driveApi.isReady() && window.driveApi.isSignedIn()) {
    try {
      const remoteState = await window.driveApi.loadFromDrive();
      if (remoteState) {
        const normalized = normalizeState(remoteState);
        saveStateToLocalStorage(normalized);
        return normalized;
      }
    } catch (error) {
      console.warn("No se pudo cargar el estado remoto", error);
    }
  }

  return loadStateFromLocalStorage() || getDefaultState();
}

export async function saveState(state, preferDrive) {
  const normalized = normalizeState({ ...state, lastUpdated: new Date().toISOString() });
  saveStateToLocalStorage(normalized);

  if (!preferDrive || !window.driveApi || !window.driveApi.isReady() || !window.driveApi.isSignedIn()) {
    return false;
  }

  await window.driveApi.saveToDrive(normalized);
  return true;
}
