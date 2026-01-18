import './style.css'
import NanoPlayer from './NanoPlayer.js'

export default NanoPlayer

// для <script>
if (typeof window !== 'undefined') {
  window.NanoPlayer = NanoPlayer
}
