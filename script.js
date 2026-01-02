// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Get elements using the class names expected by the test
  const video = document.querySelector('.player__video');
  const toggle = document.querySelector('.toggle');
  const rewindBtn = document.querySelector('.rewind');
  const skipBtn = document.querySelector('.skip'); // for 25s forward

  // If any element is missing, exit early (Cypress will fail anyway)
  if (!video || !toggle || !rewindBtn || !skipBtn) {
    console.error('Required elements not found in DOM');
    return;
  }

  // Toggle play/pause
  function togglePlay() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  // Update toggle button text
  function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
  }

  // Rewind 10 seconds
  function rewind() {
    video.currentTime = Math.max(0, video.currentTime - 10);
  }

  // Skip forward 25 seconds
  function skipForward() {
    video.currentTime = Math.min(video.duration, video.currentTime + 25);
  }

  // Event listeners
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  toggle.addEventListener('click', togglePlay);
  rewindBtn.addEventListener('click', rewind);
  skipBtn.addEventListener('click', skipForward);
});
