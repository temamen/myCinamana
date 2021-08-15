var API_URL='';
function Active(){
        var nav = document.getElementById('sidebarMenu'),
            anchor = nav.getElementsByTagName('a'),
            current = window.location.pathname.split('/')[1];
            for (var i = 0; i < anchor.length; i++) {
            if(anchor[i].href == current) {
                anchor[i].className = "active";
            }
        }
    
}
function Another(){
    var header = document.getElementById("sidebarMenu");
var btns = header.getElementsByClassName("list-group-item");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}
}
function displayMovies(typeMovie){
    switch(typeMovie) { 
        case "RELEASES":
            API_URL='https://api.themoviedb.org/3/discover/movie?with_genres=18&primary_release_year=2014&api_key=100f170ca1c91c1b6ffc9a21393bd2e9';
        case "POPULAR":
            API_URL='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=100f170ca1c91c1b6ffc9a21393bd2e9';
            Active();
          break;
        case "COMEDY":
            API_URL='https://api.themoviedb.org/3/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=100f170ca1c91c1b6ffc9a21393bd2e9';
          break;
        default:
          // code block
          
          
      }
      getMovies(API_URL);
}


var API_KEY='api_key=100f170ca1c91c1b6ffc9a21393bd2e9';
var BASE_URL='https://api.themoviedb.org/3';
var COMIDY_URL='/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&';
// var API_URL='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=100f170ca1c91c1b6ffc9a21393bd2e9';
// var API_URL='https://api.themoviedb.org/3/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=100f170ca1c91c1b6ffc9a21393bd2e9';
//BASE_URL +'/discover/movie?sort_by=popularity.desc&' + API_KEY;

var IMG_URL="https://image.tmdb.org/t/p/w500";
var searchURL=BASE_URL + '/search/movie?'+ API_KEY; 

// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=100f170ca1c91c1b6ffc9a21393bd2e9
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=100f170ca1c91c1b6ffc9a21393bd2e9

const main=document.getElementById("main");
const form=document.getElementById("form");
const search=document.getElementById("search");

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data);
        showAnotherMovies(data.results);
    })
}

function showAnotherMovies(movies){
    main.innerHTML="";
    movies.forEach(movie => {
        const {poster_path,title, vote_average, overview}=movie;
        const movieEl=document.createElement("div");
        movieEl.className='col-sm-4 col-md-2 mt-4';
        movieEl.classList.add("movie");
        movieEl.innerHTML=`
  
        <div class="content">
            <a href="#">
            
                <div class="content-overlay"></div> <img class="content-image" src="${IMG_URL + poster_path}" alt="${title}"/>
                    <div class="card-img-overlay">
                    <span id="spanVote"class="${getClassByRate(vote_average)}"><i class="fa fa-star" aria-hidden="true"></i> "${vote_average}"</span>
                    </div>
                    <div class="content-details fadeIn-bottom">
                        
                        <p class="content-text"><i class="fa fa-play-circle-o" aria-hidden="true"></i></i> </p>
                    </div>
                </div>
            </a> 
        </div>  
        <p class="titleVideo">"${title}"</p>
    </div>
        
        `
        main.appendChild(movieEl);
    });
}


function showMovies(movies){
    main.innerHTML="";
    movies.forEach(movie => {
        const {poster_path,title, vote_average, overview}=movie;
        const movieEl=document.createElement("div");
        movieEl.className='col-sm-4 col-md-2';
        movieEl.classList.add("movie");
        movieEl.innerHTML=`
  
            <div class="profile-card">
                <div class="profile-img">
                    <img src="${IMG_URL + poster_path}" alt="${title}"/>
                </div>
                <div class="movie.info">
                    <h6>"${title}"<h6>
                    <span class="${getClassByRate(vote_average)}"> "${vote_average}"</span>
                </div>
                // 
            </div>
       
                
                `

                // <div class="overview">
                // //     <h3>Overview:</h3>
                // //     "${overview}"
                // // </div>
        main.appendChild(movieEl);
    });
}
// getMovies(API_URL);
function getClassByRate(vote){
    if(vote >= 8){
        return "green";
    } else if (vote >= 5){
        return "orange";
    }else{
        return "red";
    }
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm=search.value;
    if (searchTerm){
        getMovies(searchURL + '&query=' + searchTerm);
    }else {
        getMovies(API_URL);
    }
});
// /////////////////////////Logo////////////////////////
const signs = document.getElementsByClassName('logoText')
const randomIn = (min, max) => (
  Math.floor(Math.random() * (max - min + 1) + min)
)

const mixupInterval = el => {
  const ms = randomIn(2000, 4000)
  el.style.setProperty('--interval', `${ms}ms`)
}

signs.forEach(el => {
  mixupInterval(el)
  el.addEventListener('webkitAnimationIteration', () => {
    mixupInterval(el)
  })
})