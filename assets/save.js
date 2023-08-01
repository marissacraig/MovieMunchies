var retrieveSaved = localStorage.key();


function listMovies() {
    var movieTitles = JSON.parse(localStorage.getItem('movieTitles'));
    for (var i = 0; i < movieTitles.length; i++) {
        var liEl = document.createElement('li');
        liEl.textContent = movieTitles[i];
        liEl.setAttribute('class', 'box');
        liEl;
        console.log(liEl);

        var olEl = document.getElementById('movieTitles');
        olEl.appendChild(liEl);
    }
}

function listMunchies() {
    var munchieTitles = JSON.parse(localStorage.getItem('munchieTitles'));
    for (var i = 0; i < munchieTitles.length; i++) {
        var liEl = document.createElement('li');
        liEl.textContent = munchieTitles[i];
        liEl.setAttribute('class', 'box');
        liEl;
        console.log(liEl);

        var olEl = document.getElementById('munchieTitles');
        olEl.appendChild(liEl);
    }
}

listMovies();
listMunchies();