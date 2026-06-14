import AppSidebar from "./AppSidebar";
import { TopBar } from "./TopBar";

export function DashboardLayout({ children, currentPath, onNavigate, user, onSearch, onLogout }) {
  return (
    <div className="dark min-h-screen w-full bg-background text-foreground flex">
      <AppSidebar currentPath={currentPath} onNavigate={onNavigate} user={user} onLogout={onLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar user={user} onSearch={onSearch} />
        <main className="flex-1 p-4 sm:p-6 lg:p-10 w-full">
          <div className="max-w-[1400px] w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
