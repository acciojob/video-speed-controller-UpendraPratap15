// script.js

// Select elements
const player = document.querySelector('.wrapper');
const video = player.querySelector('video');

// Change video source as required
video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';  // Big Buck Bunny [web:6][web:15]

// Create controls container
const controls = document.createElement('div');
controls.classList.add('player__controls');
controls.innerHTML = `
  <button class="player__button toggle" title="Toggle Play">►</button>
  <button class="player__button skip" data-skip="-10">« 10s</button>
  <button class="player__button skip" data-skip="25">25s »</button>

  <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
  <input type="range" name="playbackRate" class="player__slider" min="0.25" max="2" step="0.25" value="1">

  <div class="progress">
    <div class="progress__filled"></div>
  </div>
`;
player.appendChild(controls);

// Hook up JS
const toggle = controls.querySelector('.toggle');
const skipButtons = controls.querySelectorAll('[data-skip]');
const ranges = controls.querySelectorAll('.player__slider');
const progress = controls.querySelector('.progress');
const progressBar = controls.querySelector('.progress__filled');

// Play / Pause toggle
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play / pause button icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update volume and playbackRate
function handleRangeUpdate() {
  video[this.name] = parseFloat(this.value);
}

// Skip forward / backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Update progress bar as video plays
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub video when clicking / dragging on progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

// Progress bar scrubbing
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
