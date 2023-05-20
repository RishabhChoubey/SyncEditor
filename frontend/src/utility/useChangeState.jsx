import React, { useEffect } from 'react'

function useChangeState(quill,socket,documentId,user,participant) {
    
    useEffect(() => {
        if (quill == null || socket == null) return;
        const handler = (delta, oldDelta, source) => {
          if (source !== "user") return;
          socket.emit("send-changes", delta);
        };
        quill.on("text-change", handler);
    
        return () => {
          quill.off("text-change", handler);
        };
      }, [quill, socket]);
    
  
      useEffect(() => {
        if (quill == null || socket == null) return;
        const handler = (delta) => {
          console.log("data update");
          quill.updateContents(delta);
          quill.focus();
        };
        socket.on("receive-changes", handler);
    
        return () => {
          socket.off("receive-changes", handler);
        };
      }, [quill, socket]);
    

    
      useEffect(() => {
        if (quill == null || socket == null) return;
    
        socket.on("load-documents", (response) => {
          console.log(document, "datatata");
          if (response.error) {
            console.log(response.error);
            navigate("/create");
          }
          quill.setContents(response.document);
          quill.enable();
        });
    
        socket.emit("get-documents", { documentId, user, participant });
      }, [socket, quill, documentId, user]);
    

    
      useEffect(() => {
        if (quill == null || socket == null) return;
    
        const interval = setInterval(() => {
          socket.emit("save-documents", quill.getContents());
        }, 2000);
    
        return () => {
          clearInterval(interval);
        };
      }, [socket, quill, documentId]);
}

export default useChangeState