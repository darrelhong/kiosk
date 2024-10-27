import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(auth)/shop/$merchantId")({
  component: MerchantPage,
});

function MerchantPage() {
  const { merchantId } = Route.useParams();

  return (
    <>
      <h1>Shop Page</h1>
    </>
  );
}
