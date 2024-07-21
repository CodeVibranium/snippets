import React from "react";

function SnippetNotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className="text-xl bold">
        Sorry, We could not find the snippet you were looking for, Wanna raise a
        request, feel free..
      </h1>
    </div>
  );
}

export default SnippetNotFound;
