import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { path } from "../../routes/path";

export default function Login() {
  const [registerUser, setRegisterUser] = useState();
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    // tạo một listener duy nhất
    if (socket.current) {
      socket.current.on("register-error", () => {
        alert("Tên này đã được sử dụng!");
      });

      socket.current.on("register-success", (userName) => {
        socket.current.userName = userName;
        alert("Đăng ký thành công!");
        navigate(path.chat);
      });
    }

    return () => {
      socket.current.off(); // Xóa listener khi dọn dẹp
    };
  }, []);

  const handleChangeRegisterUser = (e) => {
    console.log("🔥 - handleChangeRegisterUser - e:", e);
    // if (e) { }
    setRegisterUser(e?.target?.value);
  };

  const handleEnterInput = (e) => {
    if (e.keyCode === 13) {
      handleSendRegisterUser();
    }
  };

  const handleSendRegisterUser = () => {
    socket.current.emit("register-user", registerUser);
  };

  return (
    <div className="bg-[url('https://api.wallpapers.ai/static/downloads/51abf1da4270487aa540a8f4453200d8/upscaled/000000_417498933_kdpmpp2m15_PS7.5__._digital_art_concept_art_[upscaled].jpg')] bg-cover h-screen bg-slate-300">
      <main>
        <div className="app-container relative h-screen">
          <div className="content absolute left-36 bottom-1/4">
            <section>
              <input
                type="text"
                className="rounded-md px-2 py-1"
                value={registerUser}
                onChange={handleChangeRegisterUser}
                onKeyUp={handleEnterInput}
              />
              <button
                onClick={handleSendRegisterUser}
                className="bg-purple-500 mx-2 px-2 py-1 rounded-md hover:bg-purple-400 text-white outline-none"
              >
                Join now
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
