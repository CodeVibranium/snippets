"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
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
    revalidatePath(`/snippets/${id}`);
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
      revalidatePath("/");
      redirect("/");
    }
  }
}

export async function createSnippetHelper(
  formState: { message: string },
  formData: FormData
) {
  let navigate = false;
  try {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    let errors: { title?: string; code?: string } = {};
    if (!title || title.length < 3) {
      errors.title = "Title is required and should have minium of 3 chars ";
    }

    if (!code) {
      errors.code = "Code is required";
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
    // throw new Error("Oops, Failed to created a record, Please Try again later");
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    navigate = true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return { message: "Something went wrong" };
    }
  } finally {
    if (navigate) {
      revalidatePath("/");
      redirect("/");
    }
  }
}
