import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center px-4">
          <a className="me-auto text-2xl font-bold sm:text-3xl">Kiosk App</a>
          <Link to="/login" className="">
            Login
          </Link>
        </div>
      </header>

      <h1 className="container mx-auto my-12 text-center text-4xl font-bold sm:text-5xl">
        Orders made easy
      </h1>
    </>
  );
}
