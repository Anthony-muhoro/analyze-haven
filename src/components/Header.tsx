import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SidebarTrigger } from "./ui/sidebar";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <SidebarTrigger />
        <h2 className="text-lg font-semibold">Decision Support System</h2>
        <div className="ml-auto">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}