let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].classList.remove("active");
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
  setTimeout(showSlides, 4000);
}

showSlides();

// Diary Functionality
const diaryForm = document.getElementById('diaryForm');
const diaryEntry = document.getElementById('diaryEntry');
const diaryImage = document.getElementById('diaryImage');
const diaryList = document.getElementById('diaryList');
let diaryEntries = [];

diaryForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const entryText = diaryEntry.value.trim();
  const imageFile = diaryImage.files[0];

  if (!entryText && !imageFile) return; // Require at least text or image

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(event) {
      diaryEntries.unshift({
        text: entryText,
        image: event.target.result
      });
      renderDiary();
      diaryEntry.value = '';
      diaryImage.value = '';
    };
    reader.readAsDataURL(imageFile);
  } else {
    diaryEntries.unshift({
      text: entryText,
      image: null
    });
    renderDiary();
    diaryEntry.value = '';
    diaryImage.value = '';
  }
});

function renderDiary() {
  diaryList.innerHTML = diaryEntries.map((entry, idx) => {
    let html = `<div style="background:#fff0f5; margin-bottom:15px; padding:15px; border-radius:10px; box-shadow:0 2px 6px rgba(0,0,0,0.07); text-align:left;">`;
    html += `<strong>Entry ${diaryEntries.length - idx}:</strong><br>`;
    if (entry.text) html += `<div>${entry.text}</div>`;
    if (entry.image) html += `<img src="${entry.image}" alt="Diary Image" class="diary-img">`;
    html += `</div>`;
    return html;
  }).join('');
}

async function loadDiaries() {
  const res = await fetch('/diaries');
  const diaries = await res.json();
  const diaryList = document.getElementById('diaryList');
  diaryList.innerHTML = diaries.map(entry => {
    let html = `<div style="background:#fff0f5; margin-bottom:15px; padding:15px; border-radius:10px; box-shadow:0 2px 6px rgba(0,0,0,0.07); text-align:left;">`;
    html += `<strong>Entry ${entry.id}:</strong><br>`;
    if (entry.text) html += `<div>${entry.text}</div>`;
    if (entry.image_url) html += `<img src="${entry.image_url}" alt="Diary Image" class="diary-img">`;
    html += `</div>`;
    return html;
  }).join('');
}

let currentPage = 1;
const imagesPerPage = 10;

async function loadGallery(page = 1) {
  const res = await fetch('/diaries');
  const diaries = await res.json();
  const gallery = document.getElementById('galleryImages');
  const start = (page - 1) * imagesPerPage;
  const end = start + imagesPerPage;
  const pageDiaries = diaries.filter(entry => entry.image_url).slice(start, end);

  gallery.innerHTML = pageDiaries.map(entry => {
    const maxLen = 40;
    const shortText = entry.text && entry.text.length > maxLen
      ? entry.text.slice(0, maxLen) + '...'
      : entry.text || '';
    return `
      <div class="gallery-entry">
        <img src="${entry.image_url}" alt="Diary Image" class="gallery-img">
        <div class="gallery-text-overlay short-text">${shortText}</div>
        <div class="gallery-text-overlay full-text">${entry.text || ''}</div>
      </div>
    `;
  }).join('');

  // Pagination controls
  const totalPages = Math.ceil(diaries.filter(entry => entry.image_url).length / imagesPerPage);
  const pagination = document.getElementById('galleryPagination');
  pagination.innerHTML = '';
  if (totalPages > 1) {
    if (page > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.textContent = 'Previous';
      prevBtn.onclick = () => { currentPage--; loadGallery(currentPage); };
      pagination.appendChild(prevBtn);
    }
    pagination.appendChild(document.createTextNode(` Page ${page} of ${totalPages} `));
    if (page < totalPages) {
      const nextBtn = document.createElement('button');
      nextBtn.textContent = 'Next';
      nextBtn.onclick = () => { currentPage++; loadGallery(currentPage); };
      pagination.appendChild(nextBtn);
    }
  }
}

window.onload = () => {
  loadGallery(currentPage);
  loadDiaries();
};

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('closeModal').onclick = function(e) {
    document.getElementById('galleryModal').style.display = 'none';
    e.stopPropagation();
  };

  document.getElementById('galleryModal').onclick = function(e) {
    if (e.target === this) this.style.display = 'none';
  };

  document.getElementById('galleryModal').addEventListener('touchstart', function(e) {
    if (e.target === this) this.style.display = 'none';
  });
});