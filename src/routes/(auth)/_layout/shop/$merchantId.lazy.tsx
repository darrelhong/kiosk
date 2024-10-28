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
        <>
          <div className="grid gap-6 sm:grid-flow-col sm:grid-cols-[5fr_7fr]">
            <img
              src={data.merchants[0].logoSrc}
              alt={data.merchants[0].name}
              className="aspect-[4/3] max-h-80 w-full justify-self-center rounded-xl object-cover"
            />
            <div className="">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                {data.merchants[0].name}
              </h2>
              <p className="text-lg font-medium text-muted-foreground sm:text-xl">
                {data.merchants[0].category}
              </p>
            </div>
          </div>
          <section>
            <h3 className="mt-6 text-2xl font-semibold">Items</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"></div>
          </section>
        </>
      )}
    </div>
  );
}
