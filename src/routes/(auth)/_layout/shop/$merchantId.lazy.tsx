import { Card } from "@/components/ui/card";
import { formatCents } from "@/lib/format-currency";
import { db } from "@/lib/instant";
import { tx } from "@instantdb/react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { LoaderPinwheel } from "lucide-react";

export const Route = createLazyFileRoute("/(auth)/_layout/shop/$merchantId")({
  component: MerchantPage,
});

function MerchantPage() {
  const { merchantId } = Route.useParams();

  const { data, isLoading, error } = db.useQuery({
    merchants: {
      products: {},
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
            <h3 className="mb-2 mt-6 text-2xl font-semibold">Items</h3>
            <div className="grid gap-4 sm:grid-cols-[repeat(auto-fit,minmax(384px,1fr))]">
              {!data.merchants?.[0].products ? (
                <p>No items found</p>
              ) : (
                data.merchants?.[0].products.map((product) => (
                  <Link>
                    <Card
                      key={product.id}
                      className="flex gap-3 p-4 hover:bg-accent"
                    >
                      <img
                        src={product.imageSrc}
                        alt={product.name}
                        className="aspect-square size-24 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="mb-0.5 text-lg">{product.name}</h4>
                        <p className="line-clamp-3 text-sm text-muted-foreground">
                          {product.description}
                        </p>
                        <p className="font-semibold">
                          ${formatCents(product.price)}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
