"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.radioPlayerInit=void 0;var radioPlayerInit=function e(){var a=document.querySelector(".radio-navigation"),i=document.querySelectorAll(".radio-item"),o=document.querySelector(".radio-stop"),r=new Audio;r.type="audio/aac",o.disabled=!0;function s(){r.paused?(o.classList.add("icon-play"),o.classList.remove("icon-pause")):(o.classList.add("icon-pause"),o.classList.remove("icon-play"))}function n(e){e.classList.add("active")}function t(){r.paused?(r.play(),n(c)):(r.pause(),i.forEach(function(e){return e.classList.remove("active")})),s()}var c=i[0];a.addEventListener("change",function(e){var a=e.target,t=a.closest(".radio-item");c=t,i.forEach(function(e){return e.classList.remove("active")}),n(t),o.disabled=!1,r.src=a.dataset.radioStantion,r.play(),s()}),o.addEventListener("click",t),e.stop=function(){r.paused||t()}};exports.radioPlayerInit=radioPlayerInit;