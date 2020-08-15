import {addZero} from './supScript.js'

export const videoPlayerInit = () => {

  const videoPlayer = document.querySelector('.video-player')
  const videoButtonPlay = document.querySelector('.video-button__play')
  const videoButtonStop = document.querySelector('.video-button__stop')
  const videoButtonEnlarge = document.querySelector('.video-button__enlarge')
  const videoButtonVolume = document.querySelector('.video-button__volume')
  const videoVolume = document.querySelector('.video-volume')
  const videoTimePassed = document.querySelector('.video-time__passed')
  const videoProgress = document.querySelector('.video-progress')
  const videoTimeTotal = document.querySelector('.video-time__total')

  let prevVolume = 1

  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.add('icon-play')
      videoButtonPlay.classList.remove('icon-pause')
    } else {
      videoButtonPlay.classList.add('icon-pause')
      videoButtonPlay.classList.remove('icon-play')
    }
  }

  const togglePlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play()
    } else {
      videoPlayer.pause()
    }
    toggleIcon()
  }

  const stopPlay = () => {
    videoPlayer.pause()
    videoPlayer.currentTime = 0
    toggleIcon()
  }

  const enlargeScreen = () => {
    if (videoPlayer.requestFullscreen) {
      videoPlayer.requestFullscreen();
    } else if (videoPlayer.mozRequestFullScreen) { /* Firefox */
      videoPlayer.mozRequestFullScreen();
    } else if (videoPlayer.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      videoPlayer.webkitRequestFullscreen();
    } else if (videoPlayer.msRequestFullscreen) { /* IE/Edge */
      videoPlayer.msRequestFullscreen();
    }
  }

  const toggleVolume = () => {
    if (videoPlayer.volume === 0) {
      videoButtonVolume.classList.add('icon-volume-mute')
      videoButtonVolume.classList.remove('icon-volume-medium')
    } else if (videoPlayer.volume > 0) {
      videoButtonVolume.classList.add('icon-volume-medium')
      videoButtonVolume.classList.remove('icon-volume-mute')
    }
  }

  

  videoPlayer.addEventListener('click', togglePlay)
  videoButtonPlay.addEventListener('click', togglePlay)
  videoButtonStop.addEventListener('click', stopPlay)
  videoButtonEnlarge.addEventListener('click', enlargeScreen)
  videoPlayer.addEventListener('dblclick', enlargeScreen)

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime
    const duration = videoPlayer.duration

    videoProgress.value = (currentTime / duration) * 100

    let minutesPassed = Math.floor(currentTime / 60)
    let secondsPassed = Math.floor(currentTime % 60)

    let minutesTotal = Math.floor(duration / 60)
    let secondsTotal = Math.floor(duration % 60)

    videoTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`
    videoTimeTotal.textContent =  `${addZero(minutesTotal)}:${addZero(secondsTotal)}`
  })

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration
    const value = videoProgress.value
    videoPlayer.currentTime = (value * duration) / 100
  })

  videoButtonVolume.addEventListener('click', () => {
    if (videoPlayer.volume) {
      prevVolume = videoPlayer.volume
      videoPlayer.volume = 0
      toggleVolume()
    } else {
      videoPlayer.volume = prevVolume
      toggleVolume()
    }
  })

  videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100
    toggleVolume()
  })

  videoPlayer.volume = 0.5
  videoVolume.value = videoPlayer.volume * 100

  videoPlayer.addEventListener('ended', () => {
    toggleIcon()
    videoPlayer.currentTime = 0
  })

  videoPlayerInit.stop = () => {
    if (!videoPlayer.paused) {
      togglePlay()
    }
  }
}