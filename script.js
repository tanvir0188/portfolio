let words = document.getElementsByClassName("word");

let wordArray = []; //will store arrays of letters for each word
let currentWord = 0; //will store the index of the currently displayed word;
words[currentWord].style.opacity = 1;

const splitLetters = (word) => {
  let content = word.innerText;
  word.innerText = "";
  let letters = [];
  for (let i = 0; i < content.length; i++) {
    let letter = document.createElement("span");
    letter.className = "letter";
    letter.innerText = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  wordArray.push(letters);
};

for (let i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

const animateLetterOut = (cw, i) => {
  setTimeout(function () {
    cw[i].className = "letter out";
  }, i * 80);
};

const animateLetterIn = (nw, i) => {
  setTimeout(function () {
    nw[i].className = "letter in";
  }, 340 + i * 80); // delay of 340, so that new letters ("design") start falling down once the first animation is completed.
};

const changeWord = () => {
  let cw = wordArray[currentWord]; // wordArray[0] gives us: [c,o,d,e]
  let nw =
    currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1]; // evals to wordArray[1] and gives us: [d,e,s,i,g,n]

  for (let i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i); // called for each letter of [c,o,d,e] with different i values, so we have a delay between each letter when they fade out.
  }

  for (let i = 0; i < nw.length; i++) {
    //for each letter inside [d,e,s,i,g,n]
    nw[i].className = "letter behind"; //we set initial position to the top
    nw[0].parentElement.style.opacity = 1; //we set the opacity to 1, but currently invisible due to overlow hidden.
    animateLetterIn(nw, i); //animates each letter as if they fall down from top.
  }
  //update currentWord index.
  currentWord = currentWord == wordArray.length - 1 ? 0 : currentWord + 1;
};

// Call the function, sit back and enjoy the show!

changeWord(); //initial call
setInterval(changeWord, 3000); //call every 4s bac

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
};

const circle = document.querySelector("circle");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

// Example: Set progress to 50%
setProgress(50);

document.getElementById("menu-icon").addEventListener("click", function() {
  var navMenu = document.getElementById("navMenu");
  var navBar = document.getElementById("navbar");
  if (navMenu.style.display === "flex") {
      navMenu.style.display = "none";
      navBar.style.background = "transparent";
      
  } else {
      navMenu.style.display = "flex";
      navBar.style.background= "#292e33";
  }
});
