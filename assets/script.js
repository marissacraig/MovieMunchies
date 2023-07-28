// 1 = Biography 
// 2 = Film Noir
// 4 = Musical
// 5 = sport
// 6 = short
// 12 = adventure
// 14 = fantasy
// 16 = animation
// 18 = drama
// 28 = action
// 35 = comedy
// 36 = History
// 53 = thriller
// 80 = crime
// 99 = documentary
// 9648 = mystery
// 10751 = family
// 10752 = war






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
            'X-RapidAPI-Key': '74a73f418emsh8c325d7f91bb73bp128dcajsn3884fc5f12c2', // Replace with your actual RapidAPI key
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

            return {
                movieTitle: randomMovie.title,
                availableOn: availableOn
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

async function genreSearch() {
    try {
        const genreId = 18; // Replaced with desired genre
        const streamingServices = ['netflix', 'prime.buy', 'hulu.addon.hbo', 'peacock.free']; // Replace with desired streaming services

        const movie = await searchMoviesByGenreAndService(genreId, streamingServices);

        if (movie) {
            console.log(`Movie Title: ${movie.movieTitle}`);
            console.log(movie);
        } else {
            console.log('No movies found for the given genre and streaming services.');
        }
    } catch (error) {
        console.error(error);
    }
}

genreSearch();

'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=pasta&cuisine=italian&excludeCuisine=greek&diet=vegetarian&intolerances=gluten&equipment=pan&includeIngredients=tomato%2Ccheese&excludeIngredients=eggs&type=main%20course&instructionsRequired=true&fillIngredients=false&addRecipeInformation=false&titleMatch=Crock%20Pot&maxReadyTime=20&ignorePantry=true&sort=calories&sortDirection=asc&minCarbs=10&maxCarbs=100&minProtein=10&maxProtein=100&minCalories=50&maxCalories=800&minFat=10&maxFat=100&minAlcohol=0&maxAlcohol=100&minCaffeine=0&maxCaffeine=100&minCopper=0&maxCopper=100&minCalcium=0&maxCalcium=100&minCholine=0&maxCholine=100&minCholesterol=0&maxCholesterol=100&minFluoride=0&maxFluoride=100&minSaturatedFat=0&maxSaturatedFat=100&minVitaminA=0&maxVitaminA=100&minVitaminC=0&maxVitaminC=100&minVitaminD=0&maxVitaminD=100&minVitaminE=0&maxVitaminE=100&minVitaminK=0&maxVitaminK=100&minVitaminB1=0&maxVitaminB1=100&minVitaminB2=0&maxVitaminB2=100&minVitaminB5=0&maxVitaminB5=100&minVitaminB3=0&maxVitaminB3=100&minVitaminB6=0&maxVitaminB6=100&minVitaminB12=0&maxVitaminB12=100&minFiber=0&maxFiber=100&minFolate=0&maxFolate=100&minFolicAcid=0&maxFolicAcid=100&minIodine=0&maxIodine=100&minIron=0&maxIron=100&minMagnesium=0&maxMagnesium=100&minManganese=0&maxManganese=100&minPhosphorus=0&maxPhosphorus=100&minPotassium=0&maxPotassium=100&minSelenium=0&maxSelenium=100&minSodium=0&maxSodium=100&minSugar=0&maxSugar=100&minZinc=0&maxZinc=100&offset=0&number=10&limitLicense=false&ranking=2';

async function searchFood() {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=pasta&cuisine=italian&excludeCuisine=greek&diet=vegetarian&intolerances=gluten&equipment=pan&includeIngredients=tomato%2Ccheese&excludeIngredients=eggs&type=main%20course&instructionsRequired=true&fillIngredients=false&addRecipeInformation=false&titleMatch=Crock%20Pot&maxReadyTime=20&ignorePantry=true&sort=calories&sortDirection=asc&minCarbs=10&maxCarbs=100&minProtein=10&maxProtein=100&minCalories=50&maxCalories=800&minFat=10&maxFat=100&minAlcohol=0&maxAlcohol=100&minCaffeine=0&maxCaffeine=100&minCopper=0&maxCopper=100&minCalcium=0&maxCalcium=100&minCholine=0&maxCholine=100&minCholesterol=0&maxCholesterol=100&minFluoride=0&maxFluoride=100&minSaturatedFat=0&maxSaturatedFat=100&minVitaminA=0&maxVitaminA=100&minVitaminC=0&maxVitaminC=100&minVitaminD=0&maxVitaminD=100&minVitaminE=0&maxVitaminE=100&minVitaminK=0&maxVitaminK=100&minVitaminB1=0&maxVitaminB1=100&minVitaminB2=0&maxVitaminB2=100&minVitaminB5=0&maxVitaminB5=100&minVitaminB3=0&maxVitaminB3=100&minVitaminB6=0&maxVitaminB6=100&minVitaminB12=0&maxVitaminB12=100&minFiber=0&maxFiber=100&minFolate=0&maxFolate=100&minFolicAcid=0&maxFolicAcid=100&minIodine=0&maxIodine=100&minIron=0&maxIron=100&minMagnesium=0&maxMagnesium=100&minManganese=0&maxManganese=100&minPhosphorus=0&maxPhosphorus=100&minPotassium=0&maxPotassium=100&minSelenium=0&maxSelenium=100&minSodium=0&maxSodium=100&minSugar=0&maxSugar=100&minZinc=0&maxZinc=100&offset=0&number=10&limitLicense=false&ranking=2';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd0b1b145cemsh6d5d86e9c3f2bd6p11bb95jsnec9d7eb91295',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}


// Function to search for a random recipe from a specified cuisine type
async function searchRandomRecipeByCuisine(cuisineType) {
    const baseUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch';
    const apiKey = 'd0b1b145cemsh6d5d86e9c3f2bd6p11bb95jsnec9d7eb91295'; // Replace with your actual RapidAPI key

    const params = new URLSearchParams({
        cuisine: cuisineType,
        number: 1, // Number of recipes to retrieve (1 to get a random recipe)
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
            const randomRecipe = result.results[0];
            return {
                recipeName: randomRecipe.title,
                cuisineType: cuisineType
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

// List of cuisine types you can search for
const cuisineTypes = [
    'African',
    'American',
    'British',
    'Cajun',
    'Caribbean',
    'Chinese',
    'Eastern European',
    'European',
    'French',
    'German',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Japanese',
    'Jewish',
    'Korean',
    'Latin American',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese',
];

async function foodCall() {
    const randomCuisineType = 'Italian'; // Change this to the desired cuisine type
    const recipe = await searchRandomRecipeByCuisine(randomCuisineType);
    if (recipe) {
        console.log(`Random Recipe: ${recipe.recipeName}`);
        console.log(`Cuisine Type: ${recipe.cuisineType}`);
    }
}
foodCall();



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