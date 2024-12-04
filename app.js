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
