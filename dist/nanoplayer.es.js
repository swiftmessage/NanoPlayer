class l {
  constructor(e, t = {}) {
    if (this.container = document.querySelector(e), !this.container)
      throw new Error("NanoPlayer: container not found");
    this.options = {
      src: "",
      poster: null,
      autoplay: !1,
      volume: 1,
      playbackRates: [0.5, 1, 1.5, 2],
      ...t
    }, this.init();
  }
  /* ================= INIT ================= */
  init() {
    this.wrapper = document.createElement("div"), this.wrapper.className = "nano-player", this.wrapper.tabIndex = 0, this.video = document.createElement("video"), this.video.src = this.options.src, this.video.autoplay = this.options.autoplay, this.video.volume = this.options.volume, this.video.preload = "metadata", this.video.controls = !1, this.options.poster && (this.video.poster = this.options.poster), this.wrapper.appendChild(this.video), this.container.appendChild(this.wrapper), this.createOverlay(), this.createControls(), this.bindEvents();
  }
  /* ================= OVERLAY ================= */
  createOverlay() {
    this.overlay = document.createElement("div"), this.overlay.className = "nano-overlay", this.bigPlay = document.createElement("button"), this.bigPlay.className = "nano-big-play", this.bigPlay.textContent = "▶", this.infoOverlay = document.createElement("div"), this.infoOverlay.className = "nano-info-overlay", this.infoOverlay.textContent = "", this.overlay.append(this.bigPlay, this.infoOverlay), this.wrapper.appendChild(this.overlay), this.bigPlay.onclick = () => this.video.play();
  }
  /* ================= CONTROLS ================= */
  createControls() {
    this.controls = document.createElement("div"), this.controls.className = "nano-controls", this.left = document.createElement("div"), this.left.className = "nano-left", this.playBtn = document.createElement("button"), this.playBtn.className = "nano-icon", this.playBtn.textContent = "▶", this.left.appendChild(this.playBtn), this.center = document.createElement("div"), this.center.className = "nano-center", this.progress = document.createElement("div"), this.progress.className = "nano-progress", this.progressFill = document.createElement("div"), this.progressFill.className = "nano-progress-fill", this.progress.appendChild(this.progressFill), this.center.appendChild(this.progress), this.right = document.createElement("div"), this.right.className = "nano-right", this.volumeMenu = this.createMenu("🔊"), this.volumeSlider = document.createElement("input"), this.volumeSlider.type = "range", this.volumeSlider.min = 0, this.volumeSlider.max = 1, this.volumeSlider.step = 0.01, this.volumeSlider.value = this.video.volume, this.volumeMenu.menu.appendChild(this.volumeSlider), this.settingsMenu = this.createMenu("⚙️"), this.options.playbackRates.forEach((e) => {
      const t = document.createElement("button");
      t.textContent = `${e}x`, t.onclick = () => {
        this.video.playbackRate = e, this.settingsMenu.close();
      }, this.settingsMenu.menu.appendChild(t);
    }), this.infoMenu = this.createMenu("ℹ️"), this.infoMenu.menu.innerHTML = `
      <strong>NanoPlayer</strong><br>
      Version 0.1.0<br>
      MIT License
      swiftmessage.org
      github.com/swiftmessage/NanoPlayer
    `, this.fullscreenBtn = document.createElement("button"), this.fullscreenBtn.className = "nano-icon", this.fullscreenBtn.textContent = "⛶", this.fullscreenBtn.onclick = () => this.toggleFullscreen(), this.right.append(
      this.volumeMenu.root,
      this.settingsMenu.root,
      this.infoMenu.root,
      this.fullscreenBtn
    ), this.controls.append(this.left, this.center, this.right), this.wrapper.appendChild(this.controls), this.playBtn.onclick = () => this.video.paused ? this.video.play() : this.video.pause(), this.progress.onclick = (e) => {
      const t = this.progress.getBoundingClientRect();
      this.video.currentTime = (e.clientX - t.left) / t.width * this.video.duration;
    }, this.volumeSlider.oninput = () => this.video.volume = this.volumeSlider.value;
  }
  /* ================= MENU HELPER ================= */
  createMenu(e) {
    const t = document.createElement("div");
    t.className = "nano-menu-wrap";
    const s = document.createElement("button");
    s.className = "nano-icon", s.textContent = e;
    const i = document.createElement("div");
    return i.className = "nano-menu", s.onclick = (n) => {
      n.stopPropagation(), document.querySelectorAll(".nano-menu-wrap.open").forEach((o) => o.classList.remove("open")), t.classList.toggle("open");
    }, document.addEventListener("click", () => {
      t.classList.remove("open");
    }), t.append(s, i), {
      root: t,
      menu: i,
      close: () => t.classList.remove("open")
    };
  }
  /* ================= EVENTS ================= */
  bindEvents() {
    this.wrapper.addEventListener("click", () => {
      this.wrapper.focus();
    }), this.video.addEventListener("loadedmetadata", () => {
      this.options.poster || (this.video.currentTime = 0.1, this.video.pause());
    }), this.video.addEventListener("play", () => {
      this.playBtn.textContent = "❚❚", this.overlay.classList.add("hidden");
    }), this.video.addEventListener("pause", () => {
      this.playBtn.textContent = "▶";
    }), this.video.addEventListener("timeupdate", () => {
      const e = this.video.currentTime / this.video.duration * 100;
      this.progressFill.style.width = `${e}%`;
    }), this.wrapper.addEventListener("keydown", (e) => {
      if (e.code !== "Space") return;
      const t = e.target.tagName;
      ["INPUT", "TEXTAREA", "SELECT"].includes(t) || (e.preventDefault(), this.video.paused ? this.video.play() : this.video.pause());
    }), document.addEventListener("fullscreenchange", () => {
      this.wrapper.classList.toggle(
        "nano-fullscreen",
        !!document.fullscreenElement
      );
    });
  }
  /* ================= FULLSCREEN ================= */
  toggleFullscreen() {
    const e = this.wrapper;
    document.fullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen() : e.requestFullscreen ? e.requestFullscreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen();
  }
}
typeof window < "u" && (window.NanoPlayer = l);
export {
  l as default
};
