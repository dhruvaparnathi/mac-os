import React from 'react'
import './pdf.scss'
import MacWindow from './MacWindow'

const PDF = ({windowName , windowState, setWindowState}) => {
  return (
    <MacWindow windowName={windowName} windowState={windowState} setWindowState={setWindowState}>
        <div className="pdf-window">
            <embed
  src="/dhruv_aparnathi_resume.pdf"
  type="application/pdf"
  width="100%"
  height="100%"
/>
            {/* <iframe src="./dhruv_aparnathi_resume.pdf" frameborder="0"></iframe> */}
        </div>
    </MacWindow>
  )
}

export default PDF
