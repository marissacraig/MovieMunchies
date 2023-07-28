// sudo 
var saveTally = 0;
var movieUrl;
var foodUrl;

console.log(movieUrl);



// function.on('click, button) SEARCH
/*
Function 1
take url, are query for search
modify id portions in html to save all data concerning previous search

Function 2
take food url, add query for search
modify id portions in html to save all data concerning previous search 
*/

// function.on('click', button) SAVE
/*
Function 1
check if a search has occured first
check if second HTML page is not already full with previous searches
pull all info and keep under one ID
add one to save tally
*/

// function.on('click', button) REMOVE
/*
Function 1
remove all info associated with the remove button that has been clicked 
saveTally = saveTally - 1;
*/

// var responseText = document.getElementById('response-text');

function getApi(request) {
  fetch(request)
    .then(function (response) {
      // Check the console first to see the response.status
      console.log(response.status);
      if (response.status === 404) {
        responseText.textContent = response.status;
      }
      // Then write the conditional based on that response.status value
      // Make sure to display the response on the page
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

getApi(movieUrl);
getApi(foodUrl);



// Code for movie search tags
const movieTagField = document.getElementById("movie-tag-field");
const movieAddTag = document.getElementById("movie-add-tag");
const movieTagInput = document.getElementById("movie-tag-input");

function createMovieTag(message) {
  const controlDiv = document.createElement("div");
  controlDiv.classList.add("control");
  
  const tags = document.createElement("div");
  tags.classList.add("tags", "has-addons");
  
  const tagContent = document.createElement("a");
  tagContent.classList.add("tag", "is-link");
  tagContent.innerText = message;
  
  const tagDelete = document.createElement("a");
  tagDelete.classList.add("tag", "is-delete");
  tagDelete.addEventListener("click", (event) => {
    movieTagField.removeChild(controlDiv);
  });
  
  // finally nest all the tags together
  tags.appendChild(tagContent);
  tags.appendChild(tagDelete);
  controlDiv.appendChild(tags);
  movieTagField.appendChild(controlDiv);
  
}

// When add button is clicked, create movie tag with the input text from movieTagInput
movieAddTag.addEventListener("click", () => {
  if (movieTagInput.value !== "") {
    createMovieTag(movieTagInput.value);
  }
  // Clear movieTagInput
  movieTagInput.value = "";
});

// Same as above except with enter key pressed to add tag
movieTagInput.addEventListener("keyup", (event) => {
  if ((event.keyCode === 13) && (movieTagInput.value !== "")) {
    createMovieTag(movieTagInput.value);
    movieTagInput.value = "";
  }
});


// Code for food search tags
const munchieTagField = document.getElementById("munchie-tag-field");
const munchieAddTag = document.getElementById("munchie-add-tag");
const munchieTagInput = document.getElementById("munchie-tag-input");

function createMunchieTag(message) {
  const controlDiv = document.createElement("div");
  controlDiv.classList.add("control");
  
  const tags = document.createElement("div");
  tags.classList.add("tags", "has-addons");
  
  const tagContent = document.createElement("a");
  tagContent.classList.add("tag", "is-link");
  tagContent.innerText = message;
  
  const tagDelete = document.createElement("a");
  tagDelete.classList.add("tag", "is-delete");
  tagDelete.addEventListener("click", (event) => {
    munchieTagField.removeChild(controlDiv);
  });
  
  // finally nest all the tags together
  tags.appendChild(tagContent);
  tags.appendChild(tagDelete);
  controlDiv.appendChild(tags);
  munchieTagField.appendChild(controlDiv);
  
}

munchieAddTag.addEventListener("click", () => {
  if (munchieTagInput.value !== "") {
    createMunchieTag(munchieTagInput.value);
  }
  munchieTagInput.value = "";
});

munchieTagInput.addEventListener("keyup", (event) => {
  if ((event.keyCode === 13) && (munchieTagInput.value !== "")) {
    createMunchieTag(munchieTagInput.value);
    munchieTagInput.value = "";
  }
});