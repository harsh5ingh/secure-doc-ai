import { Search, Bell, Sun, Moon, PanelLeft } from "lucide-react";
import { useState } from "react";

export function TopBar({
  user = { name: "User", email: "user@example.com" },
  onSearch,
  onToggleSidebar,
  notifications = [],
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

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    const newDark = !darkMode;

    setDarkMode(newDark);

    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const [showNotifications, setShowNotifications] =
  useState(false);

  return (
    <header className="sticky top-0 z-30 h-[60px] border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="flex h-full items-center gap-3 px-4 sm:px-6">
        
        {/* Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="h-4 w-4" />
        </button>

        {/* Search */}
        <div className="relative flex-1 max-w-2xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search documents, content, or AI prompts..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-16 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />

          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            ⌘ K
          </kbd>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
  <button
    onClick={() =>
      setShowNotifications(
        !showNotifications
      )
    }
    className="relative grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors"
  >
    <Bell className="h-4 w-4" />

    {notifications.length > 0 && (
      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
        {notifications.length}
      </span>
    )}
  </button>

  {showNotifications && (
    <div className="absolute right-0 mt-2 w-80 rounded-xl border border-border bg-card shadow-xl z-50 overflow-hidden">
      
      <div className="border-b border-border px-4 py-3">
        <h3 className="font-medium">
          Notifications
        </h3>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground">
            No notifications
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className="border-b border-border px-4 py-3"
            >
              <p className="text-sm">
                {item.message}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {item.time}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )}
</div>

        {/* User Profile */}
        <button className="flex items-center gap-2.5 rounded-full border border-border bg-card pl-1 pr-3 py-1 hover:bg-muted/60 transition-colors">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-[10px] font-semibold text-primary-foreground">
            {initials}
          </div>

          <div className="hidden md:flex flex-col leading-tight text-left">
            <span className="text-xs font-medium">
              {displayName}
            </span>

            <span className="text-[10px] text-muted-foreground">
              {email}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
}