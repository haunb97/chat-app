import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../App";
// import { useNavigate } from "react-router-dom";
// import { path } from "../../routes/path";
import UserList from "./components/UserList";
import ChatRoom from "./components/ChatRoom";

export default function Chat() {
  const [users, setUsers] = useState(["Dang hang"]);
  // const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    // tạo một listener duy nhất
    if (socket.current) {
      socket.current.on("users", (data) => {
        setUsers(data);
      });

      socket.current.on("chat", (data) => {
        const node = document.createElement("div");
        const textNode = document.createTextNode(
          `${data.userName}: ${data.message}`
        );
        node.appendChild(textNode);
        document.getElementById("messages").appendChild(node);
      });
    }

    return () => {
      socket.current.off(); // Xóa listener khi dọn dẹp
    };
  }, []);

  // useEffect(() => {
  //   if (!socket?.current?.userName) {
  //     navigate(path.login);
  //   }
  // }, [socket?.current?.userName]);

  return (
    <div className="h-screen flex bg-[url('https://npay-214706.as.r.appspot.com/npay/660_0/top-phim-hoat-hinh-3d-trung-quoc-2022-1672130007.jpg')] bg-cover">
      <UserList users={users} />
      <ChatRoom />
    </div>
  );
}
