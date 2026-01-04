const clocks = [
  { timeId: "t-ny",   dateId: "d-ny",   tz: "America/New_York" },
  { timeId: "t-pune", dateId: "d-pune", tz: "Asia/Kolkata" },
  { timeId: "t-tokyo",dateId: "d-tokyo",tz: "Asia/Tokyo" },
  { timeId: "t-qld",  dateId: "d-qld",  tz: "Australia/Brisbane" }, // Queensland (Brisbane)
  { timeId: "t-pyo",  dateId: "d-pyo",  tz: "Asia/Pyongyang" },
  { timeId: "t-tdc",  dateId: "d-tdc",  tz: "Atlantic/St_Helena" }  // Tristan da Cunha
];

function makeFormatter(timeZone) {
  return {
    time: new Intl.DateTimeFormat(undefined, {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }),
    date: new Intl.DateTimeFormat(undefined, {
      timeZone,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit"
    })
  };
}

const formatters = new Map(clocks.map(c => [c.tz, makeFormatter(c.tz)]));

function tick() {
  const now = new Date();
  for (const c of clocks) {
    const f = formatters.get(c.tz);
    const tEl = document.getElementById(c.timeId);
    const dEl = document.getElementById(c.dateId);
    if (tEl) tEl.textContent = f.time.format(now);
    if (dEl) dEl.textContent = f.date.format(now);
  }
}

tick();
setInterval(tick, 1000);
