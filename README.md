# 🍎 macOS Sequoia Web Portfolio — Dhruv Aparnathi

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4.2-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![SCSS](https://img.shields.io/badge/SCSS-Modular-CC6699?style=flat&logo=sass&logoColor=white)](https://sass-lang.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An interactive, high-fidelity **macOS Sequoia desktop operating system** portfolio built from scratch with **React 19**, **Vite 7**, **Tailwind CSS v4**, and **SCSS**.

Instead of a traditional static portfolio, this project turns your browser into a fully operational macOS environment featuring draggable & resizable multi-window management, an interactive Control Center with live system brightness and volume control, virtual file system simulation, Lo-Fi music audio suite, Spotlight Search (`Cmd + K`), and 10+ native apps showcasing projects, technical skills, resume, and contact channels.

---

## 🌐 Live Demo

🔗 **[Experience Live macOS Portfolio](https://macbook-os.netlify.app/)**

---

## 📸 Preview

<div align="center">
  <img width="1892" height="975" alt="macOS Desktop with Glassmorphism" src="https://github.com/user-attachments/assets/b5903142-722a-46dd-a8d7-3824e9e76b26" />
  <p><em>Desktop Environment with Glass Menu Bar, Animated Dock & Draggable Windows</em></p>
</div>

<br/>

<div align="center">
  <img width="1904" height="980" alt="Projects Showcase & Interactive Window" src="https://github.com/user-attachments/assets/019354da-7095-4932-82ad-d3f986bdd444" />
  <p><em>Projects Showcase Window with Live Category Filtering & Modal Previews</em></p>
</div>

<br/>

<div align="center">
  <img width="1920" height="1080" alt="Terminal Emulator and Finder" src="https://github.com/user-attachments/assets/04a21701-44aa-478e-a086-a6d21bbb3e87" />
  <p><em>CLI Terminal Emulator with App Launch Commands & Developer Notebook</em></p>
</div>

<br/>

<div align="center">
  <img width="1907" height="976" alt="Dark Mode & Control Center" src="https://github.com/user-attachments/assets/7ebff252-b79a-4ed6-90f7-a9e1f0776643" />
  <p><em>Interactive Control Center with Real-Time Audio & Brightness Controls</em></p>
</div>

---

## ✨ Key System Features

### 🖥️ 1. Authentic macOS Sequoia UI & Window Manager
- **Dynamic Window Manager (`react-rnd`)**:
  - Independent active window focus with dynamic z-index stacking.
  - Native macOS traffic light controls: **Close**, **Minimize to Dock**, and **Full-screen Maximize / Restore**.
  - Fluid dragging with viewport constraint boundaries and smooth 8-direction resizing.
- **Glass Top Menu Bar**:
  - Functional Apple Menu with quick links to *About This Mac*, *System Preferences*, *Lock Screen*, and *Sleep*.
  - Contextual active window title indicator.
  - Status items: Battery level, Wi-Fi status, Spotlight search toggle, and live digital clock with date format.
- **Interactive Control Center**:
  - Real-time **System Volume Slider** controlling the built-in Lo-Fi background audio engine.
  - Real-time **Display Brightness Slider** with live CSS backdrop filter illumination.
  - Toggles for Wi-Fi, Bluetooth, AirDrop, and Dark Mode.
  - Integrated music playback card with play/pause and skip controls.
- **Spotlight Search (`Cmd + K` / `Ctrl + K`)**:
  - Instant fuzzy app search overlay with keyboard navigation (`↑`, `↓`, `Enter`, `Escape`).
- **Interactive macOS Dock**:
  - Running app indicator dots.
  - Hover tooltips and smooth scaling magnification.
  - Quick launch for all system apps and desktop utilities.
- **Desktop Environment & Context Menu**:
  - Desktop icons (`Macintosh HD`, `Dhruv_Resume.pdf`, `Projects`, `profile.config.ts`, `Bin`) with click and double-click actions.
  - Right-click desktop context menu to change wallpapers, launch apps, or view system info.
- **Lock Screen**:
  - Authentic macOS login screen with avatar, blurred wallpaper backdrop, password validation shake animation, and lock/unlock toggle.
- **Synthesized System Audio (Web Audio API)**:
  - Custom procedural sound effects for window clicks, popups, and trash actions.

---

## 📦 Built-In Applications (10+ Native Apps)

| App | Icon | Description |
|---|:---:|---|
| **Finder** | 📁 | Virtual file system explorer with Favorites (`Desktop`, `Documents`, `Skills`, `Bin`), toggleable Grid/List views, and search filtering. |
| **Projects (GitHub)** | 🐙 | Project showcase with live filtering (`Full-Stack`, `AI/ML`, `React`, `Tools`), responsive dual-backdrop media, stack badges, live demo links, and modal image zoom. |
| **Terminal (zsh)** | 💻 | Fully interactive terminal emulator supporting commands like `help`, `about`, `skills`, `projects`, `contact`, `resume`, `whoami`, `clear`, `date`, `cat`, and app launching. |
| **Notes** | 📝 | Multi-tab developer notebook simulating IDE files (`profile.config.ts`, `projects.architecture.ts`, `experience.log`, `skills.json`) with one-click code copy. |
| **Resume (PDF)** | 📄 | Dual-mode resume viewer with **Digital View** (pristine dark-mode resume) and **PDF Viewer**. Includes **Download PDF** (safe 60s blob), **Open in Tab**, and **Print / Save as PDF** (`window.print()`). |
| **Safari** | 🧭 | macOS browser replica featuring tabs, URL bar, navigation buttons, bookmarks, and developer portfolio highlights. |
| **Spotify & Lo-Fi** | 🎵 | Dual-mode music player: In-house **Dev Lo-Fi Player** synchronized with macOS system volume (4 custom tracks) + official Spotify embed player. |
| **iMessage** | 💬 | Interactive contact messenger with quick conversation prompts (*"Let's collaborate!"*, *"Schedule interview"*), smart automated replies, and contact links. |
| **Settings** | ⚙️ | System preferences for switching 4K macOS wallpapers (Sequoia, Sonoma, Cyberpunk, Ventura, Minimal), toggling sound effects, and dark mode. |
| **Calculator** | 🧮 | Functional macOS dark calculator with standard arithmetic operations and precision display. |
| **About This Mac** | 🍏 | Hardware specs dialog featuring Apple M3 Max architecture, DhruvOS 15.2, Parul University 7.4 CGPA, memory, and graphics. |

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 7](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [SCSS](https://sass-lang.com/) (Modular BEM-like SCSS, glassmorphism, responsive queries, and `@media print` stylesheets)
- **Window Management:** [`react-rnd`](https://github.com/bokuweb/react-rnd)
- **Icons:** [`@remixicon/react`](https://remixicon.com/)
- **Terminal Emulator:** [`react-console-emulator`](https://github.com/linuswillner/react-console-emulator)
- **Audio Engine:** HTML5 Audio API (Lo-Fi controller) + Web Audio API (procedural UI sound effects)
- **State Management:** React Context API (`WindowContext`, `SettingsContext`)

---

## 📂 Project Structure

```text
Mac-OS/
├── public/
│   ├── dhruv_aparnathi_resume.pdf   # High-resolution resume PDF
│   ├── note.txt                     # Developer notebook raw notes
│   ├── wallpaper.png                # Default 4K macOS background
│   ├── doc-icons/                   # Dock application icons
│   └── navbar-icons/                # Top menu bar icons
├── src/
│   ├── assets/
│   │   └── github.json              # Project showcase catalog & metadata
│   ├── components/
│   │   ├── common/                  # MacWindow wrapper, traffic lights & resize handles
│   │   ├── desktop/                 # Desktop icons & right-click context menu
│   │   ├── dock/                    # macOS magnification dock & launch dots
│   │   ├── lockscreen/              # macOS lock & login screen
│   │   ├── navbar/                  # Glass top bar, Apple menu, Control Center, Clock
│   │   └── spotlight/               # Cmd+K spotlight search overlay
│   ├── context/
│   │   ├── WindowContext.jsx        # Multi-window state, z-index stacking, min/max
│   │   └── SettingsContext.jsx      # Brightness, volume, audio, wallpaper & lock state
│   ├── data/
│   │   ├── filesystem.js            # Virtual file system tree (Desktop, Documents, Skills)
│   │   └── wallpapers.js            # Curated 4K wallpapers & accent palettes
│   ├── utils/
│   │   ├── audio.js                 # Global Lo-Fi audio controller with volume sync
│   │   └── sound.js                 # Synthesized Web Audio API sound effects
│   ├── windows/                     # 10 Modular macOS Application Components
│   │   ├── about/                   # About This Mac specs dialog
│   │   ├── calculator/              # macOS dark calculator
│   │   ├── cli/                     # ZSH terminal emulator with custom commands
│   │   ├── finder/                  # Virtual file explorer with grid/list modes
│   │   ├── github/                  # Projects catalog with category filter & zoom
│   │   ├── messages/                # iMessage contact form with interactive prompts
│   │   ├── note/                    # Multi-tab developer notebook
│   │   ├── pdf/                     # PDF viewer, digital resume & print-to-PDF
│   │   ├── safari/                  # Safari browser simulator
│   │   ├── settings/                # Wallpaper switcher & sound settings
│   │   └── spotify/                 # Lo-Fi player & Spotify embed
│   ├── App.jsx                      # Main desktop shell & context providers
│   ├── app.scss                     # Global desktop styles & glassmorphism filters
│   └── main.jsx                     # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| <kbd>⌘ Cmd</kbd> + <kbd>K</kbd> / <kbd>Ctrl</kbd> + <kbd>K</kbd> | Toggle Spotlight Search |
| <kbd>Esc</kbd> | Close Spotlight / Dismiss Open Menus |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Navigate Spotlight search results |
| <kbd>Enter</kbd> | Launch selected app in Spotlight |

---

## ⚡ Terminal (CLI) Commands

Launch the **Terminal** from the Dock or Desktop and try these commands:

```bash
help         # List all available terminal commands
about        # Print professional summary & background
skills       # Display full frontend, backend, and AI tech stack
projects     # View featured projects overview
contact      # Get email, phone, LinkedIn, and GitHub links
resume       # Open the Resume viewer window
finder       # Open macOS Finder
safari       # Open Safari browser
whoami       # Display current logged-in developer profile
date         # Show current system date and time
clear        # Clear the terminal screen
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or **pnpm** / **yarn**)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhruvaparnathi/Mac-OS.git
   cd Mac-OS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Lint and code quality check:**
   ```bash
   npm run lint
   ```

---

## 👨‍💻 Author

**Dhruv Aparnathi**  
*MERN Stack & Full-Stack Engineer*  
*B.Tech in Computer Science & Engineering — Parul University (Expected 2027)*

- 🌐 **Portfolio:** [macbook-os.netlify.app](https://macbook-os.netlify.app/)
- 💻 **GitHub:** [@dhruvaparnathi](https://github.com/dhruvaparnathi)
- 👔 **LinkedIn:** [dhruv-aparnathi](https://www.linkedin.com/in/dhruv-aparnathi-506b58306)
- ⚡ **Codolio:** [codolio.com/profile/dhruvaparnathi](https://codolio.com/profile/dhruvaparnathi)
- 📧 **Email:** [dhruv.aparnathi.1@gmail.com](mailto:dhruv.aparnathi.1@gmail.com)
- 📱 **Phone:** +91 8200733252

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it for personal inspiration or portfolio learning.
