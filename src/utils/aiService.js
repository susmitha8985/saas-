// AI Tutor Service
// Calls the FastAPI backend (code_assistant backend) at http://localhost:8000/ask
// If the backend is not running, returns a helpful fallback message.

const API_URL = 'http://localhost:8000';

export async function askTutor({ lessonId, concept, question, code, conversation_history }) {
  try {
    const response = await fetch(`${API_URL}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonId,
        concept,
        question,
        code,
        conversation_history: conversation_history || [],
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Backend not running — return a friendly offline message
    // Once you start the FastAPI backend with your GROQ_API_KEY, this will work automatically
    console.warn('AI Tutor backend not reachable:', error.message);
    return {
      answer:
        '🔌 AI Tutor backend is not running yet.\n\n' +
        'To activate AI answers:\n' +
        '1. Go to the `code_assistant/backend` folder\n' +
        '2. Create a `.env` file with: GROQ_API_KEY=your_key_here\n' +
        '3. Run: uvicorn main:app --reload\n\n' +
        'In the meantime, you can still write and run Python code using the editor below! ▼',
    };
  }
}
