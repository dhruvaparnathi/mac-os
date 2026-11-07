import React from 'react';
import MacWindow from '../../components/common/MacWindow';
import Terminal from 'react-console-emulator';
import { RiTerminalFill } from '@remixicon/react';
import { useWindows } from '../../context/WindowContext';
import './cli.scss';

const CLI = () => {
  const { openWindow } = useWindows();

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
          Full Stack Developer 🚀 (Specialized in React, Next.js & Node.js)<br />
          I build fast, scalable & aesthetic web experiences.
        </div>
      )
    },
    skills: {
      description: 'View tech stack',
      fn: () => (
        <div>
          <Highlight>⚡ Tech Stack:</Highlight><br />
          → Frontend : React.js, Next.js, TailwindCSS, Three.js, TypeScript<br />
          → Backend  : Node.js, Express, MongoDB, PostgreSQL, WebSockets<br />
          → AI / ML  : LangChain, LangGraph, Gemini API, TensorFlow.js<br />
          → DevOps   : Docker, Git, Linux, Vercel, Netlify
        </div>
      )
    },
    projects: {
      description: 'Check out my top projects',
      fn: () => (
        <div>
          <Highlight>🔥 Top Projects:</Highlight><br />
          1. <Highlight>Snitch</Highlight> - Neo-brutalist e-commerce storefront<br />
          2. <Highlight>Pax AI</Highlight> - Real-time AI search & Q&A engine<br />
          3. <Highlight>Moodify</Highlight> - Facial emotion music recommender<br />
          4. <Highlight>AI Battle Arena</Highlight> - Multi-LLM automated referee arena<br />
          5. <Highlight>Mac OS Portfolio</Highlight> - You are currently using it!
        </div>
      )
    },
    contact: {
      description: 'Get in touch with Dhruv',
      fn: () => (
        <div>
          📬 Email    : <Highlight>dhruv.aparnathi.1@gmail.com</Highlight><br />
          🔗 GitHub   : <Dim>github.com/dhruvaparnathi</Dim><br />
          💼 LinkedIn : <Dim>linkedin.com/in/dhruv-aparnathi-506b58306</Dim>
        </div>
      )
    },
    resume: {
      description: 'Open official resume PDF',
      fn: () => {
        openWindow('pdf');
        return 'Opening Resume window...';
      }
    },
    finder: {
      description: 'Launch Finder application',
      fn: () => {
        openWindow('finder');
        return 'Launching Finder...';
      }
    },
    safari: {
      description: 'Launch Safari browser',
      fn: () => {
        openWindow('safari');
        return 'Launching Safari...';
      }
    },
    settings: {
      description: 'Open System Settings',
      fn: () => {
        openWindow('settings');
        return 'Opening System Settings...';
      }
    },
    whoami: {
      description: 'Current user',
      fn: () => 'dhruvaparnathi (Full-Stack Engineer)'
    },
    date: {
      description: 'Display current date and time',
      fn: () => new Date().toString()
    }
  };

  return (
    <MacWindow
      windowId="cli"
      title="Terminal — dhruvaparnathi@macbook"
      icon={RiTerminalFill}
      defaultWidth={680}
      defaultHeight={440}
    >
      <div className="cli-container">
        <Terminal
          commands={commands}
          welcomeMessage={[
            '██████╗ ██╗ ` ██╗██████╗ ██╗ `  ██╗██╗   ` `██╗',
            '██╔══██╗██║ ` ██║██╔══██╗██║ `  ██║██║  ` `██║',
            '██║`  ██║████████║██████╔╝██║  ` ██║██║  ` `██║',
            '██║`  ██║██╔═══██║██╔══██╗██║  ` ██║╚██╗ `██╔╝',
            '██████╔╝██║ ` ██║██║  `██║╚██████╔╝ ╚████╔╝ ',
            '╚═════╝ ╚═╝   ` ╚═╝╚═╝  `╚═╝ ╚═════╝ ` ╚═══╝  ',
            '',
            'Welcome to Dhruv Aparnathi’s Portfolio Terminal!',
            '────────────────────────────────────────────────────────',
            '> System : macOS DhruvOS (zsh)',
            '> Status : ONLINE & Open to Opportunities',
            '────────────────────────────────────────────────────────',
            '👋 Type "help" to see all available commands.',
            '💡 Tip: Type "resume", "finder", or "safari" to launch apps!'
          ].join('\n')}
          promptLabel={'dhruvaparnathi@macbook:~$'}
          autoFocus
          className="custom-terminal"
          noCommandFound={(cmd) => `zsh: command not found: ${cmd}. Type "help" for valid commands.`}
        />
      </div>
    </MacWindow>
  );
};

export default CLI;

