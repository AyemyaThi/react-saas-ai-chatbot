import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addMessage } from "../store.js";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CardContent } from "../components/ui/CardContent";

function Chatbot() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chatbot.messages);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    dispatch(addMessage({ sender: "user", text: input }));
    setInput("");

    try {
          const response = await axios.post(
            "https://api.openai.com/v1/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: input }],
                max_tokens: 50,
            },
            {
                headers: { Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`},
                "Content-Type": "application/json",
            }
          );
        dispatch(addMessage({ sender: "bot", text: response.data.choices[0].message.content.trim() }));

    } catch (error) {
        console.error("Error fetching AI response:", error.response?.data || error.message);
    }
  };

  return (
    <Card className="w-full max-w-lg p-4">
      <CardContent>
        <div className="h-80 overflow-y-auto border p-2">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
              <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Chatbot;
