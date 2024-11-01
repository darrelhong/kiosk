import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCents } from "@/lib/format-currency";
import { db } from "@/lib/instant";
import { createLazyFileRoute } from "@tanstack/react-router";
import { LoaderPinwheel } from "lucide-react";

export const Route = createLazyFileRoute(
  "/app/_layout/merchant/$merchantId/orders",
)({
  component: MerchantOrders,
});

function MerchantOrders() {
  const { merchantId } = Route.useParams();

  const { data, isLoading, error } = db.useQuery({
    orders: {
      $: {
        where: {
          "product.merchant.id": merchantId,
        },
        order: {
          serverCreatedAt: "desc",
        },
      },
      product: {},
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
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Your orders</h3>

      {data.orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {data.orders.map((order) => (
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Order ID</CardTitle>
                <CardDescription># {order.id}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid rounded-md border bg-accent p-4">
                  <div className="flex justify-between">
                    <p>{order.product?.name}</p>
                    <p>x {order.quantity}</p>
                  </div>
                  <p className="font-medium">
                    ${formatCents(order.product?.price || 0)}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium">Notes:</p>
                  <div className="rounded-md border p-2">
                    <p>{order.notes}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-x-2.5 font-bold">
                <p>Total:</p>
                <p>
                  ${formatCents((order.product?.price || 0) * order.quantity)}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
