// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get the video element (the existing .flex video)
  const video = document.querySelector('video.flex');
  // Get the progress bar element
  const progressBar = document.querySelector('.progress__filled');
  // Get the play/pause toggle button (assuming it has class player__button)
  const toggle = document.querySelector('.player__button');
  // Get volume and playback speed sliders
  const volume = document.querySelector('input[name="volume"]');
  const playbackSpeed = document.querySelector('input[name="playbackRate"]');
  // Get the « 10s and 25s » buttons (assuming they have classes rewind and skip)
  const rewindBtn = document.querySelector('.rewind');
  const skipBtn = document.querySelector('.skip');

  // If video not found, exit (Cypress will fail anyway)
  if (!video) return;

  // Change video source to the required one
  video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';

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
    if (toggle) {
      toggle.textContent = video.paused ? '►' : '❚ ❚';
    }
  }

  // Update progress bar
  function updateProgress() {
    if (progressBar) {
      const percent = (video.currentTime / video.duration) * 100;
      progressBar.style.flexBasis = `${percent}%`;
    }
  }

  // Rewind 10 seconds
  function rewind() {
    video.currentTime = Math.max(0, video.currentTime - 10);
  }

  // Skip forward 25 seconds
  function skipForward() {
    video.currentTime = Math.min(video.duration, video.currentTime + 25);
  }

  // Handle volume and playback speed
  function handleSlider() {
    video[this.name] = this.value;
  }

  // Event listeners
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', updateProgress);

  if (toggle) {
    toggle.addEventListener('click', togglePlay);
  }

  if (rewindBtn) {
    rewindBtn.addEventListener('click', rewind);
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', skipForward);
  }

  if (volume) {
    volume.addEventListener('input', handleSlider);
  }

  if (playbackSpeed) {
    playbackSpeed.addEventListener('input', handleSlider);
  }
});
