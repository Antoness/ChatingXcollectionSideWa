import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import ChatBubble from "../ChatBubble/ChatBubble";
import { useChatApp } from "../../hooks/useChatApp";

const ChatContent = ({ messages }) => {
  const { bubbleRef } = useChatApp();
  return (
    <div className="message-list">
      {messages.map((message, idx) => (
        <ChatBubble
          ref={bubbleRef}
          key={ idx}
          id={message.id}
          isOwnMessage={message.isOwnMessage}
          sender={message.sender}
          text={message.text}
          timestamp={message.timestamp}
          avatar={message.sender?.[0]}
        />
      ))}
    </div>
  );
};

ChatContent.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string,
      sender: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      timestamp: PropTypes.any,
      isOwnMessage: PropTypes.bool,
    })
  ),
};

export default ChatContent;
