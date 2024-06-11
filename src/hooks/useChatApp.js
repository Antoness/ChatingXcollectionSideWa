import { useContext } from "react";
import { ChatAppContexts } from "../providers/ChatAppProvider/ChatAppProvider";

export const useChatApp = () => {
  const [state, setState, form, agentId, bubbleRef] =
    useContext(ChatAppContexts);

  const setMessege = (message) => {
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  };

  const setImagePreview = (url) => {
    setState((prev) => ({ ...prev, imagePreview: url }));
  };
  return {
    messages: state.messages,
    imagePreview: state.imagePreview,
    setMessege,
    setImagePreview,
    form,
    agentId,
    bubbleRef,
  };
};
