"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoPlayerInit = void 0;

var _supScript = require("./supScript.js");

var videoPlayerInit = function videoPlayerInit() {
  var videoPlayer = document.querySelector('.video-player');
  var videoButtonPlay = document.querySelector('.video-button__play');
  var videoButtonStop = document.querySelector('.video-button__stop');
  var videoButtonEnlarge = document.querySelector('.video-button__enlarge');
  var videoButtonVolume = document.querySelector('.video-button__volume');
  var videoVolume = document.querySelector('.video-volume');
  var videoTimePassed = document.querySelector('.video-time__passed');
  var videoProgress = document.querySelector('.video-progress');
  var videoTimeTotal = document.querySelector('.video-time__total');
  var prevVolume = 1;

  var toggleIcon = function toggleIcon() {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.add('icon-play');
      videoButtonPlay.classList.remove('icon-pause');
    } else {
      videoButtonPlay.classList.add('icon-pause');
      videoButtonPlay.classList.remove('icon-play');
    }
  };

  var togglePlay = function togglePlay() {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }

    toggleIcon();
  };

  var stopPlay = function stopPlay() {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    toggleIcon();
  };

  var enlargeScreen = function enlargeScreen() {
    if (videoPlayer.requestFullscreen) {
      videoPlayer.requestFullscreen();
    } else if (videoPlayer.mozRequestFullScreen) {
      /* Firefox */
      videoPlayer.mozRequestFullScreen();
    } else if (videoPlayer.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      videoPlayer.webkitRequestFullscreen();
    } else if (videoPlayer.msRequestFullscreen) {
      /* IE/Edge */
      videoPlayer.msRequestFullscreen();
    }
  };

  var toggleVolume = function toggleVolume() {
    if (videoPlayer.volume === 0) {
      videoButtonVolume.classList.add('icon-volume-mute');
      videoButtonVolume.classList.remove('icon-volume-medium');
    } else if (videoPlayer.volume > 0) {
      videoButtonVolume.classList.add('icon-volume-medium');
      videoButtonVolume.classList.remove('icon-volume-mute');
    }
  };

  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);
  videoButtonStop.addEventListener('click', stopPlay);
  videoButtonEnlarge.addEventListener('click', enlargeScreen);
  videoPlayer.addEventListener('dblclick', enlargeScreen);
  videoPlayer.addEventListener('timeupdate', function () {
    var currentTime = videoPlayer.currentTime;
    var duration = videoPlayer.duration;
    videoProgress.value = currentTime / duration * 100;
    var minutesPassed = Math.floor(currentTime / 60);
    var secondsPassed = Math.floor(currentTime % 60);
    var minutesTotal = Math.floor(duration / 60);
    var secondsTotal = Math.floor(duration % 60);
    videoTimePassed.textContent = "".concat((0, _supScript.addZero)(minutesPassed), ":").concat((0, _supScript.addZero)(secondsPassed));
    videoTimeTotal.textContent = "".concat((0, _supScript.addZero)(minutesTotal), ":").concat((0, _supScript.addZero)(secondsTotal));
  });
  videoProgress.addEventListener('input', function () {
    var duration = videoPlayer.duration;
    var value = videoProgress.value;
    videoPlayer.currentTime = value * duration / 100;
  });
  videoButtonVolume.addEventListener('click', function () {
    if (videoPlayer.volume) {
      prevVolume = videoPlayer.volume;
      videoPlayer.volume = 0;
      toggleVolume();
    } else {
      videoPlayer.volume = prevVolume;
      toggleVolume();
    }
  });
  videoVolume.addEventListener('input', function () {
    videoPlayer.volume = videoVolume.value / 100;
    toggleVolume();
  });
  videoPlayer.volume = 0.5;
  videoVolume.value = videoPlayer.volume * 100;
  videoPlayer.addEventListener('ended', function () {
    toggleIcon();
    videoPlayer.currentTime = 0;
  });

  videoPlayerInit.stop = function () {
    if (!videoPlayer.paused) {
      togglePlay();
    }
  };
};

exports.videoPlayerInit = videoPlayerInit;