import React from 'react'
import { RiGithubFill, RiFileTextFill,RiFilePdf2Fill, RiCalendarFill, RiSpotifyFill, RiMailFill, RiLink, RiCommandLine, RiTerminalFill } from '@remixicon/react'
import './dock.scss'
const Dock = () => {
  return (
    <footer className='dock'>
        <div className='dock-icon github'><RiGithubFill fill='#fff' width='24px' /></div>
        <div className='dock-icon note'><RiFileTextFill fill='#fff'  width='24px'/></div>
        <div className='dock-icon pdf'><RiFilePdf2Fill fill='#fff' width='24px' /></div>
        <div className='dock-icon calendar'><RiCalendarFill fill='#fff' width='24px' /></div>
        <div className='dock-icon spotify'><RiSpotifyFill fill='#fff' width='24px' /></div>
        <div className='dock-icon mail'><RiMailFill fill='#fff' width='24px' /></div>
        <div className='dock-icon link'><RiLink fill='#fff' width='24px' /></div>
        <div className='dock-icon terminal'><RiTerminalFill fill='#fff' width='24px' /></div>
    </footer>
  )
}

export default Dock
