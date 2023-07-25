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

