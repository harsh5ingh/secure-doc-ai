import {
  LayoutDashboard,
  FileText,
  Upload,
  Sparkles,
  Settings,
  HelpCircle,
  Shield,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";

const workspace = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Documents", url: "/documents", icon: FileText },
  { title: "Upload", url: "/upload", icon: Upload },
  { title: "AI Studio", url: "/ai-studio", icon: Sparkles, soon: true },
];

const general = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help & docs", url: "/help", icon: HelpCircle },
];

function NavItem({
  item,
  active,
  onNavigate,
  index,
  collapsed,
}) {
  const Icon = item.icon;

  return (
    <button
      onClick={() => onNavigate?.(item.url)}
      style={{ animationDelay: `${index * 40}ms` }}
      className={cn(
        "animate-fade-up flex w-full items-center rounded-lg py-2 text-sm transition-all duration-200",
        collapsed
          ? "justify-center px-0"
          : "gap-3 px-3",
        active
          ? "bg-sidebar-accent text-foreground shadow-[inset_0_0_0_1px_oklch(0.62_0.22_274/0.4)]"
          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0",
          active && "text-primary"
        )}
      />

      {!collapsed && (
        <span className="flex-1 text-left">
          {item.title}
        </span>
      )}

      {!collapsed && item.soon && (
        <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-primary">
          Soon
        </span>
      )}
    </button>
  );
}

export function AppSidebar({
  currentPath = "/dashboard",
  onNavigate,
  user = null,
  onLogout,
  collapsed = false,
}) {
  const displayName =
    user?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const email = user?.email || "";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside
  className={`hidden lg:flex h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar sticky top-0 transition-all duration-300 ${
    collapsed ? "w-[72px]" : "w-64"
  }`}
>
      {/* Logo */}
      <div className="h-[60px] border-b border-sidebar-border flex items-center justify-center px-3">
  <div className="flex items-center gap-3">
    <div className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-primary)]">
      <Shield className="h-4 w-4 text-primary-foreground" />
    </div>

    {!collapsed && (
      <div>
        <p className="text-sm font-semibold">
          Secure Doc AI
        </p>
        <p className="text-[10px] text-muted-foreground">
          Document intelligence
        </p>
      </div>
    )}
  </div>
</div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="mb-6">
          {!collapsed && (
            <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Workspace
            </p>
          )}

          <div className="space-y-1">
            {workspace.map((item, index) => (
              <NavItem
                key={item.title}
                item={item}
                index={index}
                active={currentPath === item.url}
                onNavigate={onNavigate}
                collapsed={collapsed}
              />
            ))}
          </div>
        </div>

        <div>
          {!collapsed && (
            <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              General
            </p>
          )}

          <div className="space-y-1">
            {general.map((item, index) => (
              <NavItem
                key={item.title}
                item={item}
                index={index}
                active={currentPath === item.url}
                onNavigate={onNavigate}
                collapsed={collapsed}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Upgrade Card */}
      {!collapsed && (
        <div className="m-3 rounded-xl border border-sidebar-border bg-[image:var(--gradient-surface)] p-4">
          <div className="inline-flex items-center gap-1 rounded-md bg-primary/15 px-2 py-1 text-[10px] font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            PRO
          </div>

          <p className="mt-3 text-sm font-medium">
            Unlock AI chat & semantic search
          </p>

          <button className="mt-3 w-full rounded-md bg-[image:var(--gradient-primary)] px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90">
            Upgrade Plan
          </button>
        </div>
      )}

      {/* User */}
<div className="border-t border-sidebar-border p-3">
  <button
    onClick={onLogout}
    className={cn(
      "mb-2 flex items-center rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
      collapsed ? "justify-center w-full" : "gap-3 w-full"
    )}
  >
    <LogOut className="h-4 w-4" />
    {!collapsed && "Logout"}
  </button>

  <div
    className={cn(
      "px-3 py-2 flex items-center",
      collapsed ? "justify-center" : "gap-3"
    )}
  >
    <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-xs font-semibold">
      {initials || "U"}
    </div>

    {!collapsed && (
      <div className="min-w-0">
        <p className="truncate text-xs font-medium">
          {displayName}
        </p>

        <p className="truncate text-[10px] text-muted-foreground">
          {email}
        </p>
      </div>
    )}
  </div>
</div>
    </aside>
  );
}

export default AppSidebar;