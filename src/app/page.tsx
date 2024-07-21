import { db } from "@/db";
import Image from "next/image";
import Link from "next/link";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

export default async function Home() {
  const snippets = await db.snippet.findMany({});
  return (
    <>
      <div className="flex justify-between py-2 bordered rounded">
        <h1>Snippets</h1>
        <Link href={"/snippets/new"}>New</Link>
      </div>
      <div className="pt02">
        {snippets.map((snippet) => (
          <>
            <div className="flex justify-between p-1">
              <h1>{snippet.title}</h1>
              <Link href={`/snippets/${snippet.id}`} className="cursor-pointer">
                View
              </Link>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
