import React from 'react'
import './app.scss'
import Dock from './components/Dock'
import Navbar from './components/Navbar'
import Github from './windows/Github'
import Note from './windows/Note'
import PDF from './windows/PDF'

const App = () => {
  return (
    <main>
      <Navbar />
      <Github />
      <Note />
      <PDF />
      <Dock />
    </main>
  )
}

export default App
