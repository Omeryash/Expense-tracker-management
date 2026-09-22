import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className="ml-72 mt-16 p-8">
        <div className="max-w-7xl mx-auto animate-fadeIn">{children}</div>
      </main>
    </div>
  );
};
