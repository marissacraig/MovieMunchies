var movieClearBtn = document.querySelector('#movie-clear-tag');
var movieSearchBtn = document.querySelector('#movieSearch');
var movieSkipBtn = document.querySelector('#movieSkip');
var movieImageEl = document.querySelector('#movieImage');
var movieNameEl = document.getElementById('movieName');
var movieDescriptionEl = document.getElementById('movieDescription');
var movieGenreEl = document.getElementById('movie-tag-field');

var recipeClearBtn = document.querySelector('#munchie-clear-tag');
var recipeSearchBtn = document.querySelector('#recipeSearch');
var recipeSkipBtn = document.querySelector('#recipeSkip');
var recipeImageEl = document.querySelector('#recipeImage');
var recipeNameEl = document.getElementById('recipeName');
var recipeDescriptionEl = document.getElementById('ingredientDescription');


var listGenres = ['Biography', 1, 'Film Noir', 2, 'Musical', 4, 'Sport', 5, 'Short', 6, 'Adventure', 12, 
  'Fantasy', 14, 'Animation', 16, 'Drama', 18, 'Action', 28, 'Comedy', 35, 'History', 36, 'Thriller', 53, 
  'Crime', 80, 'Documentary', 99, 'Mystery', 9648, 'Family', 10751, 'War', 10752];


// THIS IS THE ONE WE WILL USE BELOW
async function searchMoviesByGenreAndService(genreId, streamingServices) {
  const baseUrl = 'https://streaming-availability.p.rapidapi.com/v2/search/basic';
  const country = 'us'; // Change this if you want to search in a different country
  const outputLanguage = 'en'; // Change this to the desired output language

  // Construct the services parameter with the chosen streaming services
  const services = streamingServices.join('%2C');

  const url = `${baseUrl}?country=${country}&services=${services}&output_language=${outputLanguage}&show_type=movie&genre=${genreId}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd0b1b145cemsh6d5d86e9c3f2bd6p11bb95jsnec9d7eb91295', // Replace with your actual RapidAPI key
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // Check if movies were found for the given genre and streaming services
    if (result && result.result && Object.keys(result.result).length > 0) {
      // Get a random movie from the result
      const randomMovieId = Object.keys(result.result)[Math.floor(Math.random() * Object.keys(result.result).length)];
      const randomMovie = result.result[randomMovieId];

      // Get the streaming services where the movie is available
      const availableOn = Object.keys(randomMovie.streamingInfo).filter(service => randomMovie.streamingInfo[service] === true);
      movieImageEl.setAttribute('src', randomMovie.posterURLs.original);
      movieNameEl.textContent = randomMovie.title;
      movieDescriptionEl.textContent = randomMovie.overview;
      return {
        movieImage: randomMovie.posterURLs.original,
        movieTitle: randomMovie.title,
        description: randomMovie.overview
      };
    } else {
      // No movies found for the given genre and streaming services
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}


// MOVIE SEARCH EVENT
movieSearchBtn.addEventListener('click', function (event) {
  event.preventDefault();
  deleteMovieText ();
  const selectedCategory = document.getElementById('movie-tag-input').value;
  if (!selectedCategory) {
    alert("Please select a genre.")
  } else {
    for (var i = 0; i < listGenres.length; i+=2) {
      if (listGenres[i] === selectedCategory) {
        var number = listGenres[i + 1];
        searchMoviesByGenreAndService(number, ['netflix', 'prime.buy', 'hulu.addon.hbo', 'peacock.free']);
        return;
      }
    }
  }
})


// MOVIE SKIP EVENT
movieSkipBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const selectedCategory = document.getElementById('movie-tag-input').value;
  if (!movieImageEl.src) {
    alert('Please search for a movie first.');
  } else {
    if (!selectedCategory) {
      alert('Please search for the new genre first.')
    } else {
      for (var i = 0; i < listGenres.length; i += 2) {
        if (listGenres[i] === selectedCategory) {
          var number = listGenres[i + 1];
          searchMoviesByGenreAndService(number, ['netflix', 'prime.buy', 'hulu.addon.hbo', 'peacock.free']);
          return;
        }
      }
    }
  }
})


// MOVIE CLEAR FUNCTION
movieClearBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const munchieTagInput = document.getElementById('movie-tag-input');
  munchieTagInput.value = '';
})


// THIS IS THE ONE WE WILL USE BELOW
async function searchRandomRecipeByCuisine(cuisineType) {
  const baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch';
  const apiKey = 'd0b1b145cemsh6d5d86e9c3f2bd6p11bb95jsnec9d7eb91295'; // Replace with your actual RapidAPI key

  const params = new URLSearchParams({
    cuisine: cuisineType,
    number: 500, // Number of recipes to retrieve (1 to get a random recipe)
  });

  const url = `${baseUrl}?${params.toString()}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.results && result.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * result.results.length);

      // Get the random recipe using the random index
      const randomRecipe = result.results[randomIndex];

      recipeImageEl.setAttribute('src', randomRecipe.image);
      recipeNameEl.textContent = randomRecipe.title;
      testRecipe(randomRecipe.id);
      return {
        image: randomRecipe.image,
        recipeName: randomRecipe.title,
        cuisineType: cuisineType,
        recipeId: randomRecipe.id
      };
    } else {
      console.log(`No recipes found for cuisine type: ${cuisineType}`);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}


