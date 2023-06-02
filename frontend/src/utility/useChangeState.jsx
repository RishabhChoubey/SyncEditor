import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useChangeState(quill, socket, documentId, user, participant) {
  const navigate = useNavigate();
  useEffect(() => {
    if (quill == null || socket == null) return;
    const handler = (delta, oldDelta, source) => {
      console.log(delta, source);
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
        navigate("/");
        alert("Your are not allowed in this doc");
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

export default useChangeState;
