import { db } from "@/lib/instant";
import { createLazyFileRoute } from "@tanstack/react-router";
import { LoaderPinwheel } from "lucide-react";

export const Route = createLazyFileRoute("/(auth)/_layout/shop/$merchantId")({
  component: MerchantPage,
});

function MerchantPage() {
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

  return (
    <div className="container mx-auto mt-6 px-4">
      {isLoading ? (
        <LoaderPinwheel className="mx-auto size-5 animate-spin" />
      ) : error ? (
        <p className="text-destructive">
          Something went wrong. Please try again.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-flow-col sm:grid-cols-12">
          <img
            src={data.merchants[0].logoSrc}
            alt={data.merchants[0].name}
            className="max-h-80 justify-self-center rounded-xl sm:col-span-5"
          />
          <div className="col-span-7 mt-2">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {data.merchants[0].name}
            </h2>
            <p className="text-lg font-medium text-muted-foreground sm:text-xl">
              {data.merchants[0].category}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
