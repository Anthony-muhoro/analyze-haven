import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/upload":
      return "Upload Data";
    case "/tables":
      return "Data Tables";
    case "/analysis":
      return "Analysis";
    case "/settings":
      return "Settings";
    default:
      return "Not Found";
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentPage = getPageTitle(location.pathname);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <div className="px-6 py-4 border-b">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <main className="p-6">
            <div className="animate-fade-up">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}