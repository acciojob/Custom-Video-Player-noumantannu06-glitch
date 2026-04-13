// scripts.js - Custom Video Player Implementation

// Select all required DOM elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelector('.player__slider');

// Ensure video source is set
video.src = 'download.mp4';

// Play/Pause toggle functionality
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('loadedmetadata', updateButton);

// Progress bar functionality
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Skip buttons functionality
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(button => button.addEventListener('click', skip));

// Range inputs (volume and playbackRate) functionality
function handleRangeUpdate() {
  video[this.name] = this.value;
}

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// Volume initialization (set to 50% by default)
video.volume = 0.5;

// Error handling for video load failure
video.addEventListener('error', function(e) {
  console.error('Video failed to load:', e);
  // Optionally show user-friendly error message
  toggle.textContent = 'ERROR';
  toggle.style.backgroundColor = '#ff4444';
  video.style.display = 'none';
});

// Keyboard shortcuts (bonus feature)
document.addEventListener('keydown', function(e) {
  if (e.code === 'Space') {
    e.preventDefault();
    togglePlay();
  }
});