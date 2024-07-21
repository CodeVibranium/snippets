"use client";

import { updateSnippetHelper } from "@/actions/server-actions";
import { Editor } from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import { useState } from "react";

interface SnippetEditProps {
  snippet: Snippet;
}

function SnippetEditForm({ snippet }: SnippetEditProps) {
  const [val, setVal] = useState(snippet.code);
  function handleEditorChange(value: string = "") {
    console.log("Change", value);
    setVal(value);
  }

  async function handleEdit() {
    await updateSnippetHelper(snippet.id, { title: snippet.title, code: val });
  }

  return (
    <div className="py-3">
      <h1 className="text-3xl text-bold">Editing {snippet.title} Snippet</h1>
      <Editor
        height={"40vh"}
        defaultLanguage="javascript"
        defaultValue={snippet.code}
        theme="vs-dark"
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      {/* The issue with this kind of approach is if browser has disabled JS, then this functionality wont work */}
      <button onClick={handleEdit}>Submit</button>
    </div>
  );
}

export default SnippetEditForm;
