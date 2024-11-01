import { Button } from "@/components/ui/button";
import { db } from "@/lib/instant";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { LoaderPinwheel } from "lucide-react";

export const Route = createLazyFileRoute("/app/_layout/merchant/$merchantId/")({
  component: MerchantHome,
});

function MerchantHome() {
  const { merchantId } = Route.useParams();

  const { data, isLoading, error } = db.useQuery({
    merchants: {
      $: {
        where: {
          id: merchantId,
        },
      },
    },
  });

  if (isLoading) {
    return <LoaderPinwheel className="mx-auto size-5 animate-spin" />;
  }

  if (error) {
    return (
      <p className="text-destructive">
        Something went wrong. Please try again.
      </p>
    );
  }

  return (
    <div className="grid gap-6">
      <h2 className="text-3xl font-semibold">{data.merchants[0].name}</h2>
      <h2 className="text-xl font-medium sm:text-2xl">At a glance</h2>
      <div>
        <Button asChild>
          <Link to={`/app/merchant/${merchantId}/orders`}>Orders</Link>
        </Button>
      </div>
    </div>
  );
}
