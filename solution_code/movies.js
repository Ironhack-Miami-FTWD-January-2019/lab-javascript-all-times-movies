// Turn duration of the movies from hours to minutes  ---MAP---

function turnHoursToMinutes(moviesArray) {
    var moviesInMinutes = moviesArray.map(function(e){
        var hours = parseInt(e.duration[0])*60;
        if(e.duration.indexOf("min") !== -1) {
            var minutes = parseInt(e.duration.substring(e.duration.length-5,e.duration.length-3));
        } else {
            var minutes = 0;
        }
        e["duration"] = hours+minutes;
        return e;
    })
    return moviesInMinutes;
}

turnHoursToMinutes(movies);


// Get the average of all rates with 2 decimals  ---REDUCE---
function ratesAverage(moviesArray) {
    var rateSum = moviesArray.reduce(function(accumulator, movie) {
        return accumulator + parseFloat(movie.rate);
    },0);
    return (rateSum/moviesArray.length).toFixed(2);
}

console.log("The average rate is: "+(ratesAverage(movies)));


// Get the average of Drama Movies ---FILTER AND REDUCE--

function dramaMoviesRate(){
    var dramaMovies = movies.filter(function(movie){
        return movie.genre.indexOf("Drama") !== -1
    });
    return (ratesAverage(dramaMovies))
}

console.log("The average rate of 'Drama' movies is: "+dramaMoviesRate());


// Order by time duration, in growing order

function orderByDuration(moviesArray) {
    movies.sort(function(a,b){
        return a.duration - b.duration;
    });
    console.log(movies)
}

orderByDuration();

// How many movies did STEVEN SPIELBERG ---FILTER AND REDUCE---

function howManyMovies() {
    var directorMovies = movies.filter(function(e){
        return e.director == "Steven Spielberg";
    });
    return directorMovies;
}

console.log("Steven Spielberg directed "+howManyMovies().length+" movies, and the average rate of his movies is: "+ratesAverage(howManyMovies()))


// Order by title and print the first 20 titles
function orderAlphabetically(){
    movies.sort(function(a, b){
        return a.title < b.title ? -1 : 1; 
    });
    var top20Movies = [];
    for (i=0;i<20;i++){
        top20Movies.push(movies[i].title)
    }
    return top20Movies;
}

console.log(orderAlphabetically())

// Best yearly rate average ---forEach and REDUCE---

var ratesYear = {};
var moviesYear = {};
var averageYear = {};

function bestYearAvg(){
    movies.forEach(function(e) {
        if(ratesYear[e.year]) {
            moviesYear[e.year] += 1;
            ratesYear[e.year] += parseFloat(e.rate);
            averageYear[e.year] = parseFloat((ratesYear[e.year]/moviesYear[e.year]).toFixed(2));
        } else {
            ratesYear[e.year] = parseFloat(e.rate);
            moviesYear[e.year] = 1;
            averageYear[e.year] = parseFloat(e.rate);
        }
    });
    
    var year = Object.keys(averageYear).reduce(function(a, b){ 
        return averageYear[a] > averageYear[b] ? a : b;
    });
    
    console.log("The best year was "+year+" with an average rate of "+averageYear[year]);
}

bestYearAvg();