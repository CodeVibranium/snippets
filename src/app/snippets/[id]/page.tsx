import { db } from "@/db";
import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { deleteSnippetHelper } from "@/actions/server-actions";
interface SnippetPageProps {
  params: {
    id: string;
  };
}
interface Snippet {
  id: number;
  title: string;
  code: string;
}
type SnippetOrNull = Snippet | null;

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany({ select: { id: true } });
  return snippets.map((snippet) => ({ id: snippet.id.toString() }));
}

async function SnippetPage(props: SnippetPageProps) {
  await new Promise((res, rej) => {
    setTimeout(() => {
      res("Hello");
    }, 2000);
  });

  const snippet: SnippetOrNull = await db.snippet.findUnique({
    where: { id: parseInt(props.params.id) },
  });

  if (!snippet) return notFound();

  const handleDeleteSnippet = deleteSnippetHelper.bind(null, snippet.id);

  return (
    <main className="p-3">
      <div>
        <h1 className="text-3xl bold py-2">{snippet.title}</h1>
        <Link href={`${snippet.id}/edit`}>Edit Snippet</Link>

        <form action={handleDeleteSnippet}>
          <button type="submit">Delete Snippet</button>
        </form>
        <pre className="p-3 border rounded bg-gray-200 border-gray-200">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </main>
  );
}

export default SnippetPage;
