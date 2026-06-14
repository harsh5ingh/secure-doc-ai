import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";

export function AuthField({ icon: Icon, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="relative">
      {Icon && (
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      )}
      <input
        {...props}
        type={isPassword && show ? "text" : type}
        className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}

export function AuthSubmit({ children, loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[image:var(--gradient-primary)] text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95 disabled:opacity-60 transition-all"
    >
      {loading ? "Please wait…" : (<>{children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>)}
    </button>
  );
}

export { Mail, Lock, User };
