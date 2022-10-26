import React, { useContext } from "react";
import MessagesContext from "../Contexts/DataContext";

const Messages = () => {
  const { messages, setMessages } = useContext(MessagesContext);

  const closeMsg = (id) => {
    setMessages((prevMessages) => prevMessages.filter((m) => m.id !== id));
  };

  if (messages?.length === 0) {
    return null;
  }

  return (
    <div className="msg-bin">
      {messages.map((m) => (
        <div key={m.id} className="toast show" role="alert">
          <div className="toast-header">
            <strong className="me-auto">Siuvykla</strong>
            <button
              onClick={() => closeMsg(m.id)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="toast-body">{m.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
