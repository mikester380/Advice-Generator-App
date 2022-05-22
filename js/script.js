'use strict';

const adviceIdPlaceholder = document.querySelector('.advice-card__id-value');
const advicePlaceholder = document.querySelector(".advice-card__advice-text");
const adviceIdContainer = document.querySelector('.advice-card__id')
const dice = document.querySelector('.advice-card__dice');
const preloader = document.querySelector('.preloader');

const loading = function(status) {
  preloader.classList[`${status ? 'remove' : 'add'}`]('hidden');
  adviceIdContainer.classList[`${status ? 'add' : 'remove'}`]('hidden');
  advicePlaceholder.classList[`${status ? 'add' : 'remove'}`]('hidden');
}

const generateAdvice = function() {
  loading(true);
  const request = new XMLHttpRequest();
  request.open("GET", "https://api.adviceslip.com/advice")
  request.send();
  
  request.addEventListener('load', function() {
    let {slip: advice} = JSON.parse(request.responseText);
    loading(false);
    adviceIdPlaceholder.textContent = advice.id;
    advicePlaceholder.textContent = `"${advice.advice}"`
  });
}

window.addEventListener('load', generateAdvice);
dice.addEventListener('click', generateAdvice);