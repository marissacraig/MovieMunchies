
// function listMovies() {
//     var movieTitles = JSON.parse(localStorage.getItem('movieTitles'));
//     for (var i = 0; i < movieTitles.length; i++) {
//         var liEl = document.createElement('li');
//         liEl.textContent = movieTitles[i];
//         liEl.setAttribute('class', 'box');
//         liEl;
//         console.log(liEl);

//         var olEl = document.getElementById('movieTitles');
//         olEl.appendChild(liEl);
//     }
// }

// function listMunchies() {
//     var munchieTitles = JSON.parse(localStorage.getItem('munchieTitles'));
//     for (var i = 0; i < munchieTitles.length; i++) {
//         var liEl = document.createElement('li');
//         liEl.textContent = munchieTitles[i];
//         liEl.setAttribute('class', 'box');
//         liEl;
//         console.log(liEl);

//         var olEl = document.getElementById('munchieTitles');
//         olEl.appendChild(liEl);
//     }
// }

// listMovies();
// listMunchies();

function reload() {
    var tally = 0; 
    // if tally does not exist yet, then just use prior set 0
    if (localStorage.getItem('tally') !== null) {
        var intValue = localStorage.getItem('tally');
        tally = parseInt(intValue);
    }
    // if no combos are saved, exit function
    if (tally === 0) {
        return;
    }
    // iteratre through each saved combo
    for (var i = 1; i < tally + 1; i++) {
        const data = localStorage.getItem('combo' + i.toString());
        const combo = JSON.parse(data);
        // to get movie name, combo.movieName
        // to get recipe name, combo.recipeName
        // to get movie description, combo.movieDescription
        // to get ingredients, combo.recipeIngredients
        // to get movie image link, combo.movieImg
        // to get recipe image link, combo.recipeImg
        console.log(combo);
        // get the various id elements from html and add those parts
        // however you think. 
        // remember both the movie parts are links that need to be placed in src
        // maybe only have recipe and movie name displayed in the small box but 
        // when clicked on, have all the information pop up like the main page
        // with a specific windor for that info, like on project 6.
    }
}

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        closeAllModals();
      }
    });
  

reload();