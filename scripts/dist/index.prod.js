"use strict";var _radioPlayer=require("./radioPlayer.js"),_audioPlayer=require("./audioPlayer.js"),_videoPlayer=require("./videoPlayer.js"),playerBtn=document.querySelectorAll(".player-btn"),playerBlock=document.querySelectorAll(".player-block"),welcomeTitle=document.querySelector(".welcome-title"),deactivationBtn=function(){playerBtn.forEach(function(e){return e.classList.remove("active")}),playerBlock.forEach(function(e){return e.classList.remove("active")}),_audioPlayer.audioPlayerInit.stop(),_videoPlayer.videoPlayerInit.stop(),_radioPlayer.radioPlayerInit.stop()};playerBtn.forEach(function(e,a){e.addEventListener("click",function(){welcomeTitle.style.display="none",deactivationBtn(),e.classList.add("active"),playerBlock[a].classList.add("active")})}),(0,_videoPlayer.videoPlayerInit)(),(0,_radioPlayer.radioPlayerInit)(),(0,_audioPlayer.audioPlayerInit)();