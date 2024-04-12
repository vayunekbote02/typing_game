// Create the canvas
var canvas = document.createElement("canvas");
// var canvas = document.getElementById("maincanvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 400;
document.getElementsByTagName("body")[0].appendChild(canvas);
canvas.style.backgroundColor = "black";

// Define the word properties
var words = [
  "vayun",
  "vjti",
  "deutsche",
  "azerbaijan",
  "animations",
  "birthday",
  "asafoetida",
];

const initialLength = words.length;
var wordObjects = [];
var settingObjects = [
  {
    text: "playagain",
    typed: "",
  },
  {
    text: "start",
    typed: "",
  },
];

var gameOver = true;
var condition = "beginning";
var score;

// Starting of the game
if (gameOver && condition === "beginning") {
  callStart();
}

document.addEventListener("keydown", function (e) {
  if (gameOver) {
    if (condition === "end") {
      callPlayAgain();
    }
    for (var i = 0; i < settingObjects.length; i++) {
      var setting = settingObjects[i];
      if (e.key.toLowerCase() === setting.text[setting.typed.length]) {
        setting.typed += e.key.toLowerCase();
        // console.log(settingObjects);
        if (
          (setting.typed === setting.text && setting.text === "playagain") ||
          (setting.typed === setting.text && setting.text === "start")
        ) {
          resetGame();
          animate();
        }
        break;
      }
    }
  } else {
    for (var i = 0; i < wordObjects.length; i++) {
      var wordObj = wordObjects[i];
      if (e.key.toLowerCase() === wordObj.word[wordObj.typed.length]) {
        wordObj.typed += e.key.toLowerCase();
        break;
      }
    }
  }
});

function resetGame() {
  gameOver = false;
  condition = "";
  score = 0;
  settingObjects.forEach((setting) => (setting.typed = ""));
  wordObjects = [];
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var wordWidth = ctx.measureText(word).width;
    var wordX = -wordWidth;
    var wordY =
      Math.floor(Math.random() * (canvas.height - 0.1 * canvas.height)) +
      0.05 * canvas.height;
    var wordSpeed = Math.floor(Math.random() * 1) + 1; // Random speed between 3 and 8
    wordObjects.push({ word, wordWidth, wordX, wordY, wordSpeed, typed: "" });
  }
}

function callPlayAgain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "28px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(
    settingObjects[0].text,
    canvas.width / 2 - ctx.measureText(settingObjects[0].text).width / 2,
    canvas.height / 2 + 60
  );
  ctx.fillStyle = "green";
  ctx.fillText(
    settingObjects[0].typed,
    canvas.width / 2 - ctx.measureText(settingObjects[0].text).width / 2,
    canvas.height / 2 + 60
  );
  ctx.fillStyle = "white";
  ctx.fillText(
    settingObjects[0].text.slice(settingObjects[0].typed.length),
    canvas.width / 2 -
      ctx.measureText(settingObjects[0].text).width / 2 +
      ctx.measureText(settingObjects[0].typed).width,
    canvas.height / 2 + 60
  );

  if (gameOver) {
    requestAnimationFrame(callPlayAgain);
  }
}

function callStart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "28px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(
    "Just type whatever you see!",
    canvas.width / 2 - ctx.measureText("Just type whatever you see!").width / 2,
    canvas.height / 2
  );
  ctx.fillText(
    settingObjects[1].text,
    canvas.width / 2 - ctx.measureText(settingObjects[1].text).width / 2,
    canvas.height / 2 + 60
  );
  ctx.fillStyle = "green";
  ctx.fillText(
    settingObjects[1].typed,
    canvas.width / 2 - ctx.measureText(settingObjects[1].text).width / 2,
    canvas.height / 2 + 60
  );
  ctx.fillStyle = "white";
  ctx.fillText(
    settingObjects[1].text.slice(settingObjects[1].typed.length),
    canvas.width / 2 -
      ctx.measureText(settingObjects[1].text).width / 2 +
      ctx.measureText(settingObjects[1].typed).width,
    canvas.height / 2 + 60
  );

  if (gameOver) {
    requestAnimationFrame(callStart);
  }
}

// Animation function
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the words
  for (var i = 0; i < wordObjects.length; i++) {
    var wordObj = wordObjects[i];
    ctx.font = "30px Arial";
    ctx.fillStyle = "green";

    ctx.fillText(wordObj.typed, wordObj.wordX, wordObj.wordY);
    ctx.fillStyle = "white";
    ctx.fillText(
      wordObj.word.slice(wordObj.typed.length),
      wordObj.wordX + ctx.measureText(wordObj.typed).width,
      wordObj.wordY
    );

    ctx.font = "34px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(
      "Words Remaining: " + (initialLength - score),
      canvas.width - 330,
      40
    );

    // Update the position
    wordObj.wordX += wordObj.wordSpeed;

    // Check if word is out of canvas
    if (wordObj.wordX + ctx.measureText(wordObj.word).width > canvas.width) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "34px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(
        `You typed ${score} words. Press any key to continue...`,
        canvas.width / 2 -
          ctx.measureText(
            `You typed ${score} words. Press any key to continue...`
          ).width /
            2,
        canvas.height / 2
      );
      gameOver = true;
      condition = "end";
      return;
    }

    if (wordObj.typed === wordObj.word) {
      // Remove the word from the screen
      score += 1;
      wordObjects.splice(i, 1);
    }

    if (score === initialLength) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "34px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(
        "Cleared! Press any key to continue...",
        canvas.width / 2 -
          ctx.measureText("Cleared! Press any key to continue...").width / 2,
        canvas.height / 2
      );
      gameOver = true;
      condition = "end";
      return;
    }
  }

  if (!gameOver) {
    requestAnimationFrame(animate);
  }
}
