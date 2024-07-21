import { db } from "@/db";
import { redirect } from "next/navigation";
import React from "react";

function NewSnippetPage() {
  async function createSnippet(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    redirect("/"); // redirect works in server, so we cant use router.push()
  }
  return (
    <form action={createSnippet}>
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
        <button type="submit" className="border rounded p-2 bg-blue-200">
          Create snippet
        </button>
      </div>
    </form>
  );
}

export default NewSnippetPage;
