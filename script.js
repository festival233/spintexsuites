const suites = [
  { title: 'Executive Studio Noir', desc: 'Moody luxury palette, smart TV wall, warm cove lighting, and a polished studio layout for business and premium short stays.', image: 'assets/room-1.png', layout: 'assets/layout-1.svg' },
  { title: 'Champagne Glow Suite', desc: 'Soft gold accents, brighter finishes, elegant wall treatment, and a room made to photograph beautifully for listings.', image: 'assets/room-2.png', layout: 'assets/layout-2.svg' },
  { title: 'Metropolitan Sand Suite', desc: 'Neutral palette, layered textures, efficient kitchenette concept, and a calm upscale city-stay vibe.', image: 'assets/room-3.png', layout: 'assets/layout-3.svg' },
  { title: 'Signature Bronze Studio', desc: 'Designed for guests who want boutique-hotel energy with apartment privacy and a richer luxury finish.', image: 'assets/room-4.png', layout: 'assets/layout-4.svg' },
  { title: 'Pearl Business Loft', desc: 'A clean professional suite concept with bright styling, refined storage, and work-friendly comfort.', image: 'assets/room-5.png', layout: 'assets/layout-5.svg' },
  { title: 'Velvet Edge Residence', desc: 'A higher-drama room concept with statement headboard styling, glossy details, and luxe date-night appeal.', image: 'assets/room-6.png', layout: 'assets/layout-6.svg' },
  { title: 'Urban Calm Smart Suite', desc: 'Modern smart-stay setup with efficient layout flow, hospitality comfort, and premium nightly-rate potential.', image: 'assets/room-7.png', layout: 'assets/layout-7.svg' },
  { title: 'Spintex Luxe Flagship', desc: 'Hero room concept for marketing, premium guest acquisition, launch campaigns, and top-tier listing visuals.', image: 'assets/room-8.png', layout: 'assets/layout-8.svg' }
];

const reviewPool = [
  {
    title: 'Elegant, calm, and beautifully put together',
    text: 'The lighting, finishes, and setup made it feel far more premium than a standard short-stay apartment.',
    author: 'Ama · Business Traveler',
    score: '5.0 rating concept'
  },
  {
    title: 'Exactly the type of place I would book again',
    text: 'It had that boutique feel with a smart layout and a polished look that works for both leisure and work trips.',
    author: 'Kwesi · Weekend Guest',
    score: 'Guest favorite preview'
  },
  {
    title: 'Luxury energy without feeling overdone',
    text: 'Strong visual identity, clean styling, and the kind of room photos that would absolutely stop a scroll on Airbnb.',
    author: 'Nadia · Design-Led Traveler',
    score: 'Top-review concept'
  }
];

const demandStates = [
  { label: '25% of suites reserved this week', text: 'Demo demand preview only. Connect to Airbnb, Booking.com, Agoda, or your PMS later for real numbers.' },
  { label: '50% of suites reserved for upcoming stays', text: 'This section is styled as a demand pulse preview so the site feels alive without pretending it is your live back office.' },
  { label: 'Several guests currently viewing booking options', text: 'Use this area later for genuine live availability pulled from your channel manager or direct booking engine.' }
];

const suiteGrid = document.getElementById('suiteGrid');
const modal = document.getElementById('suiteModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalRoomImage = document.getElementById('modalRoomImage');
const modalLayoutImage = document.getElementById('modalLayoutImage');
const occupancyLabel = document.getElementById('occupancyLabel');
const occupancyText = document.getElementById('occupancyText');
const reviewTitle = document.getElementById('reviewTitle');
const reviewText = document.getElementById('reviewText');
const reviewAuthor = document.getElementById('reviewAuthor');
const reviewScore = document.getElementById('reviewScore');
const signupPopup = document.getElementById('signupPopup');
const signupForm = document.getElementById('signupForm');
const signupStatus = document.getElementById('signupStatus');

suites.forEach((suite, index) => {
  const card = document.createElement('article');
  card.className = 'suite-card';
  card.innerHTML = `
    <img src="${suite.image}" alt="${suite.title}" />
    <div class="suite-body">
      <p class="eyebrow">Suite ${index + 1}</p>
      <h3>${suite.title}</h3>
      <p>${suite.desc}</p>
      <div class="suite-actions">
        <a class="inline-link" href="#" data-index="${index}" data-action="view">View suite + layout</a>
        <a class="inline-link" href="https://wa.me/13473914312?text=Hello%20Spintex%20Suites%2C%20I%20am%20interested%20in%20${encodeURIComponent(suite.title)}" target="_blank" rel="noopener">Ask about this room</a>
      </div>
    </div>
  `;
  suiteGrid.appendChild(card);
});

suiteGrid.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-action="view"]');
  if (!trigger) return;
  event.preventDefault();
  const suite = suites[Number(trigger.dataset.index)];
  modalTitle.textContent = suite.title;
  modalDesc.textContent = suite.desc;
  modalRoomImage.src = suite.image;
  modalLayoutImage.src = suite.layout;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
});

document.addEventListener('click', (event) => {
  if (event.target.matches('[data-close="true"]')) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
  if (event.target.matches('[data-popup-close="true"]')) {
    signupPopup.classList.remove('open');
    signupPopup.setAttribute('aria-hidden', 'true');
    localStorage.setItem('spintex-popup-closed', 'yes');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    signupPopup.classList.remove('open');
    signupPopup.setAttribute('aria-hidden', 'true');
  }
});

function updateDemandPulse() {
  const state = demandStates[Math.floor(Math.random() * demandStates.length)];
  occupancyLabel.textContent = state.label;
  occupancyText.textContent = state.text;
}

function rotateReview() {
  const review = reviewPool[Math.floor(Math.random() * reviewPool.length)];
  reviewTitle.textContent = review.title;
  reviewText.textContent = review.text;
  reviewAuthor.textContent = review.author;
  reviewScore.textContent = review.score;
}

updateDemandPulse();
rotateReview();
setInterval(updateDemandPulse, 9000);
setInterval(rotateReview, 7000);

setTimeout(() => {
  if (!localStorage.getItem('spintex-popup-closed')) {
    signupPopup.classList.add('open');
    signupPopup.setAttribute('aria-hidden', 'false');
  }
}, 1800);

const inquiryForm = document.getElementById('inquiryForm');
const formStatus = document.getElementById('formStatus');

async function submitToInquiryEndpoint(formElement, statusElement, successMessage) {
  const formData = new FormData(formElement);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Could not send request right now.');
    }

    statusElement.textContent = successMessage;
    formElement.reset();
    return true;
  } catch (error) {
    statusElement.textContent = 'Email service is not active yet on this deployment. Add the Resend API key in Cloudflare, or use direct email and WhatsApp for now.';
    console.error(error);
    return false;
  }
}

inquiryForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  formStatus.textContent = 'Sending...';
  await submitToInquiryEndpoint(
    inquiryForm,
    formStatus,
    'Message sent. Spintex Suites will receive it at spintexsuites@gmail.com.'
  );
});

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  signupStatus.textContent = 'Submitting...';
  const ok = await submitToInquiryEndpoint(
    signupForm,
    signupStatus,
    'You are on the list. Spintex Suites will receive your signup in spintexsuites@gmail.com.'
  );
  if (ok) {
    localStorage.setItem('spintex-popup-closed', 'yes');
    setTimeout(() => {
      signupPopup.classList.remove('open');
      signupPopup.setAttribute('aria-hidden', 'true');
    }, 900);
  }
});
