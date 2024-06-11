import PropTypes from "prop-types";
import "./style.scss";
import InputField from "../forms/InputField/InputField";
import { useState } from "react";
import { useChatApp } from "../../hooks/useChatApp";
import { IoMdSend } from "react-icons/io";
import { Button } from "react-bootstrap";
import { IoMdAttach } from "react-icons/io";
import { useRef } from "react";
import { messageService } from "../../services/messages.service";
import moment from "moment";
// import { ModalFileUpload } from "./ModalFileUpload";

const ChatInput = ({ allowEnterSend }) => {
  const { setMessege, agentId: agent, form, setImagePreview } = useChatApp();

  const fileRef = useRef(null);
  const [rows, setRows] = useState(1);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = form;

  //const now = moment();

  // console.log(now.diff(moment().startOf("day"), "seconds"));

  //sconsole.log(moment(68426).format('h:mm:ss A'));

  const create = (form) => {
    const message = form.chat.replace(/ +(?= )/g, "");
    if (!message || message === " " || message === "") {
      reset();
      return;
    }
    // const now = moment();
    const payload = {
      // id: messages.length + 1,
      // text: message,
      sender: agent.userName,
      // timestamp: new Date().toLocaleTimeString(),
      // isOwnMessage: true,
      text: message,
      agentid: agent.agentid,
      cardno: agent.debcardno,
      //time:moment().diff(moment().startOf("day"), "seconds"),
      time: moment().unix(),
      tos: agent.tos,
    };
    try {
      messageService.post(payload);
      setMessege({
        ...payload,
        _agentId: agent.agentid,
        isOwnMessage: true,
        timestamp: payload.time,
      });
      reset({
        chat: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleSize(e) {
    const { value } = e.target;
    const hasNewlines = value.match(/\n/g);
    const isEnterKey = e.code === "Enter" || e.key === "Enter";

    if (allowEnterSend) {
      if (e.shiftKey && isEnterKey) {
        if (hasNewlines) {
          setRows((prevRows) => (prevRows >= 3 ? 3 : prevRows + 1));
        } else {
          setRows(1);
        }
      } else if (isEnterKey) {
        e.preventDefault();
        handleSubmit(create)();
      } else {
        if (hasNewlines) {
          setRows((prevRows) => (prevRows >= 3 ? 3 : prevRows + 1));
        } else {
          setRows(1);
        }
      }
    } else {
      if (hasNewlines) {
        setRows((prevRows) => (prevRows >= 3 ? 3 : prevRows + 1));
      } else {
        setRows(1);
      }
      return;
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  return (
    <>
      <form className="chat-input" onSubmit={handleSubmit(create)}>
        <InputField
          control={control}
          errors={errors}
          name="chat"
          placeholder="Input message"
          isMulti={true}
          onKeyDown={handleSize}
          rows={rows}
          onBlur={() => {
            const msg = getValues("chat");
            if (msg) {
              return;
            }
            setRows(1);
          }}
        />
        <input
          ref={fileRef}
          onChange={handleFileChange}
          type="file"
          style={{
            display: "none",
          }}
        />
        <Button
          className="me-2"
          variant="f"
          onClick={() => fileRef.current.click()}
        >
          <IoMdAttach />
        </Button>
        <button className="btn__send" type="submit">
          send <IoMdSend />
        </button>
      </form>
      {/* <ModalFileUpload /> */}
    </>
  );
};

ChatInput.propTypes = {
  allowEnterSend: PropTypes.bool,
};

export default ChatInput;
