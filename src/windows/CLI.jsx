import React from 'react';
import MacWindow from './MacWindow';
import Terminal from 'react-console-emulator';
import './cli.scss';

const CLI = ({windowName , windowState, setWindowState}) => {
  const Highlight = ({ children }) => <span className="text-highlight">{children}</span>;
  const Dim = ({ children }) => <span className="text-dim">{children}</span>;

  const commands = {
    echo: {
      description: 'Repeat the input text',
      usage: 'echo <text>',
      fn: (...args) => args.join(' ')
    },
    about: {
      description: 'Who is Dhruv?',
      fn: () => (
        <div>
          👋 Hey, I'm <Highlight>Dhruv Aparnathi</Highlight><br />
          Full Stack Developer 🚀(more on Frontend)<br />
          I build fast, scalable & aesthetic web experiences.
        </div>
      )
    },
    skills: {
      description: 'View tech stack',
      fn: () => (
        <div>
          <Highlight>⚡ Tech Stack:</Highlight><br />
          → React.js / Next.js<br />
          → Node.js / Express<br />
          → MongoDB / SQL<br />
          → Tailwind / Three.js
        </div>
      )
    },
    projects: {
      description: 'Check out my work',
      fn: () => (
        <div>
          <Highlight>🔥 Top Picks:</Highlight><br />
          1. <Highlight>MacOS Portfolio</Highlight> - You are here<br />
          2. Transact - Manage your recent Transaction.<br />
          3. Productivity Web App - daily task, and planner with pomodoro timer.<br />
          4. Image Filterer - Edit images with presets and download it.<br />
          5. Watch on GitHub: <Dim>github.com/dhruvaparnathi</Dim>
        </div>
      )
    },
    contact: {
      description: 'Get in touch',
      fn: () => (
        <div>
          📬 Email: <Highlight>dhruv@example.com</Highlight><br />
          🔗 GitHub: <Dim>github.com/dhruvaparnathi</Dim>
        </div>
      )
    }
  };

  return (
    <MacWindow windowName={windowName} windowState={windowState} setWindowState={setWindowState}>
      <div className="cli-container">
        <Terminal
          commands={commands}
          welcomeMessage={[
            '██████╗ ██╗  `██╗██████╗ ██╗    ` ██╗██╗     ` `██╗',
            '██╔══██╗██║  `██║██╔══██╗██║    ` ██║██║     ` `██║',
            '██║  `██║███████║██████╔╝██║    ` ██║██║     ` `██║',
            '██║  `██║██╔══██║██╔══██╗██║    ` ██║╚██╗ `██╔╝',
            '██████╔╝██║   `██║██║  `██║╚██████╔╝ ╚████╔╝ ',
            '╚═════╝ ╚═╝   `╚═╝╚═╝  `╚═╝ ╚═════╝  ` ╚═══╝  ',
            '',
            `Welcome to my Portfolio CLI!`,
            '──────────────────────────────────────────',
            '> Status  : ONLINE',
            '> Mode    : Developer',
            '──────────────────────────────────────────',
            '👋 Hello There! ,Type "help" to see available commands.'
          ].join('\n')}
          promptLabel={'dhruvaparnathi@macbook:~$'}
          autoFocus
          className="custom-terminal"
          noCommandFound={(cmd) => `sh: command not found: ${cmd}. Type "help" for a list of commands.`}
        />
      </div>
    </MacWindow>
  );
};

export default CLI;