import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { X, Send, Play, Sparkles, Code2 } from 'lucide-react';
import { getPyodide } from '../../utils/pyodideService';
import { askTutor } from '../../utils/aiService';
import './AiTutorPanel.css';

const STARTER_CODE = `# Write your Python code here
print("Hello, World!")

# Try something fun:
for i in range(1, 6):
    print(f"Learning step {i} ✓")
`;

export default function AITutorPanel({ lessonId, concept, onClose }) {
  // --- Code Editor State ---
  const [code, setCode] = useState(STARTER_CODE);
  const [output, setOutput] = useState('');
  const [outputType, setOutputType] = useState('placeholder'); // 'placeholder' | 'success' | 'error'
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(true);

  // --- Chat State ---
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const conversationHistory = useRef([]);
  const messagesEndRef = useRef(null);

  // --- Load Pyodide on mount ---
  useEffect(() => {
    async function initPyodide() {
      try {
        await getPyodide();
        setPyodideReady(true);
      } catch (err) {
        console.error('Pyodide load failed:', err);
        setOutput('⚠ Python engine could not load. Please refresh and try again.');
        setOutputType('error');
      } finally {
        setPyodideLoading(false);
      }
    }
    initPyodide();
  }, []);

  // Scroll chat to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAsking]);

  // --- Run Python Code ---
  async function runCode() {
    if (!pyodideReady || isRunning) return;
    setIsRunning(true);
    setOutput('');
    setOutputType('success');

    try {
      const pyodide = await getPyodide();
      let result = '';

      pyodide.setStdout({
        batched: (text) => { result += text + '\n'; },
      });
      pyodide.setStderr({
        batched: (text) => { result += text + '\n'; },
      });

      await pyodide.runPythonAsync(code);
      setOutput(result || '(No output)');
      setOutputType('success');
    } catch (err) {
      setOutput(err.toString());
      setOutputType('error');
    } finally {
      setIsRunning(false);
    }
  }

  // --- Send question to AI Tutor ---
  async function handleAsk() {
    const trimmed = question.trim();
    if (!trimmed || isAsking) return;

    const userMsg = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion('');
    setIsAsking(true);

    try {
      const data = await askTutor({
        lessonId: lessonId || 1,
        concept: concept || 'General Python',
        question: trimmed,
        code,
        conversation_history: conversationHistory.current,
      });

      const assistantMsg = { role: 'assistant', content: data.answer };
      setMessages((prev) => [...prev, assistantMsg]);
      conversationHistory.current = [
        ...conversationHistory.current,
        userMsg,
        assistantMsg,
      ];
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '❌ Could not reach AI. Try again.' },
      ]);
    } finally {
      setIsAsking(false);
    }
  }

  return (
    <div
      className="ai-panel-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="ai-panel-card">

        {/* ── Header ── */}
        <div className="ai-panel-header">
          <div className="ai-panel-header-left">
            <div className="ai-panel-sparkle">
              <Sparkles size={16} color="#fff" />
            </div>
            <div>
              <p className="ai-panel-title">AI Python Tutor</p>
              <p className="ai-panel-subtitle">
                Ask questions · Write &amp; Run Python · Get instant help
              </p>
            </div>
          </div>
          <button className="ai-panel-close-btn" onClick={onClose} title="Close">
            <X size={16} />
          </button>
        </div>

        {/* ── Body: Chat (left) + Code (right) ── */}
        <div className="ai-panel-body">

          {/* ──── LEFT: AI CHAT ──── */}
          <div className="ai-chat-col">
            {/* Lesson context chip */}
            <div className="ai-chat-context-bar">
              <span className="ai-context-label">Topic:</span>
              <span className="ai-context-chip" title={concept}>
                {concept || 'General Python'}
              </span>
            </div>

            {/* Messages */}
            <div className="ai-messages-area">
              {messages.length === 0 && !isAsking && (
                <div className="ai-empty-state">
                  <Sparkles size={36} color="#6366f1" />
                  <p>
                    Ask any question about <strong>{concept || 'this lesson'}</strong>.<br />
                    Your code is automatically shared as context!
                  </p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`ai-message ${msg.role}`}>
                  <div className="ai-message-bubble">{msg.content}</div>
                </div>
              ))}

              {isAsking && (
                <div className="ai-message assistant">
                  <div className="ai-thinking-bubble">
                    <div className="ai-thinking-dots">
                      <span /><span /><span />
                    </div>
                    Thinking...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="ai-chat-input-row">
              <input
                className="ai-chat-input"
                type="text"
                placeholder="Ask your doubt..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAsk(); }}
                disabled={isAsking}
              />
              <button
                className="ai-chat-send-btn"
                onClick={handleAsk}
                disabled={isAsking || !question.trim()}
                title="Send"
              >
                <Send size={15} />
              </button>
            </div>
          </div>

          {/* ──── RIGHT: CODE EDITOR + OUTPUT ──── */}
          <div className="ai-code-col">
            {/* Code header */}
            <div className="ai-code-col-header">
              <div className="ai-code-col-title">
                <Code2 size={14} />
                Python Editor
                <span className="lang-badge">PY</span>
              </div>
              <button
                className="ai-run-btn"
                onClick={runCode}
                disabled={!pyodideReady || isRunning}
              >
                <Play size={13} />
                {isRunning ? 'Running...' : pyodideLoading ? 'Loading Python...' : 'Run'}
              </button>
            </div>

            {/* Monaco Editor */}
            <div className="ai-editor-area">
              {pyodideLoading ? (
                <div className="ai-pyodide-loading">
                  <div className="ai-spinner" />
                  Loading Python engine...
                </div>
              ) : (
                <Editor
                  height="100%"
                  language="python"
                  theme="vs-dark"
                  value={code}
                  onChange={(val) => setCode(val || '')}
                  options={{
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
                    minimap: { enabled: false },
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    padding: { top: 12 },
                    lineNumbers: 'on',
                    wordWrap: 'on',
                    renderLineHighlight: 'gutter',
                    smoothScrolling: true,
                  }}
                />
              )}
            </div>

            {/* Output Console */}
            <div className="ai-output-console">
              <div className="ai-output-header">
                <div className={`ai-output-dot ${outputType === 'error' ? 'error' : ''}`} />
                Output Console
              </div>
              <pre className={`ai-output-text ${outputType}`}>
                {output || 'Run your code to see output here...'}
              </pre>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
