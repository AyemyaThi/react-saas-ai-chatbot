import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addMessage } from "../store.js";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CardContent } from "../components/ui/CardContent";

function Chatbot() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chatbot.messages);
  const [input, setInput] = useState("");
  const [isClient, setIsClient] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Prevent hydration mismatch

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sendMessage = async () => {
    if (!input) return;
    dispatch(addMessage({ sender: "user", text: input }));
    setInput("");

    try {
        setIsLoading(true);
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent",
            {
                contents: [{ parts: [{ text: input }] }],
            },
            {
                headers: { "Content-Type": "application/json" },
                params: { key: import.meta.env.VITE_GEMINI_API_KEY },
            }
        );
        const aiRes = response.data.candidates[0].content.parts[0].text || "No response from AI";
        // const formattedRes = aiRes.split("\n").map((line, index) => (
        //     <dl key={index} className="p-1">{line}</dl>
        // ))
        dispatch(addMessage({ sender: "bot", text: aiRes }));
    } catch (error) {
        console.error("Error fetching AI response:", error.response?.data || error.message);
        dispatch(addMessage({ sender: "bot", text: null }));
    } finally {
        setIsLoading(false);
    }
  };

  if (!isClient) return null; // Prevents hydration error

  if (!user) {
    return <p className="text-center text-gray-700">User not authenticated. Please log in.</p>;
  }

  return (
    <div suppressHydrationWarning>
        <h1 className="text-2xl font-bold mb-4"> AI Chatbot</h1>
        <Card className="w-full max-w-lg p-4">
            <CardContent>
                <div className="h-80 overflow-y-auto border p-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    <strong>{msg.sender === "user" ? "You" : "AI"}:</strong>
                    {msg.sender === "bot" ? (
                        <div className="list-disc pl-4">
                            {msg.text.split("\n").map((line, index) => (
                            <dl key={index} className="p-1">{line}</dl>
                            ))}
                        </div>
                    ) : (
                        <p>{msg.text}</p>
                    )}
                    </div>
                ))}
                </div>
                <div className="mt-2 flex gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
                <Button onClick={sendMessage}>Send</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}

export default Chatbot;
