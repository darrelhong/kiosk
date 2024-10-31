import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCents } from "@/lib/format-currency";
import { db } from "@/lib/instant";
import { createLazyFileRoute } from "@tanstack/react-router";
import { LoaderPinwheel, MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export const Route = createLazyFileRoute("/(auth)/_layout/product/$productId")({
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();

  const [quantity, setQuantity] = useState(1);

  const { data, isLoading, error } = db.useQuery({
    products: {
      $: {
        where: {
          id: productId,
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
      <div className="grid gap-6 sm:grid-flow-col sm:grid-cols-[5fr_7fr]">
        <img
          src={data.products[0].imageSrc}
          alt={data.products[0].name}
          className="aspect-video max-h-60 w-full justify-self-center rounded-xl object-cover sm:aspect-auto"
        />
        <div>
          <p className="mb-1.5 text-2xl font-semibold sm:text-2xl">
            ${formatCents(data.products[0].price)}
          </p>
          <h2 className="mb-2 text-2xl font-semibold sm:text-4xl">
            {data.products[0].name}
          </h2>
          <p className="text-muted-foreground sm:text-lg">
            {data.products[0].description}
          </p>
        </div>
      </div>

      <div className="grid w-full gap-1.5 sm:max-w-sm sm:justify-self-start">
        <Label htmlFor="notes">Add a note</Label>
        <Textarea name="notes" id="notes" />
      </div>

      <div className="grid gap-4 sm:flex">
        <div className="flex items-center gap-3 justify-self-center">
          <Button
            disabled={quantity === 1}
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            variant="secondary"
            size="icon"
          >
            <MinusIcon />
          </Button>

          <p>{quantity}</p>

          <Button
            onClick={() => setQuantity((prev) => prev + 1)}
            variant="secondary"
            size="icon"
          >
            <PlusIcon />
          </Button>
        </div>

        <Button className="sm:inline-block">Order now</Button>
      </div>
    </div>
  );
}
