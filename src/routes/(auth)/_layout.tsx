import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_layout")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b backdrop-blur">
        <div className="container mx-auto flex min-h-14 items-center gap-x-4 px-4">
          <a className="me-auto py-2 text-2xl font-bold sm:text-3xl">
            Kiosk App
          </a>
          <Link to="/login" className="[&.active]:hidden">
            Login
          </Link>

          <DarkModeToggle />
        </div>
      </header>

      <Outlet />
    </>
  );
}
