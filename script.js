// Get the video and controls
const video = document.querySelector('video');
const speedBar = document.querySelector('.speed-bar');
const skipButtons = document.querySelectorAll('[data-skip]');
const volume = document.querySelector('input[name="volume"]');
const playbackRate = document.querySelector('input[name="playbackRate"]');

// Toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play/pause button text
function updateButton() {
  const toggle = document.querySelector('.toggle');
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update progress bar
function updateProgress() {
  const progress = document.querySelector('.progress');
  const progressFilled = document.querySelector('.progress__filled');
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

// Handle skipping (« 10s and 25s »)
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle volume and playback speed
function handleSlider() {
  video[this.name] = this.value;
  // Update speed display
  if (this.name === 'playbackRate') {
    speedBar.textContent = `${this.value}×`;
  }
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);

skipButtons.forEach(btn => btn.addEventListener('click', skip));
volume.addEventListener('input', handleSlider);
playbackRate.addEventListener('input', handleSlider);
