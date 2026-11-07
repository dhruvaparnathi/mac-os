import React, { useState, useRef } from 'react';
import MacWindow from '../../components/common/MacWindow';
import { RiChat1Fill, RiSendPlane2Fill, RiMailLine } from '@remixicon/react';
import { soundManager } from '../../utils/sound';
import './messages.scss';

const Messages = () => {
  const idRef = useRef(10);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'dhruv',
      text: 'Hey there! 👋 Welcome to my macOS portfolio. Are you looking to collaborate on a web project or discuss a development role?',
      time: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickPrompts = [
    '💼 Let’s discuss an engineering role',
    '⚡ Can we build a web project together?',
    '📄 Can you share your resume?',
    '👋 Just wanted to say awesome portfolio!'
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    soundManager.playPop();

    const userMsgId = ++idRef.current;
    const userMsg = {
      id: userMsgId,
      sender: 'user',
      text: text,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Automated smart reply from Dhruv
    setTimeout(() => {
      soundManager.playClick();
      let replyText = "Thanks for the message! Let's definitely connect. You can reach my direct inbox at dhruv.aparnathi.1@gmail.com or via LinkedIn!";
      if (text.includes('role') || text.includes('engineering') || text.includes('hire')) {
        replyText = "That sounds exciting! I'm actively open to full-stack engineering opportunities. Please drop me a note at dhruv.aparnathi.1@gmail.com and let's set up a call!";
      } else if (text.includes('resume')) {
        replyText = "You can view and download my official resume right here on the desktop from the PDF app or on the dock!";
      }

      const botMsgId = ++idRef.current;
      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          sender: 'dhruv',
          text: replyText,
          time: 'Just now',
          showMailBtn: true
        }
      ]);
    }, 800);
  };

  return (
    <MacWindow
      windowId="messages"
      title="Messages — Dhruv Aparnathi"
      icon={RiChat1Fill}
      defaultWidth={740}
      defaultHeight={500}
    >
      <div className="messages-window">
        {/* Left Conversation List */}
        <div className="msg-sidebar">
          <div className="msg-sidebar-header">
            <h3>Messages</h3>
          </div>
          <div className="conv-item active">
            <div className="conv-avatar">DA</div>
            <div className="conv-info">
              <div className="conv-top">
                <span className="conv-name">Dhruv Aparnathi</span>
                <span className="conv-time">Now</span>
              </div>
              <span className="conv-preview">Online • Full-Stack Dev</span>
            </div>
          </div>
        </div>

        {/* Right Message Thread */}
        <div className="msg-content">
          <div className="msg-header">
            <div className="recipient-info">
              <span className="to-label">To:</span>
              <span className="recipient-name">Dhruv Aparnathi</span>
              <span className="online-indicator">● Active</span>
            </div>
          </div>

          <div className="msg-thread">
            {messages.map((m) => (
              <div key={m.id} className={`bubble-row ${m.sender}`}>
                <div className="chat-bubble">
                  <p>{m.text}</p>
                  {m.showMailBtn && (
                    <a
                      href="mailto:dhruv.aparnathi.1@gmail.com"
                      className="inline-mail-btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <RiMailLine size={14} /> Send Email Directly
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="quick-prompts-bar">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                className="prompt-chip"
                onClick={() => handleSend(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            className="msg-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="iMessage (type a message to Dhruv)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="send-btn" disabled={!inputValue.trim()}>
              <RiSendPlane2Fill size={16} />
            </button>
          </form>
        </div>
      </div>
    </MacWindow>
  );
};

export default Messages;
