import {addZero} from './supScript.js'

export const audioPlayerInit = () => {

  const audio = document.querySelector('.audio')
  const audioImg = document.querySelector('.audio-img')
  const audioHeader = document.querySelector('.audio-header')
  const audioPlayer = document.querySelector('.audio-player')
  const audioNavigation = document.querySelector('.audio-navigation')
  const audioButtonPlay = document.querySelector('.audio-button__play')
  const audioProgress = document.querySelector('.audio-progress')
  const audioProgressTiming = document.querySelector('.audio-progress__timing')
  const audioTimePassed = document.querySelector('.audio-time__passed')
  const audioTimeTotal = document.querySelector('.audio-time__total')

  const playList = ['hello', 'flow', 'speed']

  let trackIndex = 0

  const loadTrack = () => {
    const isPlayed = audioPlayer.paused
    const track = playList[trackIndex]

    audioPlayer.src = `./audio/${track}.mp3`
    audioImg.src = `./audio/${track}.jpg`
    audioHeader.textContent = track.toUpperCase()

    if (isPlayed) {
      audioPlayer.pause()
    } else {
      audioPlayer.play()
    }
  }

  const nextTrack = () => {
    if (trackIndex === playList.length - 1) {
      trackIndex = 0
    } else {
      trackIndex ++
    }
    loadTrack()
  }
  const prevTrack = () => {
    if (trackIndex !== 0) {
      trackIndex--
    } else {
      trackIndex = playList.length - 1
    }
    loadTrack()
  }

  audioNavigation.addEventListener('click', e => {
    const target = e.target
    if (target.classList.contains('audio-button__play')) {
      audioButtonPlay.classList.toggle('icon-play')
      audioButtonPlay.classList.toggle('icon-pause')

      if (audioPlayer.paused) {
        audioPlayer.play()
      } else {
        audioPlayer.pause()
      }

      const track = playList[trackIndex]
      audioHeader.textContent = track.toUpperCase()
    }

      if (target.classList.contains('audio-button__prev')) {
        prevTrack()
      }

      if (target.classList.contains('audio-button__next')) {
        nextTrack()
      }


    })

    audioPlayer.addEventListener('ended', () => {
      nextTrack()
      audioPlayer.play()
    })

    audioPlayer.addEventListener('timeupdate', () => {
      const duration = audioPlayer.duration
      const currentTime = audioPlayer.currentTime
      const progress = (currentTime / duration * 100).toFixed(2)

      const minutesPassed = Math.floor(currentTime / 60) || '0'
      const secondesPassed = Math.floor(currentTime % 60) || '0'

      const minutesTotal = Math.floor(duration / 60) || '0'
      const secondesTotal = Math.floor(duration % 60) || '0'

      audioProgressTiming.style.width = `${progress}%`

      audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondesPassed)}`
      audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondesTotal)}`
    })

    audioProgress.addEventListener('click', e => {
      const x = e.offsetX
      const allWidth = audioProgress.clientWidth
      const progress = (x / allWidth) * audioPlayer.duration
      audioPlayer.currentTime = progress
    })

    audioPlayerInit.stop = () => {
      if (!audioPlayer.paused) {
        audioPlayer.pause()
        audioButtonPlay.classList.remove('icon-pause')
        audioButtonPlay.classList.add('icon-play')      
      }
    }
}