// RECIPE SEARCH EVENT
recipeSearchBtn.addEventListener('click', function (event) {
  event.preventDefault();
  deleteMunchieText ();
  const selectedCuisine = document.getElementById('munchie-tag-input').value;
  if (!selectedCuisine) {
    alert("Please select a cuisine.");
  } else {
    searchRandomRecipeByCuisine(selectedCuisine);
  }
})


// RECIPE SKIP EVENT
recipeSkipBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const selectedCuisine = document.getElementById('munchie-tag-input').value;
  if (!recipeImageEl.src) {
    alert('Please search for a recipe first.');
  } else {
    if (!selectedCuisine) {
      alert('Please search for the new cuisine first.');
    } else {
      searchRandomRecipeByCuisine(selectedCuisine);
    }
  }
})


// RECIPE CLEAR FUNCTION
recipeClearBtn.addEventListener('click', function (event) {
  event.preventDefault();
  const munchieTagInput = document.getElementById('munchie-tag-input');
  munchieTagInput.value = '';
})


// Helper function that gets the actual recipe of the randomized food selection
async function testRecipe(recipeId) {
  const baseUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/ingredientWidget.json`;
  const apiKey = 'd0b1b145cemsh6d5d86e9c3f2bd6p11bb95jsnec9d7eb91295';
  const host = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': host
    }
  };

  try {
    const response = await fetch(baseUrl, options);
    const result = await response.json();

    var ingredients = "";
    if (result.ingredients && result.ingredients.length > 0) {
      result.ingredients.forEach(ingredient => {
        ingredients = ingredients + (`${ingredient.name} - ${ingredient.amount.metric.value} ${ingredient.amount.metric.unit} \n`);
      });
      recipeDescriptionEl.innerHTML = ingredients.replace(/\n/g, '<br>');
    } else {
      console.log(`No ingredients found for the recipe with ID: ${recipeId}`);
    }
  } catch (error) {
    console.error(error);
  }
}


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

// // When add button is clicked, create movie tag with the input text from movieTagInput
// movieAddTag.addEventListener("click", () => {
//     if (movieTagInput.value !== "") {
//         createMovieTag(movieTagInput.value);
//     }
//     // Clear movieTagInput
//     movieTagInput.value = "";
// });

// // Same as above except with enter key pressed to add tag
// movieTagInput.addEventListener("keyup", (event) => {
//     if ((event.keyCode === 13) && (movieTagInput.value !== "")) {
//         createMovieTag(movieTagInput.value);
//         movieTagInput.value = "";
//     }
// });



// // Code for food search tags
// const munchieTagField = document.getElementById("munchie-tag-field");
// const munchieAddTag = document.getElementById("munchie-add-tag");
// const munchieTagInput = document.getElementById("munchie-tag-input");

// function createMunchieTag(message) {
//     const controlDiv = document.createElement("div");
//     controlDiv.classList.add("control");

//     const tags = document.createElement("div");
//     tags.classList.add("tags", "has-addons");

//     const tagContent = document.createElement("a");
//     tagContent.classList.add("tag", "is-link");
//     tagContent.innerText = message;

//     const tagDelete = document.createElement("a");
//     tagDelete.classList.add("tag", "is-delete");
//     tagDelete.addEventListener("click", (event) => {
//         munchieTagField.removeChild(controlDiv);
//     });

//     // finally nest all the tags together
//     tags.appendChild(tagContent);
//     tags.appendChild(tagDelete);
//     controlDiv.appendChild(tags);
//     munchieTagField.appendChild(controlDiv);

// }

// munchieAddTag.addEventListener("click", () => {
//     if (munchieTagInput.value !== "") {
//         createMunchieTag(munchieTagInput.value);
//     }
//     munchieTagInput.value = "";
// });

// munchieTagInput.addEventListener("keyup", (event) => {
//     if ((event.keyCode === 13) && (munchieTagInput.value !== "")) {
//         createMunchieTag(munchieTagInput.value);
//         munchieTagInput.value = "";
//     }
// });

function deleteMovieText() {
    var movieTextEl = document.querySelector("#movieText");
  
    movieTextEl.setAttribute('class', 'is-hidden');
}

function deleteMunchieText() {
    var munchieTextEl = document.querySelector("#munchieText");
  
    munchieTextEl.setAttribute('class', 'is-hidden');
}