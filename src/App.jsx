import React from 'react'
import './app.scss'
import Dock from './components/Dock'
import Navbar from './components/Navbar'
import MacWindow from './windows/MacWindow'

const App = () => {
  return (
    <main>
      <Navbar />
      <MacWindow />
      <Dock />
    </main>
  )
}

export default App
