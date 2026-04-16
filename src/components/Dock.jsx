import React from 'react'
import { RiGithubFill, RiFileTextFill,RiFilePdf2Fill, RiCalendarFill, RiSpotifyFill, RiMailFill, RiLink, RiCommandLine, RiTerminalFill } from '@remixicon/react'
import './dock.scss'
const Dock = ({windowState ,setWindowState }) => {
  return (
    <footer className='dock'>
        <div 
        onClick={() => {setWindowState(state => ({...state,github: true}))}}
        className='dock-icon github'><RiGithubFill fill='#fff' width='24px' /></div>
        <div 
        onClick={() => {setWindowState(state => ({...state,note: true}))}}
        className='dock-icon note'><RiFileTextFill fill='#fff'  width='24px'/></div>
        <div 
        onClick={() => {setWindowState(state => ({...state,pdf: true}))}}
        className='dock-icon pdf'><RiFilePdf2Fill fill='#fff' width='24px' /></div>
        <div 
        onClick={() => {window.open('https://calendar.google.com/calendar','_black')}}
        className='dock-icon calendar'><RiCalendarFill fill='#fff' width='24px' /></div>
        <div 
        onClick={() => {setWindowState(state => ({...state,spotify: true}))}}
        className='dock-icon spotify'><RiSpotifyFill fill='#fff' width='24px' /></div>
        <div 
        onClick={() => {window.open('mailto:dhruv.aparnathi.1@gmail.com','_black')}}
        className='dock-icon mail'><RiMailFill fill='#fff' width='24px' /></div>
        <div 
        onClick={() => {window.open('https://www.linkedin.com/in/dhruv-aparnathi-506b58306/','_black')}}
        className='dock-icon link'><RiLink fill='#fff' width='24px' /></div>
        <div 
        onClick={() => {setWindowState(state => ({...state,cli: true}))}}
        className='dock-icon terminal'><RiTerminalFill fill='#fff' width='24px' /></div>
    </footer>
  )
}

export default Dock
