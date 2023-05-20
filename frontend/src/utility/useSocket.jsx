import React, { useEffect } from 'react'
import socketio from "socket.io-client";

function useSocket(setsocket) {

    useEffect(() => {
        const s = socketio.connect( import.meta.env.VITE_APP_URL, {
          transports: ["websocket"],
        
        });
    
        setsocket(s);
    
        return () => {
          console.log("disconnected");
          s.disconnect();
        };
      }, []);

}

export default useSocket