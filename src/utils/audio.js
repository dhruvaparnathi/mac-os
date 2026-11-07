// Global Native macOS Audio Engine for Developer Lo-Fi & Beats
export const DEV_TRACKS = [
  {
    id: 1,
    title: 'Midnight Code Flow',
    artist: 'Chillhop Dev Beats',
    genre: 'Lo-Fi / Focus',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 2,
    title: 'Synthwave Skyline',
    artist: 'Retrowave Lab',
    genre: 'Electronic Synth',
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: 3,
    title: 'Coffee & Algorithms',
    artist: 'Acoustic Workspace',
    genre: 'Ambient Lo-Fi',
    cover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    id: 4,
    title: 'Tokyo Rain & Terminal',
    artist: 'Cozy Chill Lounge',
    genre: 'Lo-Fi Chill',
    cover: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&q=80',
    src: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg'
  }
];

class AudioController {
  constructor() {
    this.audio = null;
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.volume = 0.7;
    this.listeners = new Set();

    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.preload = 'metadata';
      this.audio.volume = this.volume;

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.nextTrack();
      });

      this.audio.addEventListener('timeupdate', () => {
        this.notify();
      });

      this.audio.addEventListener('loadedmetadata', () => {
        this.notify();
      });

      // Load initial track
      this.audio.src = DEV_TRACKS[0].src;
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      currentTrack: DEV_TRACKS[this.currentTrackIndex],
      currentTrackIndex: this.currentTrackIndex,
      currentTime: this.audio ? this.audio.currentTime : 0,
      duration: this.audio && !isNaN(this.audio.duration) ? this.audio.duration : 0,
      volume: this.volume
    };
  }

  setVolume(volZeroToOne) {
    const safeVol = Math.max(0, Math.min(1, volZeroToOne));
    this.volume = safeVol;
    if (this.audio) {
      this.audio.volume = safeVol;
    }
    this.notify();
  }

  setMuted(muted) {
    if (this.audio) {
      this.audio.muted = muted;
    }
    this.notify();
  }

  async play() {
    if (!this.audio) return;
    try {
      if (!this.audio.src) {
        this.audio.src = DEV_TRACKS[this.currentTrackIndex].src;
      }
      await this.audio.play();
    } catch {
      // Autoplay restriction handled gracefully
    }
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  selectTrack(index) {
    if (index < 0 || index >= DEV_TRACKS.length) return;
    this.currentTrackIndex = index;
    if (this.audio) {
      this.audio.src = DEV_TRACKS[index].src;
      this.play();
    }
  }

  nextTrack() {
    const nextIdx = (this.currentTrackIndex + 1) % DEV_TRACKS.length;
    this.selectTrack(nextIdx);
  }

  prevTrack() {
    const prevIdx = (this.currentTrackIndex - 1 + DEV_TRACKS.length) % DEV_TRACKS.length;
    this.selectTrack(prevIdx);
  }

  seek(seconds) {
    if (this.audio && !isNaN(seconds)) {
      this.audio.currentTime = seconds;
      this.notify();
    }
  }
}

export const audioController = new AudioController();

