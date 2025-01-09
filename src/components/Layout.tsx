import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <SidebarTrigger className="mb-6" />
            <div className="animate-fade-up">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}