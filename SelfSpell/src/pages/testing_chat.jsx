import { useState } from 'react';
import axios from 'axios';

const ChatGPTPrompt = () => {
  const [prompt, setPrompt] = useState(""); // User input
  const [response, setResponse] = useState(""); // ChatGPT response
  const [loading, setLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent sending an empty prompt
    if (!prompt.trim()) return;

    setLoading(true); // Set loading to true while waiting for response

    try {
      const apiKey = 'KEY'; // Replace with your OpenAI API key

      // Make a request to the OpenAI chat completions endpoint
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions', // Correct API endpoint for ChatGPT
        {
          model: 'gpt-3.5-turbo', // You can use 'gpt-4' if you have access to it
          messages: [
            { role: 'system', content: "You are a helpful assistant. You are supposed to suggest hobbies to the user, based on their data. Data for chęci is kept between -1 and 1, 1 meaning user likes it a lot. You should write as if you're talking to the user directly. Respond shortly, in just 1 sentence." },
            { role: 'user', content: prompt },
          ],
          max_tokens: 50, // Limit the response length
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`, // Authorization header with API key
            'Content-Type': 'application/json',
          },
        }
      );

      // Display the response from ChatGPT
      setResponse(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching response:", error);
      // Check if the error response contains a message
      setResponse(error.response ? error.response.data.error.message : "An unexpected error occurred.");
    } finally {
      setLoading(false); // Set loading to false after the response is received
    }
  };

  return (
    <div>
      <h1>Chat with GPT</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Ask GPT'}
        </button>
      </form>

      {response && (
        <div>
          <h2>Response from GPT:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ChatGPTPrompt;
