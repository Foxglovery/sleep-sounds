// Core carousel variables
var radius = 240; // Radius of the carousel
var autoRotate = true; // Whether to auto-rotate
var rotateSpeed = -60; // Rotation speed (seconds per 360°)
var btnWidth = 120; // Button width in pixels
var btnHeight = 170; // Button height in pixels

// Generate buttons for sounds
const sounds = [
  "fart1",
  "fart2",
  "fart3",
  "fart4",
  "fart5",
  "fart6",
  "fart7",
  "fart8",
  "fart9",
  "fart10",
  "fart11",
  "fart12",
  "fart13",
  "fart14",
  "fart15",
  "fart16",
  "fart17",
  "fart18",
  "fart19",
  "fart20",
  "fart21",
  "fart22",
  "fart23",
  "fart24",
  "fart25",
  "fart26",
  "fart27",
  "fart28",
  "fart29",
  "fart30",
  "fart31",
  "fart32",
  "fart33",
  "fart34",
  "fart35",
  "fart36",
  "fart37",
  "fart38",
];

const alternateTexts = [
  "Spooky",
  "Woof",
  "Proof",
  "Listen",
  "Facts",
  "What?",
  "How?",
  "Wacky",
  "Wig!",
  "Uh-uh",
  "Dang",
  "Ruh-ro",
  "Oh no!",
  "Yeesh",
  "Oof",
];

let textIndex = 0;

// Helper: get random subset of sounds
function getRandomSubset(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Select 7 random sounds for carousel
const randomSounds = getRandomSubset(sounds, 7);

// Create buttons for the carousel
const spinContainer = document.getElementById("spin-container");

randomSounds.forEach((sound) => {
  const btn = document.createElement("button");
  btn.classList.add("carousel-btn");
  btn.innerText = alternateTexts[textIndex];
  textIndex = (textIndex + 1) % alternateTexts.length;

  // Button click handler to play the associated sound
  btn.addEventListener("click", () => {
    stopSound();
    document.getElementById(sound).play();
  });

  spinContainer.appendChild(btn); // Add button to carousel container
});

// Function to stop all sounds
function stopSound() {
  sounds.forEach((sound) => {
    const audio = document.getElementById(sound);
    audio.pause();
    audio.currentTime = 0;
  });
}

// Initialize the carousel
function initCarousel(delayTime) {
  const buttons = spinContainer.getElementsByTagName("button");

  for (let i = 0; i < buttons.length; i++) {
    const angle = i * (360 / buttons.length);
    buttons[i].style.position = "absolute";
    buttons[i].style.width = `${btnWidth}px`;
    buttons[i].style.height = `${btnHeight}px`;
    buttons[i].style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    buttons[i].style.transition = "transform 1s";
    buttons[i].style.transitionDelay =
      delayTime || `${(buttons.length - i) / 4}s`;
  }
}

// Auto-spin logic
if (autoRotate) {
  const animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
  spinContainer.style.animation = `${animationName} ${Math.abs(
    rotateSpeed
  )}s infinite linear`;
}

// Initialize after DOM load
setTimeout(() => initCarousel(0), 1000);

const dragContainer = document.getElementById("drag-container");
let isDragging = false;
let startX = 0;
let startY = 0;
let currentRotationY = 0; // Current Y-axis rotation
let rotationSpeed = 0; // Speed of rotation
let lastTouchTime = 0;

// Detect touchstart
dragContainer.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  lastTouchTime = Date.now();
  e.preventDefault(); // Prevent accidental scrolling
});

// Detect touchmove
dragContainer.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const touch = e.touches[0];
  const deltaX = touch.clientX - startX;

  // Update rotation based on touch movement
  rotationSpeed = deltaX * 0.1; // Adjust multiplier for sensitivity
  currentRotationY += rotationSpeed;

  // Apply rotation
  dragContainer.style.transform = `rotateY(${currentRotationY}deg)`;

  // Update starting position for smoother drag
  startX = touch.clientX;
  startY = touch.clientY;
  e.preventDefault();
});

// Detect touchend
dragContainer.addEventListener("touchend", () => {
  isDragging = false;

  // Gradually reduce the rotation speed for inertia effect
  const inertia = setInterval(() => {
    rotationSpeed *= 0.95; // Slow down over time
    currentRotationY += rotationSpeed;

    dragContainer.style.transform = `rotateY(${currentRotationY}deg)`;

    // Stop the inertia effect if rotationSpeed is negligible
    if (Math.abs(rotationSpeed) < 0.01) {
      clearInterval(inertia);
    }
  }, 16); // Run every 16ms (roughly 60fps)
});
