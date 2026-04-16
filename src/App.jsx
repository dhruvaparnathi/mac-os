import React,{useState} from 'react'
import './app.scss'
import Dock from './components/Dock'
import Navbar from './components/Navbar'
import Github from './windows/Github'
import Note from './windows/Note'
import PDF from './windows/PDF'
import Spotify from './windows/Spotify'
import CLI from './windows/CLI'

const App = () => {

  const [windowState, setWindowState] = useState({
    github: false,
    note: false,
    pdf: false,
    spotify: false,
    cli: false
  })

  return (
    <main>
      <Navbar />

      { windowState.github && <Github windowName="github" windowState={windowState} setWindowState={setWindowState}/> }
      { windowState.note && <Note windowName="note" windowState={windowState} setWindowState={setWindowState}/> }
      { windowState.pdf && <PDF windowName="pdf" windowState={windowState} setWindowState={setWindowState}/> }
      { windowState.spotify && <Spotify windowName="spotify" windowState={windowState} setWindowState={setWindowState}/> }
      { windowState.cli && <CLI windowName="cli" windowState={windowState} setWindowState={setWindowState}/> }

      <Dock windowState={windowState} setWindowState={setWindowState}/>
    </main>
  )
}

export default App
