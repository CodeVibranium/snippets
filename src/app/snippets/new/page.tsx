"use client";
import { createSnippetHelper } from "@/actions/server-actions";
import React from "react";
import { useFormState } from "react-dom";

interface InitialState {
  title?: string;
  code?: string;
  message?: string;
}

function NewSnippetPage() {
  //@ts-ignore
  const [formState, action] = useFormState<InitialState>(createSnippetHelper, {
    title: "",
    message: "",
    code: "",
  });
  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create a snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            required
            name="title"
            id="title"
            className="border rounded w-full p-2"
          />
        </div>
        {formState?.title && (
          <div>
            <p style={{ color: "red" }}>{formState.title}</p>
          </div>
        )}
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            required
            name="code"
            id="code"
            className="border rounded w-full p-2"
          />
        </div>
        {formState?.code && (
          <div>
            <p style={{ color: "red" }}>{formState.code}</p>
          </div>
        )}

        {formState?.message && (
          <div>
            <p style={{ color: "red" }}>{formState.message}</p>
          </div>
        )}
        <button type="submit" className="border rounded p-2 bg-blue-200">
          Create snippet
        </button>
      </div>
    </form>
  );
}

export default NewSnippetPage;
