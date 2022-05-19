'use strict';

const adviceIdPlaceholder = document.querySelector('.advice-card__id-value');
const advicePlaceholder = document.querySelector(".advice-card__advice-text");
const adviceIdContainer = document.querySelector('.advice-card__id')
const dice = document.querySelector('.advice-card__dice');
const preloader = document.querySelector('.preloader');

const generateAdvice = function () {
  preloader.classList.remove('hidden');
  adviceIdContainer.classList.add('hidden');
  advicePlaceholder.classList.add('hidden');
  
  const request = new XMLHttpRequest();
  request.open("GET", "https://api.adviceslip.com/advice");
  request.send();

  request.addEventListener('load', function() {
    let {slip: advice} = JSON.parse(request.responseText);

    preloader.classList.add('hidden');
    adviceIdContainer.classList.remove('hidden');
    advicePlaceholder.classList.remove('hidden');
    adviceIdPlaceholder.textContent = advice.id;
    advicePlaceholder.textContent = `"${advice.advice}"`
  });
}
window.addEventListener('load', generateAdvice);
dice.addEventListener('click', generateAdvice);