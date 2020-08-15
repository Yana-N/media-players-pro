"use strict";

var _radioPlayer = require("./radioPlayer.js");

var _audioPlayer = require("./audioPlayer.js");

var _videoPlayer = require("./videoPlayer.js");

var playerBtn = document.querySelectorAll('.player-btn');
var playerBlock = document.querySelectorAll('.player-block');
var welcomeTitle = document.querySelector('.welcome-title');

var deactivationBtn = function deactivationBtn() {
  playerBtn.forEach(function (item) {
    return item.classList.remove('active');
  });
  playerBlock.forEach(function (item) {
    return item.classList.remove('active');
  });

  _audioPlayer.audioPlayerInit.stop();

  _videoPlayer.videoPlayerInit.stop();

  _radioPlayer.radioPlayerInit.stop();
};

playerBtn.forEach(function (btn, i) {
  btn.addEventListener('click', function () {
    welcomeTitle.style.display = 'none';
    deactivationBtn();
    btn.classList.add('active');
    playerBlock[i].classList.add('active');
  });
});
(0, _videoPlayer.videoPlayerInit)();
(0, _radioPlayer.radioPlayerInit)();
(0, _audioPlayer.audioPlayerInit)();