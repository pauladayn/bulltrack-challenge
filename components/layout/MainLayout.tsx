import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import OnboardingModal from "@/components/layout/OnboardingModal";

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
        <main className="flex-1 ml-[281px] mt-[88px]">
          <div className="bg-bg-secondary min-h-[calc(100vh-88px)] rounded-tl-[40px] p-8">
            {children}
          </div>
        </main>
        <OnboardingModal />
      </div>
    </div>
  );
}