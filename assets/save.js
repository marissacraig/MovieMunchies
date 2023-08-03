var movieImageEl = document.querySelector('#movieImage');
var movieNameEl = document.getElementById('movieName');
var movieDescriptionEl = document.getElementById('movieDescription');

var recipeImageEl = document.querySelector('#recipeImage');
var recipeNameEl = document.getElementById('recipeName');
var recipeDescriptionEl = document.getElementById('ingredientDescription');

const movieTitlesList = document.getElementById('movieTitles');

function reload() {
    var tally = 0; 
    var combos = [];
    // if tally does not exist yet, then just use prior set 0
    if (localStorage.getItem('tally') !== null) {
        var intValue = localStorage.getItem('tally');
        tally = parseInt(intValue);
        const storedCombos = localStorage.getItem('combos');
        const parsedData = JSON.parse(storedCombos);
        combos = parsedData;
    }
    // if no combos are saved, exit function
    if (tally === 0) {
        return;
    }
    // iteratre through each saved combo
    for (var i = 0; i < tally; i++) {

        const data = localStorage.getItem(combos[i]);
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

        const listItem = document.createElement('li');
        listItem.classList.add('mb-3');
    
        // Create a huge button
        const hugeButton = document.createElement('button');
        hugeButton.classList.add('button', 'is-primary', 'is-large');
        hugeButton.textContent = movieName +' + '+ recipeName;
        hugeButton.setAttribute('id', combos[i]);
        hugeButton.addEventListener('click', function (event) {
            window.scrollTo({
                top: 20,
                behavior: 'smooth' 
              });            

            event.preventDefault();
            const id = this.getAttribute('id');
            const data = localStorage.getItem(id);

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
            movieImageEl.setAttribute('src', movieImage);
            movieNameEl.textContent = movieName;
            movieDescriptionEl.textContent = movieDescription;
        
            recipeImageEl.setAttribute('src', recipeImage);
            recipeNameEl.textContent = recipeName;
            // Split and join recipeIngredients to display on separate lines
            document.getElementById('ingredientDescription').innerHTML = combo.recipeIngredients.replace(/\,/g, '<br>');

        })
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
    
        // Append the listItem to the corresponding column
        const columnId = `column0`;

        const column = document.getElementById(columnId);
        column.appendChild(listItem);
    }
}

reload();