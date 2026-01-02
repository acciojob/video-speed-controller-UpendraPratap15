// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get the video and controls
  const video = document.querySelector('video');
  const progress = document.querySelector('.progress');
  const progressBar = document.querySelector('.progress__filled');
  const toggle = document.querySelector('.player__button');
  const volume = document.querySelector('input[name="volume"]');
  const playbackSpeed = document.querySelector('input[name="playbackRate"]');
  const rewindBtn = document.querySelector('.rewind'); // « 10s
  const skipBtn = document.querySelector('.skip');     // 25s »

  // If any element is missing, exit early
  if (!video || !progress || !progressBar || !toggle) {
    console.error('Required video or progress elements not found');
    return;
  }

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
    toggle.textContent = video.paused ? '►' : '❚ ❚';
  }

  // Update progress bar
  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
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
  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', handleProgress);

  toggle.addEventListener('click', togglePlay);

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

  // Progress bar scrubbing (click/drag to seek)
  let mousedown = false;
  function scrub(e) {
    if (mousedown) {
      const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
      video.currentTime = scrubTime;
    }
  }

  if (progress && progressBar) {
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);
  }
});
