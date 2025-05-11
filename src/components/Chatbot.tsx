import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { sender: 'bot', text: data.reply }]);
    } catch {
      setMessages(msgs => [...msgs, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {!open && (
        <button
          className="chatbot-fab"
          onClick={() => setOpen(true)}
          aria-label="Open AI Chatbot"
        >
          💬
        </button>
      )}
      {open && (
        <div className="chatbot-container">
          <button
            className="chatbot-close"
            onClick={() => setOpen(false)}
            aria-label="Close Chatbot"
          >
            ×
          </button>
          <div className="chatbot-window">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.sender}`}>{msg.text}</div>
            ))}
            {loading && <div className="chatbot-msg bot">...</div>}
            <div ref={chatEndRef} />
          </div>
          <div className="chatbot-input-row">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 