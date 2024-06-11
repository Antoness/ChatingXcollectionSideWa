import { createContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useEffect } from "react";
// import MessageService from "../../services/messages.service";
import { useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { chatValidation } from "../../validations/chatValidation";
import { messageService } from "../../services/messages.service";
//import moment from "moment";
export const ChatAppContexts = createContext(null);
// import skletonloader
import SkeletonLoader from "../../components/skleton/SkeletonLoader";

// eslint-disable-next-line react/prop-types
const ChatAppContext = ({ children }) => {
  const [enabled, setEnabled] = useState(true);
  const [state, setState] = useState({
    messages: [],
    imagePreview: null,
  });
  const [agentid, setAgentId] = useState({
    tos: "",
    debcardno: "",
    agentid: "",
    userName: "",
  });

  const bubbleRef = useRef(null);

  const form = useForm({
    defaultValues: {
      chat: "",
    },
    resolver: yupResolver(chatValidation),
  });

  const { isFetching } = useQuery({
    queryKey: ["messages", agentid],
    queryFn: async () => {
      const { data } = await messageService.find({
        agentid: agentid.agentid,
        deb_cardno: agentid.debcardno,
      });

      const newres = data.data.map((r) => ({
        ...r,
        text: r.body,
        sender: r.isOwnMessage
          ? r.sender || agentid.debcardno
          : agentid.debcardno,
      }));

      const userName = newres.filter(
        (u) => u.debcardno === agentid?.debcardno
      )[0];

      setAgentId((p) => ({ ...p, userName:userName?.sender }));
      // const { data } = await service.find();
      // const newRes = data.map((r) => ({
      //   id: r.id,
      //   text: r.body,
      //   sender: Number(r.id) % 2 === 0 ? "Alice" : "User1",
      //   timestamp: moment().unix(),
      //   isOwnMessage: Number(r.id) % 2 === 0 ? false : true,
      // }));
      setState((prev) => ({
        ...prev,
        messages: newres,
      }));
      setEnabled(false);
    },
    enabled: enabled,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setAgentId({
      agentid: urlParams.get("agentid"),
      debcardno: urlParams.get("debcardno"),
      tos: urlParams.get("tos"),
    });
  }, []);

  useEffect(() => {
    if (bubbleRef.current) {
      bubbleRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [state.messages.length, isFetching]);

  return (
    <ChatAppContexts.Provider
      value={[state, setState, form, agentid, bubbleRef]}
    >
      {/* {isFetching ? <div>Loading...</div> : children} */}
      {isFetching ? <SkeletonLoader /> : children}
    </ChatAppContexts.Provider>
  );
};

export default ChatAppContext;
