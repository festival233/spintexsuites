
const bookingStates = [
  { pct: 28, text: "28% booked this week · best rates still open" },
  { pct: 46, text: "46% booked this week · premium nights moving quickly" },
  { pct: 54, text: "54% booked this week · executive rooms seeing the most interest" },
  { pct: 63, text: "63% booked this week · weekend demand is rising" },
  { pct: 37, text: "37% booked this week · early bird advantage is still on" }
];

const activityFeed = [
  "Guest from London just checked dates for the Skyline Studio.",
  "Two visitors are comparing concierge packages right now.",
  "Premium Balcony Suite was just added to a guest shortlist.",
  "A returning guest signed up for the VIP 10% offer.",
  "Airport pickup has been requested for an upcoming stay.",
  "Executive Studio is trending with business travelers today."
];

function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }

function rotatePulse(){
  const meter = qs("[data-booking-meter]");
  const label = qs("[data-booking-label]");
  if(!meter || !label) return;
  const next = bookingStates[Math.floor(Math.random() * bookingStates.length)];
  meter.style.width = `${next.pct}%`;
  label.textContent = next.text;
}

function rotateFeed(){
  const node = qs("[data-activity-feed]");
  if(!node) return;
  node.textContent = activityFeed[Math.floor(Math.random() * activityFeed.length)];
}

function openPopup(){
  const popup = qs("[data-popup]");
  if(popup){
    popup.classList.add("show");
    localStorage.setItem("spintexPopupSeen", "1");
  }
}

function closePopup(){
  const popup = qs("[data-popup]");
  if(popup) popup.classList.remove("show");
}

function initPopup(){
  const popup = qs("[data-popup]");
  const close = qs("[data-popup-close]");
  if(close) close.addEventListener("click", closePopup);
  if(!popup) return;
  const seen = localStorage.getItem("spintexPopupSeen");
  if(!seen){
    setTimeout(openPopup, 1400);
  }
}

async function postForm(url, payload){
  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error("Request failed");
  return await res.json();
}

function bindSubscribeForm(){
  qsa("[data-subscribe-form]").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.querySelector("input[name='email']")?.value?.trim();
      const name = form.querySelector("input[name='name']")?.value?.trim() || "";
      const out = form.querySelector("[data-form-note]");
      if(!email) return;
      if(out) out.textContent = "Joining VIP list…";
      try{
        await postForm("/api/subscribe", { email, name, source: window.location.pathname });
        if(out) out.textContent = "You’re in. Your 10% offer is reserved.";
        form.reset();
        closePopup();
      }catch(err){
        if(out) out.textContent = "Form is ready. Add your RESEND_API_KEY in Cloudflare to activate delivery.";
      }
    });
  });
}

function bindInquiryForm(){
  qsa("[data-inquiry-form]").forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = Object.fromEntries(new FormData(form).entries());
      const out = form.querySelector("[data-form-note]");
      if(out) out.textContent = "Sending your request…";
      try{
        await postForm("/api/inquiry", payload);
        if(out) out.textContent = "Request sent. Spintex Suites will receive this at spintexsuites@gmail.com.";
        form.reset();
      }catch(err){
        if(out) out.textContent = "Form is installed. Add your RESEND_API_KEY in Cloudflare to activate delivery.";
      }
    });
  });
}

function bindFilters(){
  const buttons = qsa("[data-filter]");
  const cards = qsa("[data-room-card]");
  if(!buttons.length || !cards.length) return;
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.filter;
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      cards.forEach(card => {
        const tags = (card.dataset.tags || "").split(",");
        const match = tag === "all" || tags.includes(tag);
        card.style.display = match ? "" : "none";
      });
    });
  });
}

function bindYear(){
  qsa("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  bindSubscribeForm();
  bindInquiryForm();
  bindFilters();
  bindYear();
  rotatePulse();
  rotateFeed();
  initPopup();
  setInterval(rotatePulse, 5200);
  setInterval(rotateFeed, 4200);
});
