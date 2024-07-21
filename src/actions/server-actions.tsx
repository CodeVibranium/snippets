"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";
export async function updateSnippetHelper(
  id: number,
  data: { title: string; code: string }
) {
  try {
    const res = await db.snippet.update({ where: { id }, data });
    console.log("res->", res);
  } catch (error) {
    console.log(error);
    // Handle error if needed
  } finally {
    // Ensure redirect is called in both success and error cases
    redirect("/");
  }
}

export async function deleteSnippetHelper(id: number) {
  let navigate = false;
  try {
    const res = await db.snippet.delete({ where: { id } });
    navigate = true;
  } catch (error) {
    console.log(error);
  } finally {
    if (navigate) {
      redirect("/");
    }
  }
}
