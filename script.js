// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const rewindBtn = player.querySelector('.rewind');
const forwardBtn = player.querySelector('.forward');
const volumeInput = player.querySelector('input[name="volume"]');
const speedInput = player.querySelector('input[name="playbackSpeed"]');

// Play / pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update button icon ► / ❚ ❚
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Scrub via progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Volume control
function handleVolume() {
  video.volume = parseFloat(this.value);
}

// Playback speed control
function handleSpeed() {
  video.playbackRate = parseFloat(this.value);
}

// Rewind 10s
function handleRewind() {
  video.currentTime = Math.max(0, video.currentTime - 10);
}

// Forward 25s
function handleForward() {
  video.currentTime = Math.min(video.duration, video.currentTime + 25);
}

// Event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('click', scrub);

let mousedown = false;
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

volumeInput.addEventListener('input', handleVolume);
speedInput.addEventListener('input', handleSpeed);

rewindBtn.addEventListener('click', handleRewind);
forwardBtn.addEventListener('click', handleForward);
