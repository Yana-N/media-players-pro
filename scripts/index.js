import {radioPlayerInit} from './radioPlayer.js'
import {audioPlayerInit} from './audioPlayer.js'
import {videoPlayerInit} from './videoPlayer.js'

const playerBtn = document.querySelectorAll('.player-btn')
const playerBlock = document.querySelectorAll('.player-block')
const welcomeTitle = document.querySelector('.welcome-title')

const deactivationBtn = () => {
  playerBtn.forEach(item => item.classList.remove('active'))
  playerBlock.forEach(item => item.classList.remove('active'))

  audioPlayerInit.stop()
  videoPlayerInit.stop()
  radioPlayerInit.stop()
}

playerBtn.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    welcomeTitle.style.display = 'none'
    deactivationBtn()
    btn.classList.add('active')
    playerBlock[i].classList.add('active')
  })
})

videoPlayerInit()
radioPlayerInit()
audioPlayerInit()