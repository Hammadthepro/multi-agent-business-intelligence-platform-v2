import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="mt-6 bg-[image:var(--gradient-primary)] text-primary-foreground hover:opacity-90">
        <Link to="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  );
}
