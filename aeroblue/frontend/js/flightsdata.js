// =====================================
// AeroBlue - Flight Data
// Shared across all booking pages
// =====================================

const FLIGHTS_DB = {
  "TIA-FCO": {
    from: "Tirana (TIA)", to: "Rome (FCO)", duration: "1h 45m",
    schedules: [
      { date: "2026-06-10", flights: [{ depart: "06:20", arrive: "08:05", price: 49 }, { depart: "14:35", arrive: "16:20", price: 59 }, { depart: "20:10", arrive: "21:55", price: 45 }] },
      { date: "2026-06-11", flights: [{ depart: "07:00", arrive: "08:45", price: 52 }, { depart: "13:00", arrive: "14:45", price: 65 }, { depart: "19:30", arrive: "21:15", price: 48 }] },
      { date: "2026-06-12", flights: [{ depart: "06:45", arrive: "08:30", price: 55 }, { depart: "15:20", arrive: "17:05", price: 70 }, { depart: "21:00", arrive: "22:45", price: 50 }] },
      { date: "2026-06-13", flights: [{ depart: "08:10", arrive: "09:55", price: 60 }, { depart: "16:00", arrive: "17:45", price: 75 }] },
      { date: "2026-06-14", flights: [{ depart: "06:20", arrive: "08:05", price: 49 }, { depart: "12:30", arrive: "14:15", price: 58 }, { depart: "18:45", arrive: "20:30", price: 53 }] },
    ]
  },
  "TIA-MXP": {
    from: "Tirana (TIA)", to: "Milan (MXP)", duration: "1h 50m",
    schedules: [
      { date: "2026-06-10", flights: [{ depart: "07:30", arrive: "09:20", price: 55 }, { depart: "15:00", arrive: "16:50", price: 65 }, { depart: "20:30", arrive: "22:20", price: 50 }] },
      { date: "2026-06-11", flights: [{ depart: "08:00", arrive: "09:50", price: 58 }, { depart: "14:00", arrive: "15:50", price: 70 }] },
      { date: "2026-06-12", flights: [{ depart: "06:30", arrive: "08:20", price: 52 }, { depart: "16:30", arrive: "18:20", price: 68 }, { depart: "22:00", arrive: "23:50", price: 48 }] },
      { date: "2026-06-13", flights: [{ depart: "09:00", arrive: "10:50", price: 62 }, { depart: "17:00", arrive: "18:50", price: 72 }] },
      { date: "2026-06-14", flights: [{ depart: "07:00", arrive: "08:50", price: 55 }, { depart: "13:30", arrive: "15:20", price: 60 }] },
    ]
  },
  "TIA-CDG": {
    from: "Tirana (TIA)", to: "Paris (CDG)", duration: "2h 30m",
    schedules: [
      { date: "2026-06-10", flights: [{ depart: "06:00", arrive: "08:30", price: 79 }, { depart: "13:45", arrive: "16:15", price: 95 }, { depart: "19:00", arrive: "21:30", price: 85 }] },
      { date: "2026-06-11", flights: [{ depart: "07:15", arrive: "09:45", price: 82 }, { depart: "15:30", arrive: "18:00", price: 99 }] },
      { date: "2026-06-12", flights: [{ depart: "06:30", arrive: "09:00", price: 76 }, { depart: "14:00", arrive: "16:30", price: 90 }, { depart: "20:00", arrive: "22:30", price: 80 }] },
      { date: "2026-06-13", flights: [{ depart: "08:00", arrive: "10:30", price: 88 }, { depart: "16:45", arrive: "19:15", price: 105 }] },
      { date: "2026-06-14", flights: [{ depart: "06:00", arrive: "08:30", price: 79 }, { depart: "12:00", arrive: "14:30", price: 92 }] },
    ]
  },
  "TIA-BER": {
    from: "Tirana (TIA)", to: "Berlin (BER)", duration: "2h 10m",
    schedules: [
      { date: "2026-06-10", flights: [{ depart: "07:00", arrive: "09:10", price: 69 }, { depart: "14:30", arrive: "16:40", price: 85 }, { depart: "20:00", arrive: "22:10", price: 75 }] },
      { date: "2026-06-11", flights: [{ depart: "08:30", arrive: "10:40", price: 72 }, { depart: "16:00", arrive: "18:10", price: 88 }] },
      { date: "2026-06-12", flights: [{ depart: "06:45", arrive: "08:55", price: 65 }, { depart: "15:15", arrive: "17:25", price: 80 }, { depart: "21:30", arrive: "23:40", price: 70 }] },
      { date: "2026-06-13", flights: [{ depart: "09:00", arrive: "11:10", price: 78 }, { depart: "17:30", arrive: "19:40", price: 95 }] },
      { date: "2026-06-14", flights: [{ depart: "07:00", arrive: "09:10", price: 69 }, { depart: "13:00", arrive: "15:10", price: 82 }] },
    ]
  },
  "TIA-VIE": {
    from: "Tirana (TIA)", to: "Vienna (VIE)", duration: "1h 55m",
    schedules: [
      { date: "2026-06-10", flights: [{ depart: "07:30", arrive: "09:25", price: 59 }, { depart: "15:00", arrive: "16:55", price: 72 }, { depart: "20:15", arrive: "22:10", price: 65 }] },
      { date: "2026-06-11", flights: [{ depart: "08:00", arrive: "09:55", price: 62 }, { depart: "14:30", arrive: "16:25", price: 75 }] },
      { date: "2026-06-12", flights: [{ depart: "06:30", arrive: "08:25", price: 55 }, { depart: "16:00", arrive: "17:55", price: 70 }, { depart: "22:00", arrive: "23:55", price: 60 }] },
      { date: "2026-06-13", flights: [{ depart: "09:15", arrive: "11:10", price: 68 }, { depart: "17:45", arrive: "19:40", price: 82 }] },
      { date: "2026-06-14", flights: [{ depart: "07:00", arrive: "08:55", price: 59 }, { depart: "13:30", arrive: "15:25", price: 66 }] },
    ]
  },
  "TIA-ATH": {
    from: "Tirana (TIA)", to: "Athens (ATH)", duration: "1h 20m",
    schedules: [
      { date: "2026-06-10", flights: [{ depart: "08:00", arrive: "09:20", price: 39 }, { depart: "14:00", arrive: "15:20", price: 49 }, { depart: "19:30", arrive: "20:50", price: 44 }] },
      { date: "2026-06-11", flights: [{ depart: "07:30", arrive: "08:50", price: 42 }, { depart: "13:00", arrive: "14:20", price: 52 }] },
      { date: "2026-06-12", flights: [{ depart: "06:45", arrive: "08:05", price: 36 }, { depart: "15:30", arrive: "16:50", price: 48 }, { depart: "21:00", arrive: "22:20", price: 40 }] },
      { date: "2026-06-13", flights: [{ depart: "09:00", arrive: "10:20", price: 45 }, { depart: "16:30", arrive: "17:50", price: 55 }] },
      { date: "2026-06-14", flights: [{ depart: "08:00", arrive: "09:20", price: 39 }, { depart: "12:30", arrive: "13:50", price: 46 }] },
    ]
  },
  "TIA-BCN": {
    from: "Tirana (TIA)", to: "Barcelona (BCN)", duration: "2h 40m",
    schedules: [
      { date: "2026-06-10", flights: [{ depart: "06:30", arrive: "09:10", price: 89 }, { depart: "14:00", arrive: "16:40", price: 109 }, { depart: "19:30", arrive: "22:10", price: 95 }] },
      { date: "2026-06-11", flights: [{ depart: "07:00", arrive: "09:40", price: 92 }, { depart: "15:30", arrive: "18:10", price: 115 }] },
      { date: "2026-06-12", flights: [{ depart: "06:00", arrive: "08:40", price: 85 }, { depart: "14:30", arrive: "17:10", price: 102 }, { depart: "20:00", arrive: "22:40", price: 90 }] },
      { date: "2026-06-13", flights: [{ depart: "08:30", arrive: "11:10", price: 98 }, { depart: "17:00", arrive: "19:40", price: 118 }] },
      { date: "2026-06-14", flights: [{ depart: "06:30", arrive: "09:10", price: 89 }, { depart: "13:00", arrive: "15:40", price: 105 }] },
    ]
  },
  "TIA-MAD": {
    from: "Tirana (TIA)", to: "Madrid (MAD)", duration: "3h 00m",
    schedules: [
      { date: "2026-06-10", flights: [{ depart: "06:00", arrive: "09:00", price: 95 }, { depart: "13:30", arrive: "16:30", price: 118 }, { depart: "19:00", arrive: "22:00", price: 105 }] },
      { date: "2026-06-11", flights: [{ depart: "07:30", arrive: "10:30", price: 99 }, { depart: "15:00", arrive: "18:00", price: 122 }] },
      { date: "2026-06-12", flights: [{ depart: "06:30", arrive: "09:30", price: 92 }, { depart: "14:00", arrive: "17:00", price: 110 }, { depart: "20:30", arrive: "23:30", price: 98 }] },
      { date: "2026-06-13", flights: [{ depart: "08:00", arrive: "11:00", price: 105 }, { depart: "16:30", arrive: "19:30", price: 128 }] },
      { date: "2026-06-14", flights: [{ depart: "06:00", arrive: "09:00", price: 95 }, { depart: "12:30", arrive: "15:30", price: 112 }] },
    ]
  },
  "TIA-AMS": {
    from: "Tirana (TIA)", to: "Amsterdam (AMS)", duration: "2h 45m",
    schedules: [
      { date: "2026-06-10", flights: [{ depart: "07:00", arrive: "09:45", price: 99 }, { depart: "14:30", arrive: "17:15", price: 119 }, { depart: "20:00", arrive: "22:45", price: 108 }] },
      { date: "2026-06-11", flights: [{ depart: "08:00", arrive: "10:45", price: 102 }, { depart: "15:00", arrive: "17:45", price: 125 }] },
      { date: "2026-06-12", flights: [{ depart: "06:30", arrive: "09:15", price: 95 }, { depart: "14:00", arrive: "16:45", price: 115 }, { depart: "21:00", arrive: "23:45", price: 100 }] },
      { date: "2026-06-13", flights: [{ depart: "09:00", arrive: "11:45", price: 108 }, { depart: "17:30", arrive: "20:15", price: 130 }] },
      { date: "2026-06-14", flights: [{ depart: "07:00", arrive: "09:45", price: 99 }, { depart: "13:00", arrive: "15:45", price: 118 }] },
    ]
  }
};

// Route key lookup from full airport strings
function getRouteKey(origin, destination) {
  const map = {
    "Tirana (TIA)": "TIA",
    "Rome (FCO)": "FCO",
    "Milan (MXP)": "MXP",
    "Paris (CDG)": "CDG",
    "Berlin (BER)": "BER",
    "Vienna (VIE)": "VIE",
    "Athens (ATH)": "ATH",
    "Barcelona (BCN)": "BCN",
    "Madrid (MAD)": "MAD",
    "Amsterdam (AMS)": "AMS"
  };

  // Extract city code from full string like "Tirana (TIA) - Tirana International Airport"
  function extractCode(str) {
    const match = str.match(/\(([A-Z]{3})\)/);
    return match ? match[1] : null;
  }

  const fromCode = extractCode(origin) || map[origin];
  const toCode = extractCode(destination) || map[destination];
  if (!fromCode || !toCode) return null;
  return fromCode + "-" + toCode;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return days[d.getDay()] + " " + d.getDate() + " " + months[d.getMonth()];
}
