export default class NanoPlayer {
  constructor(selector, options = {}) {
    this.container = document.querySelector(selector)
    if (!this.container) {
      throw new Error('NanoPlayer: container not found')
    }

    this.options = {
      src: '',
      poster: null,
      autoplay: false,
      volume: 1,
      playbackRates: [0.5, 1, 1.5, 2],
      ...options
    }

    this.init()
  }

  /* ================= INIT ================= */

  init() {
    this.wrapper = document.createElement('div')
    this.wrapper.className = 'nano-player'
    this.wrapper.tabIndex = 0

    this.video = document.createElement('video')
    this.video.src = this.options.src
    this.video.autoplay = this.options.autoplay
    this.video.volume = this.options.volume
    this.video.preload = 'metadata'
    this.video.controls = false

    if (this.options.poster) {
      this.video.poster = this.options.poster
    }

    this.wrapper.appendChild(this.video)
    this.container.appendChild(this.wrapper)

    this.createOverlay()
    this.createControls()
    this.bindEvents()
  }

  /* ================= OVERLAY ================= */

  createOverlay() {
    this.overlay = document.createElement('div')
    this.overlay.className = 'nano-overlay'

    this.bigPlay = document.createElement('button')
    this.bigPlay.className = 'nano-big-play'
    this.bigPlay.textContent = '▶'

    this.infoOverlay = document.createElement('div')
    this.infoOverlay.className = 'nano-info-overlay'
    this.infoOverlay.textContent = ''

    this.overlay.append(this.bigPlay, this.infoOverlay)
    this.wrapper.appendChild(this.overlay)

    this.bigPlay.onclick = () => this.video.play()
  }

  /* ================= CONTROLS ================= */

  createControls() {
    this.controls = document.createElement('div')
    this.controls.className = 'nano-controls'

    /* LEFT */
    this.left = document.createElement('div')
    this.left.className = 'nano-left'

    this.playBtn = document.createElement('button')
    this.playBtn.className = 'nano-icon'
    this.playBtn.textContent = '▶'
    this.left.appendChild(this.playBtn)

    /* CENTER */
    this.center = document.createElement('div')
    this.center.className = 'nano-center'

    this.progress = document.createElement('div')
    this.progress.className = 'nano-progress'
    this.progressFill = document.createElement('div')
    this.progressFill.className = 'nano-progress-fill'
    this.progress.appendChild(this.progressFill)
    this.center.appendChild(this.progress)

    /* RIGHT */
    this.right = document.createElement('div')
    this.right.className = 'nano-right'

    /* Volume menu */
    this.volumeMenu = this.createMenu('🔊')
    this.volumeSlider = document.createElement('input')
    this.volumeSlider.type = 'range'
    this.volumeSlider.min = 0
    this.volumeSlider.max = 1
    this.volumeSlider.step = 0.01
    this.volumeSlider.value = this.video.volume
    this.volumeMenu.menu.appendChild(this.volumeSlider)

    /* Settings menu (speed) */
    this.settingsMenu = this.createMenu('⚙️')
    this.options.playbackRates.forEach(rate => {
      const btn = document.createElement('button')
      btn.textContent = `${rate}x`
      btn.onclick = () => {
        this.video.playbackRate = rate
        this.settingsMenu.close()
      }
      this.settingsMenu.menu.appendChild(btn)
    })

    /* Info menu */
    this.infoMenu = this.createMenu('ℹ️')
    this.infoMenu.menu.innerHTML = `
      <strong>NanoPlayer</strong><br>
      Version 0.1.6<br>
      MIT License
      swiftmessage.org
      github.com/swiftmessage/NanoPlayer
    `

    /* Fullscreen button */
    this.fullscreenBtn = document.createElement('button')
    this.fullscreenBtn.className = 'nano-icon'
    this.fullscreenBtn.textContent = '⛶'
    this.fullscreenBtn.onclick = () => this.toggleFullscreen()

    this.right.append(
      this.volumeMenu.root,
      this.settingsMenu.root,
      this.infoMenu.root,
      this.fullscreenBtn
    )

    this.controls.append(this.left, this.center, this.right)
    this.wrapper.appendChild(this.controls)

    /* UI actions */

    this.playBtn.onclick = () =>
      this.video.paused ? this.video.play() : this.video.pause()

    this.progress.onclick = e => {
      const r = this.progress.getBoundingClientRect()
      this.video.currentTime =
        ((e.clientX - r.left) / r.width) * this.video.duration
    }

    this.volumeSlider.oninput = () =>
      (this.video.volume = this.volumeSlider.value)
  }

  /* ================= MENU HELPER ================= */

  createMenu(icon) {
    const root = document.createElement('div')
    root.className = 'nano-menu-wrap'

    const btn = document.createElement('button')
    btn.className = 'nano-icon'
    btn.textContent = icon

    const menu = document.createElement('div')
    menu.className = 'nano-menu'

    btn.onclick = e => {
      e.stopPropagation()
      document
        .querySelectorAll('.nano-menu-wrap.open')
        .forEach(el => el.classList.remove('open'))
      root.classList.toggle('open')
    }

    document.addEventListener('click', () => {
      root.classList.remove('open')
    })

    root.append(btn, menu)

    return {
      root,
      menu,
      close: () => root.classList.remove('open')
    }
  }

  /* ================= EVENTS ================= */

  bindEvents() {
    this.wrapper.addEventListener('click', () => {
      this.wrapper.focus()
    })

    /* Metadata / auto-poster */
    this.video.addEventListener('loadedmetadata', () => {
      if (!this.options.poster) {
        this.video.currentTime = 0.1
        this.video.pause()
      }
    })

    /* Play / Pause */
    this.video.addEventListener('play', () => {
      this.playBtn.textContent = '❚❚'
      this.overlay.classList.add('hidden')
    })

    this.video.addEventListener('pause', () => {
      this.playBtn.textContent = '▶'
    })

    /* Progress */
    this.video.addEventListener('timeupdate', () => {
      const p =
        (this.video.currentTime / this.video.duration) * 100
      this.progressFill.style.width = `${p}%`
    })

    /* ⌨️ Space = play / pause */
    this.wrapper.addEventListener('keydown', e => {
      if (e.code !== 'Space') return

      const tag = e.target.tagName
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return

      e.preventDefault()
      this.video.paused ? this.video.play() : this.video.pause()
    })

    /* Fullscreen state */
    document.addEventListener('fullscreenchange', () => {
      this.wrapper.classList.toggle(
        'nano-fullscreen',
        !!document.fullscreenElement
      )
    })
  }

  /* ================= FULLSCREEN ================= */

  toggleFullscreen() {
    const el = this.wrapper

    if (!document.fullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen()
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
      else if (el.msRequestFullscreen) el.msRequestFullscreen()
    } else {
      if (document.exitFullscreen) document.exitFullscreen()
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
      else if (document.msExitFullscreen) document.msExitFullscreen()
    }
  }
}
