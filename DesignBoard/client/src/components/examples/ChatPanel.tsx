import { useState } from "react";
import ChatPanel from "../ChatPanel";

export default function ChatPanelExample() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant" as const,
      content: "안녕하세요! 무엇을 도와드릴까요?",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "2",
      role: "user" as const,
      content: "React 컴포넌트를 만들어주세요",
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: "3",
      role: "assistant" as const,
      content: "네, React 컴포넌트를 만들어드리겠습니다. 어떤 기능이 필요하신가요?",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: String(messages.length + 1),
      role: "user" as const,
      content: message,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);

    setTimeout(() => {
      const aiResponse = {
        id: String(messages.length + 2),
        role: "assistant" as const,
        content: "메시지를 받았습니다: " + message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-screen">
      <ChatPanel messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
}
