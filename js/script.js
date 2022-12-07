import { movies } from "../modules/data.js";

let ul = document.querySelector(".promo__interactive-list");
let searchInp = document.querySelector("#search");
let poster = document.querySelector(".promo__bg");
let modal_1 = document.querySelector(".modal_1");
let modal_bg = document.querySelector(".modal_bg");
let modal_img = modal_1.querySelector("img");
let movTitle = modal_1.querySelector("h1");
let exit = document.querySelector(".exit");
let text_poster = modal_1.querySelector("p");
let year = modal_1.querySelector("#Year");
let Language = modal_1.querySelector("#Language");
let Metascore = modal_1.querySelector("#Ratings");
let imdbRating = modal_1.querySelector("#imdbRating");
let Released = modal_1.querySelector("#Released");
let Runtime = modal_1.querySelector("#Runtime");
let Genre = modal_1.querySelector("#Genre");

const ratings = document.querySelectorAll(".rating");

if (ratings.length > 0) {
  initRatings();
}

function initRatings() {
  let ratingActive, ratingValue;
  // "Бегаем" по всем рейтингам на странице
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRatings(rating);
  }

  //Инициализируем конкретный рейтинг
  function initRatings(rating) {
    iniRatingVars(rating);

    setRatingActiveWidth();

    if (rating.classList.contains("rating_set")) {
      setRating(rating);
    }
  }
  // Инициализадция переменных
  function iniRatingVars(rating) {
    ratingActive = rating.querySelector(".rating_active");
    ratingValue = rating.querySelector(".rating_value");
  }
  // Изменяем ширину активных звезд
  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const setRatingActiveWidth = index / 0.05;
    ratingActive.style.width = `${setRatingActiveWidth}%`;
  }
  //Возмножность указать оценку
  function setRating(rating) {
    const ratingItems = rating.querySelectorAll(".rating_item");
    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      ratingItem.addEventListener("mouseenter", function (e) {
        //Обновление переменных
        iniRatingVars(rating);
        //Обновление активных звезд
        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener("mouseleave", function (e) {
        //Обновление активных звезд
        setRatingActiveWidth();
      });
      ratingItem.addEventListener("click", function (e) {
        iniRatingVars(rating);

        if (rating.dataset.ajax) {
          ratingValue(ratingItem.value, rating);
        } else {
          ratingValue.innerHTML = index + 1;
          setRatingActiveWidth();
        }
      });
    }
  }
}

searchInp.oninput = () => {
  let searchkey = searchInp.value.trim().toLowerCase();

  let filtered = movies.filter((item) => {
    let title = item.Title.trim().toLowerCase();

    if (title.includes(searchkey)) {
      return item;
    }
  });

  reload(filtered, searchkey);
};

reload(movies);
function reload(arr, val = "") {
  ul.innerHTML = "";
  showPoster(arr[0]);
  let re = new RegExp(val, "g");

  for (let item of arr) {
    let title = item.Title.toLowerCase().replace(re, `<b>${val}</b>`);

    let li = document.createElement("li");
    let del = document.createElement("div");

    li.classList.add("promo__interactive-item");
    del.classList.add("delete");

    li.innerHTML = title;

    li.append(del);
    ul.append(li);

    li.onclick = () => {
      modal_1.style.display = "block";
      modal_bg.style.display = "block";
      modal_img.src = item.Poster;
      movTitle.innerHTML = item.Title;
      text_poster.innerHTML = item.Plot;
      year.innerHTML = `Year: ${item.Year}`;
      Language.innerHTML = `Language: ${item.Language}`;
      Country.innerHTML = `Country: ${item.Country}`;
      Metascore.innerHTML = `Ratings: ${item.Metascore}`;
      imdbRating.innerHTML = `imdbRating: ${item.imdbRating}`;
      Released.innerHTML = `Released: ${item.Released}`;
      Runtime.innerHTML = `Runtime: ${item.Runtime}`;
      Genre.innerHTML = `Genre: ${item.Genre}`;
    };
    exit.onclick = () => {
      modal_1.style.display = "none";
      modal_bg.style.display = "none";
    };
  }
}

function showPoster(data) {
  poster.style.backgroundImage = `url(${data.Poster})`;
}
// let names = document.querySelectorAll('.promo__interactive-item')
