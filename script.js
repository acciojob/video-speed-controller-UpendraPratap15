// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get the video and controls
  const video = document.querySelector('video');
  const progress = document.querySelector('.progress');
  const progressBar = document.querySelector('.progress__filled');
  const toggle = document.querySelector('.toggle');
  const volume = document.querySelector('input[name="volume"]');
  const playbackSpeed = document.querySelector('input[name="playbackRate"]');
  const skipButtons = document.querySelectorAll('[data-skip]');
  const speedBar = document.querySelector('.speed-bar');

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
    toggle.textContent = video.paused ? '►' : '❚ ❚';
  }

  // Update progress bar
  function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

  // Skip forward/backward
  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
  }

  // Handle volume and playback speed
  function handleSlider() {
    video[this.name] = this.value;
    if (this.name === 'playbackRate') {
      speedBar.textContent = `${this.value}×`;
    }
  }

  // Only add event listeners if elements exist
  if (video) {
    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('timeupdate', updateProgress);
  }

  if (toggle) {
    toggle.addEventListener('click', togglePlay);
  }

  if (skipButtons.length > 0) {
    skipButtons.forEach(btn => btn.addEventListener('click', skip));
  }

  if (volume) {
    volume.addEventListener('input', handleSlider);
  }

  if (playbackSpeed) {
    playbackSpeed.addEventListener('input', handleSlider);
  }

  if (progress && progressBar) {
    let mousedown = false;
    function scrub(e) {
      if (mousedown) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime;
      }
    }
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);
  }
});
