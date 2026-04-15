import React from 'react'
import './pdf.scss'
import MacWindow from './MacWindow'

const PDF = () => {
  return (
    <MacWindow>
        <div className="pdf-window">
            <embed src="./dhruv_aparnathi_resume.pdf" type="" />
            {/* <iframe src="./dhruv_aparnathi_resume.pdf" frameborder="0"></iframe> */}
        </div>
    </MacWindow>
  )
}

export default PDF
