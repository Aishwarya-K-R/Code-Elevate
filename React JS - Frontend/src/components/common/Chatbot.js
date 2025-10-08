import React, { useState } from 'react';
import API from '../api_config/api';

function Chatbot() {
  const [form, setForm] = useState({ question: "" });
  const [answer, setAnswer] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const chatbotHandler = async () => {
    try {
      const res = await API.post('/chat', { ...form });
      setAnswer(res.data);
      setShowResponse(true);
    } catch (err) {
      alert(err.response?.data || "Something went wrong");
    }
  };

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-5">
      <h1 className="text-3xl font-bold mb-4 text-center">Chat Assistant</h1>
      <h2 className="text-center mb-6">
        Welcome to Charlie Pet Shop !! <br />
        I'm your chat assistant. How can I help you?
      </h2>

      <textarea
        name="question"
        placeholder="Enter your question..."
        value={form.question}
        onChange={changeHandler}
        className="w-full max-w-lg h-32 p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>

      <div className="flex gap-3 mb-6">
        <button
          onClick={chatbotHandler}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
        <button
          onClick={() => { setAnswer(""); setShowResponse(false); }}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        >
          Clear Response
        </button>
      </div>

      {showResponse && (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg">
          <h3 className="font-semibold mb-2 text-center">Here's the response:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
