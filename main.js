// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

let x = 0;

document.querySelector(".start button").onclick = () => {
  document.querySelector(".start").remove();
  document.getElementById("start").play();
};

let gameContainer = document.querySelector(".parent .container");

// Array of letters
let lettersArray = Array.from(letters);

// Letters container
let lettersContainer = document.querySelector(".the-letters");

// Generate letters

lettersArray.forEach((letter) => {
  // Create span
  let span = document.createElement("span");

  // Add class letter-box to span
  span.className = "letter-box";

  // Create letter text node
  let theLetter = document.createTextNode(letter);

  // Append theLetter to the span
  span.appendChild(theLetter);

  // Append the span to the letters container
  lettersContainer.appendChild(span);
});

// Object of words + categories
let words = {
  programming: ["python", "php", "mysql", "html", "css", "java script", "java", "kotlin"],
  character: ["Albert Einstein", "Archimedes", "Marie Curie", "Alexander", "Louis", "Alfred Nobel"],
  countries: ["Germany", "UK", "USA", "Italy", "Russia"],
  films: ["Paratise", "Black Hawk Down", "Terrifier"],
};

// Get all properties of object
let allKeys = Object.keys(words);

// Get random number depend on properties number
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category words
let randomPropValues = words[randomPropName];

// Get random number depend on values number
let randomValueNumber = Math.floor(Math.random() * randomPropValues.length);

// The chosen word
let randomValueValue = randomPropValues[randomValueNumber];

// Set category info
document.querySelector(".category span").innerHTML = randomPropName;

// Select lettersGuessElement
let lettersGuessElement = document.querySelector(".letters-guess");

// Convert chosen word to array
let lettersAndSpace = Array.from(randomValueValue);
// Create empty span depend on chosen word
lettersAndSpace.forEach((letter) => {
  // Create empty span
  let emptySpan = document.createElement("span");

  // Check if letter is space
  if (letter === " ") {
    // Add class with space
    emptySpan.className = "with-space";
    ++x;
  }
  // Append span to lettersGuessElement
  lettersGuessElement.appendChild(emptySpan);
});

// Select all the span in the letters-guess
let guessSpans = document.querySelectorAll(".letters-guess span");

// Wrong attmpts
let wrongAttempts = 0;

// Select the draw element
let theDraw = document.querySelector(".hangman-draw");

// Add event click on spans (letter box)
addEventListener("click", (e) => {
  // Check if element is a span with class letter-box
  if (e.target.className === "letter-box") {
    // Set the status default value
    let theStatus = false;
    // Add class clicked to the target
    e.target.classList.add("clicked");

    // Array from the charcters of the chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    // The clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // Loop on to check if there's a match between the lettersAndSpace and the clicked value
    theChosenWord.forEach((wordLetter, wordIndex) => {
      // Check if the clicekd letter equal to word letter
      if (theClickedLetter === wordLetter) {
        theStatus = true;

        guessSpans.forEach((span, spanIndex) => {
          if (spanIndex === wordIndex) {
            span.innerHTML = theClickedLetter;
            ++x;
            document.getElementById("positive").play();
          }
        });
      }
    });
    if (theStatus !== true) {
      document.getElementById("negative").play();
      // Increase wrong attmeps by 1
      wrongAttempts++;

      // Add class wrong on the draw element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts === 8) {
        lettersContainer.classList.add("disabled");

        // Create div
        let div = document.createElement("div");
        let container = document.createElement("div");
        container.className = "containerLose";
        let textNodeLose = document.createTextNode(
          "Sorry 😥 You Have Reached The Limit Of Incorrect Tries."
        );
        let button = document.createElement("button");
        button.textContent = "Retry The Game";
        button.onclick = () => {
          window.location.reload();
        };
        container.appendChild(textNodeLose);
        container.appendChild(button);
        div.appendChild(container);
        div.className = "lose";
        gameContainer.appendChild(div);
      }
    } else if (theStatus == true) {
      if (guessSpans.length == x) {
        // Create div
        let div = document.createElement("div");
        let container = document.createElement("div");
        container.className = "containerWin";
        let textNode = document.createTextNode(
          `Nice 🙃 You Won Your Wrong Tries Are Just ${wrongAttempts}`
        );
        let button = document.createElement("button");
        button.textContent = "Retry The Game";
        button.onclick = () => {
          window.location.reload();
        };

        container.appendChild(textNode);
        container.appendChild(button);

        div.appendChild(container);
        div.className = "win";
        gameContainer.appendChild(div);
        theStatus = false;
        gameContainer.style.pointerEvent = "none";
      }
      localStorage.setItem("Score", wrongAttempts);
      let a = [];
      a.push(localStorage.getItem("Score"));
    }
  }
});
