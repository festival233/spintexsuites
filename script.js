const suites = [
  {
    id: 1,
    label: 'Signature Studio 01',
    title: 'The Gold Residence',
    image: 'assets/suite-01.svg',
    layout: 'assets/layout-01.svg',
    description: 'A warm luxury studio with soft gold accents, layered lighting, an executive work nook, and a boutique-hotel feel.',
    features: ['Queen bed concept', 'Kitchenette wall', 'Vanity + statement mirror', 'Remote-work desk', 'Warm layered cove lighting'],
    tags: ['Luxury Studio', 'Work Friendly', 'Warm Palette']
  },
  {
    id: 2,
    label: 'Signature Studio 02',
    title: 'The Noir Loft',
    image: 'assets/suite-02.svg',
    layout: 'assets/layout-02.svg',
    description: 'A darker, moodier concept for guests who love sleek finishes, a cinematic bed wall, and a high-design urban feel.',
    features: ['Dark luxury palette', 'LED feature wall', 'Compact dining counter', 'Premium bath concept', 'Private lounge corner'],
    tags: ['Moody', 'Modern', 'Stylish']
  },
  {
    id: 3,
    label: 'Signature Studio 03',
    title: 'The Sandstone Suite',
    image: 'assets/suite-03.svg',
    layout: 'assets/layout-03.svg',
    description: 'A calm neutral suite designed for longer stays with a soft hospitality look and a very Ghana-meets-global polish.',
    features: ['Neutral palette', 'Long-stay storage', 'Coffee station', 'Textured feature wall', 'Soft hospitality finish'],
    tags: ['Neutral', 'Extended Stay', 'Calm']
  },
  {
    id: 4,
    label: 'Signature Studio 04',
    title: 'The Skyline Room',
    image: 'assets/suite-04.svg',
    layout: 'assets/layout-04.svg',
    description: 'An airy and bright suite concept with a lounge seat by the window and a polished hospitality layout.',
    features: ['Bright open feel', 'Window lounge seat', 'Compact kitchen line', 'Mirror expansion effect', 'Premium bedding concept'],
    tags: ['Bright', 'Airy', 'Elegant']
  },
  {
    id: 5,
    label: 'Signature Studio 05',
    title: 'The Executive Nest',
    image: 'assets/suite-05.svg',
    layout: 'assets/layout-05.svg',
    description: 'Built for the business traveler with a sharper workspace, faster flow, and an upscale executive mood.',
    features: ['Business traveler setup', 'Desk + charging zone', 'Leather-tone seating', 'Smart TV wall', 'Fast-move layout'],
    tags: ['Executive', 'Desk', 'Business']
  },
  {
    id: 6,
    label: 'Signature Studio 06',
    title: 'The Pearl Retreat',
    image: 'assets/suite-06.svg',
    layout: 'assets/layout-06.svg',
    description: 'A soft ivory-and-stone suite concept with spa-like bathroom energy and a premium rest-first mood.',
    features: ['Spa mood', 'Ivory palette', 'Floating vanity concept', 'Calm lighting', 'Minimal elegant styling'],
    tags: ['Spa Feel', 'Soft', 'Restful']
  },
  {
    id: 7,
    label: 'Signature Studio 07',
    title: 'The Terrace Mood',
    image: 'assets/suite-07.svg',
    layout: 'assets/layout-07.svg',
    description: 'A lifestyle-forward suite concept with indoor-outdoor energy, lounge flow, and strong social-media appeal.',
    features: ['Lifestyle aesthetic', 'Indoor-outdoor mood', 'Statement bed wall', 'Compact entertaining setup', 'Instagram-friendly angles'],
    tags: ['Lifestyle', 'Social', 'Designer']
  },
  {
    id: 8,
    label: 'Signature Studio 08',
    title: 'The Prestige Mini',
    image: 'assets/suite-08.svg',
    layout: 'assets/layout-08.svg',
    description: 'A compact but elevated room concept proving that small square footage can still flex serious luxury.',
    features: ['Efficient footprint', 'Luxury compact design', 'Storage-smart plan', 'Statement finishes', 'Short-stay optimized'],
    tags: ['Compact', 'Smart', 'Premium']
  }
];

const suiteGrid = document.getElementById('suite-grid');
const modal = document.getElementById('suite-modal');
const modalImage = document.getElementById('modal-image');
const modalLabel = document.getElementById('modal-label');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalFeatures = document.getElementById('modal-features');
const modalLayout = document.getElementById('modal-layout');

suiteGrid.innerHTML = suites.map((suite) => `
  <article class="suite-card">
    <img src="${suite.image}" alt="${suite.title} concept image" />
    <div class="suite-card-content">
      <p class="eyebrow">${suite.label}</p>
      <h3>${suite.title}</h3>
      <p>${suite.description}</p>
      <div class="suite-meta">
        ${suite.tags.map((tag) => `<span>${tag}</span>`).join('')}
      </div>
      <div class="suite-actions">
        <button type="button" data-open="${suite.id}">View Layout</button>
        <a href="https://wa.me/13473914312?text=Hello%20Spintex%20Suites%2C%20I%20am%20interested%20in%20${encodeURIComponent(suite.title)}." target="_blank" rel="noopener">Ask About It</a>
      </div>
    </div>
  </article>
`).join('');

function openSuite(id) {
  const suite = suites.find(item => item.id === Number(id));
  if (!suite) return;

  modalImage.src = suite.image;
  modalImage.alt = `${suite.title} concept view`;
  modalLabel.textContent = suite.label;
  modalTitle.textContent = suite.title;
  modalDesc.textContent = suite.description;
  modalLayout.src = suite.layout;
  modalLayout.alt = `${suite.title} layout`;
  modalFeatures.innerHTML = suite.features.map(feature => `<li>${feature}</li>`).join('');

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('click', (event) => {
  const openId = event.target.getAttribute('data-open');
  const closeFlag = event.target.getAttribute('data-close');

  if (openId) openSuite(openId);
  if (closeFlag) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});
