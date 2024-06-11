import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { forwardRef } from "react";
import moment from "moment/moment";

const ChatBubble = forwardRef(function ChatBubble(
  { id, isOwnMessage, sender, text, timestamp, avatar },
  ref
) {
  return (
    <div
      key={id}
      ref={ref}
      className={`message ${isOwnMessage ? "own-message" : "other-message"}`}
    >
      {!isOwnMessage && <div className="avatar">{sender?.[0]}</div>}
      <div
        className={["message-content", `${!isOwnMessage && "receiver"}`].join(
          " "
        )}
      >
        <div className="sender-name">{sender}</div>
        <div className="message-text">{text}</div>
        <div className="message-info">
          <div className="timestamp">
            {moment(Number(timestamp)).format("HH:mm A")}
          </div>
        </div>
      </div>
      {isOwnMessage && <div className="avatar">{avatar}</div>}
    </div>
  );
});

ChatBubble.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.string,
  sender: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  timestamp: PropTypes.any,
  isOwnMessage: PropTypes.bool,
  avatar: PropTypes.string,
};

export default ChatBubble;
