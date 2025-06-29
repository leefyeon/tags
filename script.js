const timeZones = [
  // { zone: "Pacific/Honolulu", label: "HST" },
  { zone: "America/Los_Angeles", label: "PST" },
  { zone: "America/Denver", label: "MST" },
  { zone: "America/Chicago", label: "CST" },
  { zone: "America/New_York", label: "EST" },
  { zone: "Europe/London", label: "GMT" },
  { zone: "Europe/Paris", label: "CET" },
  // { zone: "Europe/Athens", label: "EET" },
  { zone: "Asia/Kolkata", label: "IST" },
  // { zone: "Asia/Tokyo", label: "JST" },
  { zone: "Australia/Sydney", label: "AEST" },
  // { zone: "Australia/Perth", label: "AWST" },
  // { zone: "Pacific/Auckland", label: "NZST" }
];

function updateTimeZones() {
  const now = new Date();
  let inRange = [];
  let outRange = [];

  timeZones.forEach(({zone, label}) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: zone,
    });

    const hour = Number(
      new Intl.DateTimeFormat('en-US', {
        hour: "2-digit",
        hour12: false,
        timeZone: zone,
      }).format(now)
    );

    const timeString = formatter.format(now);

    if (hour >= 12 && hour <= 20) {
      inRange.push(`<li>${label}: <strong>${timeString}</strong></li>`);
    } else {
      outRange.push(`<li>${label}: <span>${timeString}</span></li>`);
    }
  });

  let html = "";

  if (inRange.length) {
    html += `<p>It is between 12pm and 9pm in these time zones:</p><ul>${inRange.join('')}</ul>`;
  } else {
    html += "<p>It is not between 12pm and 9pm in any of the listed time zones.</p>";
  }

  if (outRange.length) {
    html += `<p>It is <em>not</em> between 12pm and 9pm in these time zones:</p><ul>${outRange.join('')}</ul>`;
  }

  document.getElementById("greeting").innerHTML = html;
}

updateTimeZones();
setInterval(updateTimeZones, 60000);
