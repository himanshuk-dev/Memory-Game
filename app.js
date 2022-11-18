const gameContainer = document.getElementById("game");
const clickCount = document.querySelector("#clicks");
let clicks = 1;
let count = 0;
let firstCard = null;
let secondCard = null;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "violet",
  "violet",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // Add background image for each div
    // newDiv.style.backgroundImage = 'url("images/smiley.jpeg")';
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  if (event.target.classList.contains("active")) return;
  let activeCard = event.target;
  // Count number of clicks

  count += 1;
  console.log("click count", count);
  if (count > 2) {
    () => {
      activeCard.removeEventlistener("click", handleCardClick);
      activeCard.style.backgroundColor = "";
      firstCard = null;
      secondCard = null;
    };
  } else {
    activeCard.style.backgroundColor = activeCard.attributes.class.value;
    clickCount.innerHTML = clicks;
    clicks += 1;
  }

  if (!firstCard || !secondCard) {
    activeCard.classList.add("active");
    firstCard = firstCard || activeCard;
    secondCard = activeCard === firstCard ? null : activeCard;
  }
  console.log("firstcard", firstCard);
  console.log("secondcard", secondCard);

  if (firstCard && secondCard) {
    let firstClass = firstCard.className;
    let secondClass = secondCard.className;

    if (firstClass === secondClass) {
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
      count = 0;
    } else {
      count = 0;
      setTimeout(function () {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove("active");
        secondCard.classList.remove("active");
        firstCard = null;
        secondCard = null;
      }, 1000);
    }
  }

  setTimeout(function () {
    // event.target.classList.remove("flip-img");
  }, 1000);

  console.log("card flipped", event);
}
// when the DOM loads
createDivsForColors(shuffledColors);

/* */
