import React from "react";
import "./globals.css";

export const metadata = {
  title: "Hemit Patel Portfolio",
  description: "My personal portfolio",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
