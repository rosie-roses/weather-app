import type { PropsWithChildren } from "react";
import Header from "./header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t bg-background/30 backdrop-blur-md py-12">
        <div className="container mx-auto px-4 text-center text-gray-200">
          <p>
            Made by{" "}
            <a href="https://github.com/rosie-roses/weathrly" target="_blank">
              rosie-roses 🌹
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
