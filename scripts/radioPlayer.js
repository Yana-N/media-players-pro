export const radioPlayerInit = () => {
  const radioNavigation = document.querySelector('.radio-navigation')
  const radioItems = document.querySelectorAll('.radio-item')
  const radioStop = document.querySelector('.radio-stop')

  const audio = new Audio()
  audio.type = 'audio/aac'

  radioStop.disabled = true

  let currentRadio = radioItems[0]

  const togglePlayIcon = () => {
    if (audio.paused) {
      radioStop.classList.add('icon-play')
      radioStop.classList.remove('icon-pause')
    } else {
      radioStop.classList.add('icon-pause')
      radioStop.classList.remove('icon-play')
    }
  }

  const removeActiveItem = (item) => {
    radioItems.forEach(item => item.classList.remove('active'))
  }

  const addActiveItem = (item) => {
    item.classList.add('active')
  }

  const radioTogglePause = () => {
      if (audio.paused) {
        audio.play()
        addActiveItem(currentRadio)
      } else {
        audio.pause()
        radioItems.forEach(item => item.classList.remove('active'))
      }
      togglePlayIcon()
  }

  radioNavigation.addEventListener('change', event => {
    const target = event.target
    const parent = target.closest('.radio-item')
    currentRadio = parent

    removeActiveItem(parent)
    addActiveItem(parent)
    
    radioStop.disabled = false
    audio.src = target.dataset.radioStantion

    audio.play()
    togglePlayIcon()
  })

  radioStop.addEventListener('click', () => radioTogglePause())

  radioPlayerInit.stop = () => {
    if (!audio.paused) {
      radioTogglePause()
    }
  }
}