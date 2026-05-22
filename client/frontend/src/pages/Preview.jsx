import React, { useEffect, useRef, useState } from "react";
import { useWebsite } from "../Context/WebsiteContext";

function Preview() {

  const { websiteData } = useWebsite();

  const [html, setHtml] = useState("");

  const previewRef = useRef(null);

  // Load AI Generated Website

  useEffect(() => {

    if (websiteData) {
      setHtml(websiteData);
    }

  }, [websiteData]);

  // Editable Tags

  const editableTags = [
    "H1",
    "H2",
    "H3",
    "P",
    "SPAN",
    "BUTTON",
    "A"
  ];

  // Handle Editing

  const handleClick = (e) => {

    e.preventDefault();

    const element = e.target;

   
    // IMAGE EDIT
   

    if (element.tagName === "IMG") {

      const newUrl = prompt("Enter New Image URL");

      if (newUrl) {

        element.src = newUrl;

        setHtml(previewRef.current.innerHTML);

      }

      return;
    }

   
    // TEXT EDIT
   

    if (editableTags.includes(element.tagName)) {
      element.contentEditable = true;
      element.focus();
      // Editing Style
      element.style.outline = "2px solid blue";
      element.style.cursor = "text";
      // Prevent Button Click
      if (
        element.tagName === "BUTTON" ||
        element.tagName === "A"
      ) {
        element.style.pointerEvents = "none";
      }
      // Save Changes
      element.onblur = () => {
        element.contentEditable = false;
        element.style.outline = "none";
        element.style.pointerEvents = "auto";
        // Save Updated HTML
        setHtml(previewRef.current.innerHTML);
      };
    }
  };

  
  // EXPORT WEBSITE

  const exportWebsite = () => {

    const fullHtml = `
    <!DOCTYPE html>

    <html lang="en">

    <head>

      <meta charset="UTF-8" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />

      <title>My Website</title>

      <!-- Tailwind CSS -->

      <script src="https://cdn.tailwindcss.com"></script>

    </head>

    <body>

      ${html}

    </body>

    </html>
    `;

    // Create HTML File

    const blob = new Blob(
      [fullHtml],
      { type: "text/html" }
    );

    // Create Download URL

    const url = URL.createObjectURL(blob);

    // Create Anchor

    const a = document.createElement("a");

    a.href = url;

    a.download = "website.html";

    // Trigger Download

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    // Cleanup

    URL.revokeObjectURL(url);

  };

  return (
<div className="relative min-h-screen bg-gray-100">

  <div className="fixed top-4 right-4 z-[99999999]">
    <button
      onClick={exportWebsite}
      className="
        bg-black
        text-white
        px-5
        py-2
        rounded-lg
        font-semibold
        shadow-lg
        hover:scale-105
        transition
        duration-300
      "
    >
      Download Website
    </button>
  </div>

  {/* WEBSITE PREVIEW */}
  <div
    ref={previewRef}
    onClick={handleClick}
    dangerouslySetInnerHTML={{ __html: html }}
    className="min-h-screen bg-white"
  />

</div>

  );
}

export default Preview;