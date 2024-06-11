import React, { useState } from "react";
// import MessageList from '../../MessageList';
// import ChatInput from './ChatInput';
import "./ChatApp.css";
import { useEffect } from "react";
import ChatInput from "../ChatInput/ChatInput";
import { useChatApp } from "../../hooks/useChatApp";
import ChatContent from "../ChatContent/ChatContent";

const ChatApp = () => {
  // const [phone,setPhone]=useState('')
  // const [messages, setMessages] = useState(chatMocks);
  const { messages } = useChatApp();

  const [param, setParams] = useState({
    tos: "",
    debcardno: "",
    agentid: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setParams({
      tos: urlParams.get("tos"),
      debcardno: urlParams.get("debcardno"),
      agentid: urlParams.get("agentid"),
    });
  }, []);

  // const handleSendMessage = (text, sender) => {
  //   const newMessage = {
  //     id: messages.length + 1,
  //     text,
  //     sender,
  //     timestamp: new Date().toLocaleTimeString(),
  //     isOwnMessage: true,
  //   };
  //   setMessages([...messages, newMessage]);
  // };

  // eslint-disable-next-line no-unused-vars
  const handleSendMessage = async (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
      isOwnMessage: true,
    };
    // eslint-disable-next-line no-undef
    setMessages([...messages, newMessage]);

    const url = `https://dev.dikahadir.com/collectui/mobile_sendchat/?text=${encodeURIComponent(
      text
    )}&agentid=${param.agentid}&tos=${param.tos}&cardno=${param.debcardno}`;

    // data to send
    //  const data = {
    //   phone: param.tos,
    //   debcardno : param.debcardno,
    //   agentid : param.agentid,
    //   text,
    //   sender: param.agentid,
    //   timestamp: new Date().toISOString(),
    //  };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //body:JSON.stringify(newMessage),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Message inserted successfully:", result);
    } catch (error) {
      console.error("Error inserting message:", error);
    }
  };

  return (
    <div className="chat-app">
      <ChatContent messages={messages} />
      <ChatInput />
    </div>
  );
};

export default ChatApp;
