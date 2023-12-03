import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-full items-center justify-center bg-gradient-login">
      {children}
    </main>
  );
};

export default layout;
