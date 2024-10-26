import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(auth)/_layout/")({
  component: Landing,
});

function Landing() {
  return (
    <>
      <h1 className="container mx-auto my-12 text-center text-4xl font-bold sm:text-5xl">
        Orders made easy
      </h1>
    </>
  );
}
