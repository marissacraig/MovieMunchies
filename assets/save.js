
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
        const movieName = combo.movieName;
        // to get recipe name, combo.recipeName
        const recipeName = combo.recipeName;
        // to get movie description, combo.movieDescription
        const movieDescription = combo.movieDescription;
        // to get ingredients, combo.recipeIngredients
        const recipeIngredients = combo.recipeIngredients;
        // to get movie image link, combo.movieImg
        const movieImage = combo.movieImg;
        // to get recipe image link, combo.recipeImg
        const recipeImage = combo.recipeImg;
        console.log(combo);
        movieImageEl.setAttribute('src', movieImage);
        movieNameEl.textContent = movieName;
        movieDescriptionEl.textContent = movieDescription;
    
        recipeImageEl.setAttribute('src', recipeImage);
        recipeNameEl.textContent = recipeName;
        // Split and join recipeIngredients to display on separate lines
        document.getElementById('ingredientDescription').innerHTML = combo.recipeIngredients.replace(/\,/g, '<br>');
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

    // Create a huge button
    const listItem = document.createElement('li');
        listItem.classList.add('mb-3');
   
    const columnId = `column0`;
    const column = document.getElementById(columnId);
    column.appendChild(listItem);
    const hugeButton = document.createElement('button');
    hugeButton.classList.add('button', 'is-primary', 'is-large', 'js-modal-trigger');
    hugeButton.dataset.target.add('modal-trigger');
    hugeButton.textContent = movieName +' / '+ recipeName;
    hugeButton.setAttribute('id', combos[i]);
        const id = this.getAttribute('id');
        const data = localStorage.getItem(id);
    
    listItem.appendChild(hugeButton);

    // Create a small delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button', 'is-danger', 'is-small');
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('id', 'delete');
    deleteButton.addEventListener('click', function (event) {
        event.preventDefault();
        const listItem = this.parentElement;

        var combos = [];
        const storedCombos = localStorage.getItem('combos');
        const parsedData = JSON.parse(storedCombos);
        combos = parsedData;
        const indexToRemove = combos.indexOf(this.previousSibling.getAttribute('id'));

        combos.splice(indexToRemove, 1);
        localStorage.removeItem(this.previousSibling.getAttribute('id')); // Remove the corresponding item from local storage
        listItem.remove(); // Remove the whole <li> element containing the buttons
        var tally = 0;
        if (localStorage.getItem('tally') !== null) {
            var intValue = localStorage.getItem('tally');
            tally = parseInt(intValue);
        }
        tally = tally - 1;
        localStorage.setItem('tally', tally);
        var combosString = JSON.stringify(combos);
        localStorage.setItem('combos', combosString);
    });
    listItem.appendChild(deleteButton);

   
   



reload();