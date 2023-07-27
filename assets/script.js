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



// Code for search tags
const tagField = document.getElementById("tag-field");
const addTag = document.getElementById("add-tag");
const tagInput = document.getElementById("tag-input");

function createTag(message) {
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
    tagField.removeChild(controlDiv);
  });
  
  // finally nest all the tags together
  tags.appendChild(tagContent);
  tags.appendChild(tagDelete);
  controlDiv.appendChild(tags);
  tagField.appendChild(controlDiv);
  
//   newTag.classList.add("control");
//   newTag.innerHTML = `
//     <div class="tags has-addons">
//       <a class="tag is-link">${message}</a>
//       <a class="tag is-delete"></a>
//     </div>
//   `;
//   const children = newTag.childNodes;
//   console.log(children.length);
  
//   // add it to the tag field
//   tagField.appendChild(newTag);
}

addTag.addEventListener("click", () => {
  if (tagInput.value !== "") {
    createTag(tagInput.value);
  }
  tagInput.value = "";
});

tagInput.addEventListener("keyup", (event) => {
  if ((event.keyCode === 13) && (tagInput.value !== "")) {
    createTag(tagInput.value);
    tagInput.value = "";
  }
});