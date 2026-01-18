class r {
  constructor(e, t = {}) {
    if (this.container = document.querySelector(e), !this.container)
      throw new Error("NanoPlayer: container not found");
    this.options = {
      src: "",
      name: "",
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
    this.controls = document.createElement("div"), this.controls.className = "nano-controls", this.left = document.createElement("div"), this.left.className = "nano-left", this.playBtn = document.createElement("button"), this.playBtn.className = "nano-icon", this.playBtn.textContent = "▶", this.left.appendChild(this.playBtn), this.timeDisplay = document.createElement("div"), this.timeDisplay.className = "nano-time", this.timeDisplay.textContent = "0:00 / 0:00", this.left.appendChild(this.timeDisplay), this.center = document.createElement("div"), this.center.className = "nano-center", this.progress = document.createElement("div"), this.progress.className = "nano-progress", this.progressFill = document.createElement("div"), this.progressFill.className = "nano-progress-fill", this.progress.appendChild(this.progressFill), this.center.appendChild(this.progress), this.right = document.createElement("div"), this.right.className = "nano-right", this.volumeMenu = this.createMenu("🔊"), this.volumeSlider = document.createElement("input"), this.volumeSlider.type = "range", this.volumeSlider.min = 0, this.volumeSlider.max = 1, this.volumeSlider.step = 0.01, this.volumeSlider.value = this.video.volume, this.volumeMenu.menu.appendChild(this.volumeSlider), this.settingsMenu = this.createMenu("⚙️"), this.options.playbackRates.forEach((t) => {
      const i = document.createElement("button");
      i.textContent = `${t}x`, i.onclick = () => {
        this.video.playbackRate = t, this.settingsMenu.close();
      }, this.settingsMenu.menu.appendChild(i);
    }), this.infoMenu = this.createMenu("ℹ️");
    const e = this.options.name ? `Название: ${this.options.name}<br>` : "";
    this.infoMenu.menu.innerHTML = `
      <strong>NanoPlayer</strong><br>
      ${e}
      Version 0.1.7<br>
      Apache-2.0 License
      swiftmessage.org
      github.com/swiftmessage/NanoPlayer
    `, this.fullscreenBtn = document.createElement("button"), this.fullscreenBtn.className = "nano-icon", this.fullscreenBtn.textContent = "⛶", this.fullscreenBtn.onclick = () => this.toggleFullscreen(), this.right.append(
      this.volumeMenu.root,
      this.settingsMenu.root,
      this.infoMenu.root,
      this.fullscreenBtn
    ), this.controls.append(this.left, this.center, this.right), this.wrapper.appendChild(this.controls), this.playBtn.onclick = () => this.video.paused ? this.video.play() : this.video.pause(), this.progress.onclick = (t) => {
      if (!Number.isFinite(this.video.duration) || this.video.duration <= 0)
        return;
      const i = this.progress.getBoundingClientRect();
      this.video.currentTime = (t.clientX - i.left) / i.width * this.video.duration;
    }, this.volumeSlider.oninput = () => this.video.volume = this.volumeSlider.value;
  }
  /* ================= MENU HELPER ================= */
  createMenu(e) {
    const t = document.createElement("div");
    t.className = "nano-menu-wrap";
    const i = document.createElement("button");
    i.className = "nano-icon", i.textContent = e;
    const s = document.createElement("div");
    return s.className = "nano-menu", i.onclick = (o) => {
      o.stopPropagation(), document.querySelectorAll(".nano-menu-wrap.open").forEach((n) => n.classList.remove("open")), t.classList.toggle("open");
    }, document.addEventListener("click", () => {
      t.classList.remove("open");
    }), t.append(i, s), {
      root: t,
      menu: s,
      close: () => t.classList.remove("open")
    };
  }
  /* ================= EVENTS ================= */
  bindEvents() {
    this.wrapper.addEventListener("click", () => {
      this.wrapper.focus();
    }), this.video.addEventListener("loadedmetadata", () => {
      this.options.poster || (this.video.currentTime = 0.1, this.video.pause()), this.updateTime();
    }), this.video.addEventListener("play", () => {
      this.playBtn.textContent = "❚❚", this.overlay.classList.add("hidden");
    }), this.video.addEventListener("pause", () => {
      this.playBtn.textContent = "▶";
    }), this.video.addEventListener("timeupdate", () => {
      this.updateTime();
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
  /* ================= TIME ================= */
  updateTime() {
    const e = Number.isFinite(this.video.duration) ? this.video.duration : 0, t = Number.isFinite(this.video.currentTime) ? this.video.currentTime : 0, i = e > 0 ? t / e * 100 : 0;
    this.progressFill.style.width = `${i}%`, this.timeDisplay.textContent = `${this.formatTime(t)} / ${this.formatTime(e)}`;
  }
  formatTime(e) {
    const t = Math.max(0, Math.floor(e || 0)), i = Math.floor(t / 3600), s = Math.floor(t % 3600 / 60), o = t % 60, n = String(o).padStart(2, "0");
    if (i > 0) {
      const a = String(s).padStart(2, "0");
      return `${i}:${a}:${n}`;
    }
    return `${s}:${n}`;
  }
  /* ================= FULLSCREEN ================= */
  toggleFullscreen() {
    const e = this.wrapper;
    document.fullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen() : e.requestFullscreen ? e.requestFullscreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen();
  }
}
typeof window < "u" && (window.NanoPlayer = r);
export {
  r as default
};
