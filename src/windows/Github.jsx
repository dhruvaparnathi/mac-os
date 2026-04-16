import React from 'react'
import MacWindow from './MacWindow'
import githubData from '../assets/github.json'
import './github.scss'

const Github = ({windowName , windowState, setWindowState}) => {
  return (
    <MacWindow windowName={windowName} windowState={windowState} setWindowState={setWindowState}>
      <div className='github-container'>
        {githubData.map((data) => (
          <div className='git-card' key={data.id}>
            
            <img src={data.image} alt={data.title} />

            <div className='git-content'>
              <h3>{data.title}</h3>
              <p>{data.description}</p>

              <div className='tags'>
                {data.tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>

              <div className='links'>
                <a href={data.repoLink} target='_blank' rel='noreferrer'>
                  GitHub
                </a>

                {data.demoLink && (
                  <a href={data.demoLink} target='_blank' rel='noreferrer'>
                    Live Demo
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </MacWindow>
  )
}

export default Github