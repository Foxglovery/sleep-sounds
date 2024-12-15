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

const carousel = document.querySelector(".carousel");
let isDragging = false;
let startX, scrollLeft;

// Mouse/touch start
carousel.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

// Mouse/touch move
carousel.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; // Increase multiplier for faster scrolling
  carousel.scrollLeft = scrollLeft - walk;
});
carousel.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});

// Stop dragging
carousel.addEventListener("mouseup", () => (isDragging = false));
carousel.addEventListener("mouseleave", () => (isDragging = false));
carousel.addEventListener("touchend", () => (isDragging = false));

let textIndex = 0;

sounds.forEach((sound) => {
  const btn = document.createElement("button");
  btn.classList.add("btn");

  btn.innerText = alternateTexts[textIndex];
  textIndex = (textIndex + 1) % alternateTexts.length;

  btn.addEventListener("click", () => {
    stopSound();
    document.getElementById(sound).play();
  });

  document.getElementById("buttons").appendChild(btn);
});

function stopSound() {
  sounds.forEach((sound) => {
    const song = document.getElementById(sound);

    song.pause();
    song.currentTime = 0;
  });
}
