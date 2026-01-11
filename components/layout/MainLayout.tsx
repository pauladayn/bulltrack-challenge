import { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import OnboardingModal from "./OnboardingModal";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-sidebar">
      {/* Header */}
      <Header />

      {/* Main container */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Content area */}
        <main className="fixed top-[88px] left-[281px] w-[calc(100vw-281px)] h-[calc(100vh-88px)] overflow-y-auto overflow-x-hidden">
          <div className="bg-bg-secondary min-h-full rounded-tl-[40px] py-6 px-8">
            {children}
          </div>
        </main>

        <OnboardingModal />
      </div>
    </div>
  );
}
