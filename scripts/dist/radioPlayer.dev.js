"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.radioPlayerInit = void 0;

var radioPlayerInit = function radioPlayerInit() {
  var radioNavigation = document.querySelector('.radio-navigation');
  var radioItems = document.querySelectorAll('.radio-item');
  var radioStop = document.querySelector('.radio-stop');
  var audio = new Audio();
  audio.type = 'audio/aac';
  radioStop.disabled = true;
  var currentRadio = radioItems[0];

  var togglePlayIcon = function togglePlayIcon() {
    if (audio.paused) {
      radioStop.classList.add('icon-play');
      radioStop.classList.remove('icon-pause');
    } else {
      radioStop.classList.add('icon-pause');
      radioStop.classList.remove('icon-play');
    }
  };

  var removeActiveItem = function removeActiveItem(item) {
    radioItems.forEach(function (item) {
      return item.classList.remove('active');
    });
  };

  var addActiveItem = function addActiveItem(item) {
    item.classList.add('active');
  };

  var radioTogglePause = function radioTogglePause() {
    if (audio.paused) {
      audio.play();
      addActiveItem(currentRadio);
    } else {
      audio.pause();
      radioItems.forEach(function (item) {
        return item.classList.remove('active');
      });
    }

    togglePlayIcon();
  };

  radioNavigation.addEventListener('change', function (event) {
    var target = event.target;
    var parent = target.closest('.radio-item');
    currentRadio = parent;
    removeActiveItem(parent);
    addActiveItem(parent);
    radioStop.disabled = false;
    audio.src = target.dataset.radioStantion;
    audio.play();
    togglePlayIcon();
  });
  radioStop.addEventListener('click', function () {
    return radioTogglePause();
  });

  radioPlayerInit.stop = function () {
    if (!audio.paused) {
      radioTogglePause();
    }
  };
};

exports.radioPlayerInit = radioPlayerInit;