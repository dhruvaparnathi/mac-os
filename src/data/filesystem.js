// File system structure for Finder and Desktop
export const FILE_SYSTEM = {
  desktop: [
    {
      id: 'dt-resume',
      name: 'Dhruv_Aparnathi_Resume.pdf',
      type: 'pdf',
      size: '235 KB',
      updated: 'Nov 2026',
      action: 'open_pdf'
    },
    {
      id: 'dt-notes',
      name: 'profile.config.ts',
      type: 'code',
      size: '4.8 KB',
      updated: 'Recent',
      action: 'open_notes'
    },
    {
      id: 'dt-projects',
      name: 'Featured Projects',
      type: 'folder',
      size: '9 items',
      updated: 'Today',
      action: 'open_github'
    },
    {
      id: 'dt-terminal',
      name: 'Terminal.app',
      type: 'app',
      size: '1.2 MB',
      updated: 'System',
      action: 'open_cli'
    }
  ],
  documents: [
    {
      id: 'doc-bio',
      name: 'About_Dhruv.md',
      type: 'markdown',
      size: '2.1 KB',
      updated: 'Nov 2026',
      content: `# Dhruv Aparnathi\n\nSelf-driven MERN Stack Developer focused on building responsive and interactive web applications using ReactJS and modern backend technologies.\nPassionate about frontend architecture, UI/UX design, API development, and solving real-world problems through project-based learning.\n\n• Location: Porbandar, Gujarat, India\n• Email: dhruv.aparnathi.1@gmail.com\n• GitHub: https://github.com/dhruvaparnathi\n• Codolio: https://codolio.com/profile/dhruvaparnathi`
    },
    {
      id: 'doc-edu',
      name: 'Education_and_Degrees.txt',
      type: 'text',
      size: '720 B',
      updated: '2026',
      content: `• Parul University: B.Tech in Computer Science & Engineering (Expected 2027, CGPA: 7.4)\n• Sheryians Coding School: Cohort 2.0 (Advanced Full-Stack & System Design)\n• Relevant Coursework: DSA, OOP, DBMS, Operating Systems, Web Development\n• SIGMA English School: 12th GSEB (66.7%)\n• EDU-World Global English School: 10th GSEB (87%)`
    },
    {
      id: 'doc-achieve',
      name: 'Awards_and_Certifications.txt',
      type: 'text',
      size: '980 B',
      updated: '2026',
      content: `• Prompt Engineering — Sololearn (Cert: CC-6FSZUKYO)\n• Frontend Development — Sololearn (Cert: CC-I6PBRXOU)\n• Web Development — Sololearn (Cert: CC-VRRK9RRO)\n• Hackathon Vadodara 6.0: Top 500 Global Participation\n• 10+ React and MERN stack applications built and deployed to production`
    }
  ],
  skills: [
    {
      id: 'sk-frontend',
      name: 'Frontend_Architecture.ts',
      type: 'code',
      size: '1.8 KB',
      updated: 'Today',
      items: ['React 19', 'ReactJS', 'Redux Toolkit', 'Tailwind CSS v4', 'TypeScript', 'JavaScript (ES6+)', 'GSAP Stagger', 'Lenis Scroll', 'SCSS / CSS3']
    },
    {
      id: 'sk-backend',
      name: 'Backend_and_Database.ts',
      type: 'code',
      size: '1.5 KB',
      updated: 'Today',
      items: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose ODM', 'Redis Caching', 'REST APIs', 'Socket.io', 'JWT (HttpOnly)', 'OAuth 2.0']
    },
    {
      id: 'sk-ai-tools',
      name: 'AI_and_Cloud_Integrations.ts',
      type: 'code',
      size: '1.4 KB',
      updated: 'Today',
      items: ['LangChain', 'RAG Pipelines', 'Google Gemini API', 'Mistral AI', 'Tavily Search API', 'ElevenLabs TTS', '@mediapipe/tasks-vision', 'Razorpay HMAC-SHA256', 'ImageKit CDN', 'Docker', 'Git']
    }
  ],
  trash: [
    {
      id: 'tr-1',
      name: 'unresolved_merge_conflict.orig',
      type: 'text',
      size: '42 B',
      updated: 'Yesterday'
    },
    {
      id: 'tr-2',
      name: 'legacy_jquery_spaghetti.js',
      type: 'code',
      size: '8.4 KB',
      updated: '2021'
    },
    {
      id: 'tr-3',
      name: 'all_nighter_coffee_cups.log',
      type: 'text',
      size: '999 KB',
      updated: 'Everyday'
    }
  ]
};
