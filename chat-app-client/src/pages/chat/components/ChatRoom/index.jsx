import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "root/App";

export default function ChatRoom() {
  const [message, setMessage] = useState();
  const [currentUser, setCurrentUser] = useState("");
  const [usersTyping, setUsersTyping] = useState([]);
  // const SocketContext = {};

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    // tạo một listener duy nhất
    if (socket.current) {
      socket.current.on("typing", (data) => {
        setUsersTyping((prev) => [...prev, data]);
      });

      socket.current.on("remove-typing", (data) => {
        setUsersTyping((prev) => {
          return prev.filter((item) => item !== data);
        });
      });
    }

    return () => {
      socket.current.off(); // Xóa listener khi dọn dẹp
    };
  }, []);

  const handleChangeMessage = (e) => {
    setMessage(e?.target?.value);
  };

  const handleSendMessage = () => {
    socket.current.emit("chat", message);
    setMessage("");
  };

  const handleSendLogoutUser = () => {
    socket.current.emit("logout-user", currentUser);
    setCurrentUser();
  };

  const handleFocus = () => {
    socket.current.emit("typing");
  };

  const handleBlur = () => {
    socket.current.emit("remove-typing");
  };

  const handleEnterInput = (e) => {
    if (e.keyCode === 13) {
      handleSendMessage();
    }
  };
  return (
    <>
      <div className="flex w-3/4">
        <div className="h-14 bg-red-500 fixed top-0 right-0 w-3/4">
          userName
        </div>
        <div className="bg-green-500 w-full">
          <div className="text-gray-300 font-thin text-sm">
            {Array.isArray(usersTyping) && usersTyping.length > 0 ? (
              <>
                {usersTyping.length >= 3
                  ? usersTyping.slice(0, 2).join(", ") + " and other is typing"
                  : usersTyping.join(",") + " is typing"}
              </>
            ) : (
              <></>
            )}
          </div>
          <div id="messages"></div>
          <div className="absolute bottom-0 right-0 bg-black w-3/4 py-3">
            <input
              type="text"
              value={message}
              onChange={handleChangeMessage}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="bg-gray-300 rounded-md px-2 py-1 w-3/4"
              onKeyUp={handleEnterInput}
            />
            <button
              onClick={handleSendMessage}
              className="bg-purple-400 rounded-sm mx-2 px-3 py-1 "
            >
              Send
            </button>
            <button
              onClick={handleSendLogoutUser}
              className="bg-red-400 rounded-sm mx-2 px-2 py-1"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
