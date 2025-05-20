import React from "react";

const MainLayout = ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>InnerSpark - Sign In</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap" rel="stylesheet" />
      <link href="/output.css" rel="stylesheet"/>
    </head>
    <body className="antialiased font-cascadia">
      <main className="min-h-screen">{children}</main>
    </body>
  </html>
);

export default MainLayout;
