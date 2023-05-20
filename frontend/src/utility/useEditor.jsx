import React, { useState, useEffect, useCallback } from "react";
import Quill from "quill"


const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ];

export default function useEditor(setquill) {
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;
    
        wrapper.innerHTML = "";
        const editor = document.createElement("div");
    
        wrapper.append(editor);
        var q = new Quill(editor, {
          modules: { toolbar: TOOLBAR_OPTIONS },
          theme: "snow",
        });
        q.disable();
        q.setText("Loading...");
        setquill(q);
      }, []);

      return wrapperRef
}


