# 💻 MacOS CLI Portfolio

An interactive **MacOS-inspired developer portfolio** built with React, featuring a fully functional terminal interface and draggable window system.

Instead of traditional scrolling, users explore the portfolio using commands — just like a real terminal.

---

## 🌐 Live Demo

[Click for Live Demo](https://macbook-os.netlify.app/)

---

## 🚀 Features

### 🖥️ MacOS-Inspired UI
- Custom window system  
- Draggable & resizable windows using `react-rnd`  
- Clean glassmorphism design  

### ⌨️ Interactive CLI Experience
- Terminal powered by `react-console-emulator`  
- Command-based navigation  
- Real-time responses  

### ⚡ Portfolio via Commands
- `about` → Learn about me  
- `skills` → Tech stack  
- `projects` → My work  
- `contact` → Contact info  
- `resume` → Resume access  

### 🎨 Modern Design
- Transparent glass terminal  
- Smooth typography & spacing  
- Developer-centric aesthetic  

---

## 🛠️ Tech Stack

- **Frontend:** React.js  
- **Styling:** SCSS  
- **Terminal Engine:** react-console-emulator  
- **Window System:** react-rnd  

---

## 📸 Preview

MacOS-style desktop with interactive terminal  

<img width="1892" height="975" alt="image" src="https://github.com/user-attachments/assets/b5903142-722a-46dd-a8d7-3824e9e76b26" />
<img width="1904" height="980" alt="image" src="https://github.com/user-attachments/assets/019354da-7095-4932-82ad-d3f986bdd444" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/04a21701-44aa-478e-a086-a6d21bbb3e87" />
<img width="1907" height="976" alt="image" src="https://github.com/user-attachments/assets/7ebff252-b79a-4ed6-90f7-a9e1f0776643" />


---

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Dock.jsx
│   └── ...
├── windows/
│   ├── MacWindow.jsx
│   ├── CLI.jsx
│   ├── Github.jsx
│   └── ...
├── styles/
│   └── cli.scss
├── assets/
└── App.jsx
```

---

## ⚙️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/your-username/macos-cli-portfolio.git

# Navigate into project
cd macos-cli-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🎯 Usage

1. Open the terminal window  
2. Type `help`  
3. Navigate using commands  

---

## 🧠 Challenges Faced

### 1. Terminal Layout Issues
- The terminal library had internal layout constraints  
- Custom styling sometimes broke structure (flex conflicts)  

**Solution:**  
Avoided overriding internal layout and targeted specific classes instead.

---

### 2. Window Resizing & Dragging
- Handling bounds and resizing using `react-rnd`  
- Preventing overflow and maintaining responsiveness  

**Solution:**  
Configured bounds properly and ensured correct parent height structure.

---

### 3. ASCII Rendering Issues
- Monospaced alignment caused broken UI  

**Solution:**  
Replaced ASCII-heavy design with a cleaner UI-based welcome message.

---

### 4. UI Consistency
- Matching macOS feel (spacing, blur, shadows)  

**Solution:**  
Used glassmorphism, subtle shadows, and consistent spacing.

---

## 🔮 Future Improvements

- ⚡ Custom-built terminal  
- ⌨️ Command autocomplete  
- 📂 File system simulation  
- 🎬 Boot animation  
- 🌐 Open projects in modal  

---


## 📬 Contact

- GitHub: https://github.com/dhruvaparnathi  
- Email: dhruv@example.com  

---

## ⭐ Inspiration

Inspired by macOS UI and interactive developer portfolios that focus on **experience over static design**.

---

## 📄 License

This project is licensed under the MIT License.
