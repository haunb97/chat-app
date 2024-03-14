import { createContext, useEffect, useRef } from "react";
import { RouterProvider } from "react-router";
import { io } from "socket.io-client";
import "./App.css";
import router from "./routes";
import React, { Suspense } from "react";

export const SocketContext = createContext(null);

function App() {
  const socket = useRef();

  useEffect(() => {
    // tạo một listener duy nhất
    if (!socket.current) {
      socket.current = io("ws://localhost:3000/");
    }

    // return () => {
    //   socket.current.off(); // Xóa listener khi dọn dẹp
    // };
  }, []);

  return (
    <div className="App ">
      <Suspense fallback={() => <div>Loading...</div>}>
        <SocketContext.Provider value={{ socket }}>
          <RouterProvider router={router()} />
        </SocketContext.Provider>
      </Suspense>
    </div>
  );
}

export default App;
