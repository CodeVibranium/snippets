import { updateSnippetHelper } from "@/actions/server-actions";
import SnippetEditForm from "@/components/SnippetEditForm";
import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";

interface SnippetsEditPageProps {
  params: {
    id: string;
  };
}
async function EditSnippetPage(props: SnippetsEditPageProps) {
  const snippet = await db.snippet.findUnique({
    where: { id: parseInt(props.params.id) },
  });

  if (!snippet) {
    return notFound();
  }

  return <SnippetEditForm snippet={snippet} />;
}

export default EditSnippetPage;
