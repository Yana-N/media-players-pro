"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.audioPlayerInit = void 0;

var _supScript = require("./supScript.js");

var audioPlayerInit = function audioPlayerInit() {
  var audio = document.querySelector('.audio');
  var audioImg = document.querySelector('.audio-img');
  var audioHeader = document.querySelector('.audio-header');
  var audioPlayer = document.querySelector('.audio-player');
  var audioNavigation = document.querySelector('.audio-navigation');
  var audioButtonPlay = document.querySelector('.audio-button__play');
  var audioProgress = document.querySelector('.audio-progress');
  var audioProgressTiming = document.querySelector('.audio-progress__timing');
  var audioTimePassed = document.querySelector('.audio-time__passed');
  var audioTimeTotal = document.querySelector('.audio-time__total');
  var playList = ['hello', 'flow', 'speed'];
  var trackIndex = 0;

  var loadTrack = function loadTrack() {
    var isPlayed = audioPlayer.paused;
    var track = playList[trackIndex];
    audioPlayer.src = "./audio/".concat(track, ".mp3");
    audioImg.src = "./audio/".concat(track, ".jpg");
    audioHeader.textContent = track.toUpperCase();

    if (isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  var nextTrack = function nextTrack() {
    if (trackIndex === playList.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }

    loadTrack();
  };

  var prevTrack = function prevTrack() {
    if (trackIndex !== 0) {
      trackIndex--;
    } else {
      trackIndex = playList.length - 1;
    }

    loadTrack();
  };

  audioNavigation.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('audio-button__play')) {
      audioButtonPlay.classList.toggle('icon-play');
      audioButtonPlay.classList.toggle('icon-pause');

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }

      var track = playList[trackIndex];
      audioHeader.textContent = track.toUpperCase();
    }

    if (target.classList.contains('audio-button__prev')) {
      prevTrack();
    }

    if (target.classList.contains('audio-button__next')) {
      nextTrack();
    }
  });
  audioPlayer.addEventListener('ended', function () {
    nextTrack();
    audioPlayer.play();
  });
  audioPlayer.addEventListener('timeupdate', function () {
    var duration = audioPlayer.duration;
    var currentTime = audioPlayer.currentTime;
    var progress = (currentTime / duration * 100).toFixed(2);
    var minutesPassed = Math.floor(currentTime / 60) || '0';
    var secondesPassed = Math.floor(currentTime % 60) || '0';
    var minutesTotal = Math.floor(duration / 60) || '0';
    var secondesTotal = Math.floor(duration % 60) || '0';
    audioProgressTiming.style.width = "".concat(progress, "%");
    audioTimePassed.textContent = "".concat((0, _supScript.addZero)(minutesPassed), ":").concat((0, _supScript.addZero)(secondesPassed));
    audioTimeTotal.textContent = "".concat((0, _supScript.addZero)(minutesTotal), ":").concat((0, _supScript.addZero)(secondesTotal));
  });
  audioProgress.addEventListener('click', function (e) {
    var x = e.offsetX;
    var allWidth = audioProgress.clientWidth;
    var progress = x / allWidth * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  });

  audioPlayerInit.stop = function () {
    if (!audioPlayer.paused) {
      audioPlayer.pause();
      audioButtonPlay.classList.remove('icon-pause');
      audioButtonPlay.classList.add('icon-play');
    }
  };
};

exports.audioPlayerInit = audioPlayerInit;