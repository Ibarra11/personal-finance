import React, { useEffect } from "react";

const setScrollbarWidthAsCSSVariable = () => {
  // Create a temporary div element to measure scrollbar width
  const scrollDiv = document.createElement("div");

  // Apply styles to ensure the element has a scrollbar
  scrollDiv.style.width = "100px";
  scrollDiv.style.height = "100px";
  scrollDiv.style.overflowY = "scroll";
  scrollDiv.style.position = "absolute";
  scrollDiv.style.top = "-9999px";

  // Append the div to the body to render it
  document.body.appendChild(scrollDiv);

  // Calculate the scrollbar width
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  // Clean up by removing the temporary element
  document.body.removeChild(scrollDiv);

  // Set the scrollbar width as a global CSS variable
  document.documentElement.style.setProperty(
    "--scrollbar-width",
    `${scrollbarWidth}px`,
  );
};

const useScrollBar = () => {
  useEffect(() => {
    setScrollbarWidthAsCSSVariable();
  }, []);

  return null;
};

export default useScrollBar;
