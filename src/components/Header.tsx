import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div>
      <nav className="flex justify-between items-center">
        <Link href={"/"}>Snippets App</Link>
        <div className="flex gap-5">
          <Link href={"/"}>All Snippets</Link>
          <Link href={"/snippets/new"}>Create New</Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
