let bird = document.getElementById("bird");
let isJumping = false;
let score = 0;
let scoreElement = document.getElementById("score");
let startButton = document.getElementById("start-button");

startButton.addEventListener("click", startGame);

function startGame() {
  startButton.style.display = "none";

  document.addEventListener("mousedown", jump);

  function jump() {
    if (!isJumping) {
      isJumping = true;
      bird.classList.add("jump-animation");
      setTimeout(() => {
        bird.classList.remove("jump-animation");
        isJumping = false;
      }, 500);
    }
  }

  function increaseScore() {
    score++;
    scoreElement.textContent = "Score: " + score;
  }

  function checkCollision(pipe) {
    let birdRect = bird.getBoundingClientRect();
    let pipeRect = pipe.getBoundingClientRect();

    return (
      birdRect.bottom > pipeRect.top &&
      birdRect.top < pipeRect.bottom &&
      birdRect.right > pipeRect.left &&
      birdRect.left < pipeRect.right
    );
  }

  function createRandomPipe() {
    let pipe = document.createElement("div");
    pipe.className = "pipe";
    let heightClass = getRandomHeightClass();
    pipe.classList.add(heightClass);
    document.getElementById("game-container").appendChild(pipe);

    let position = window.innerWidth;
    let passed = false; 
    let pipeInterval = setInterval(() => {
      position -= 5;

      if (position < -50) {
        clearInterval(pipeInterval);

        
        if (!passed) {
          increaseScore();
          passed = true;
        }

        document.getElementById("game-container").removeChild(pipe);
      } else {
        pipe.style.left = position + "px";

        if (checkCollision(pipe) && !passed) {
          gameOver();
        }
      }
    }, 20);
  }

  function getRandomHeightClass() {
    const classes = ["low", "medium", "high"];
    return classes[Math.floor(Math.random() * classes.length)];
  }

  function movePipes() {
    setInterval(() => {
      createRandomPipe();
    }, 3000);
  }

  function gameOver() {
    alert("Game Over! Your Score: " + score);
    location.reload();
  }

  movePipes();
}
