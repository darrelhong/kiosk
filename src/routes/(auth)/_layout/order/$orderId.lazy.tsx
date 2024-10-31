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

export const Route = createLazyFileRoute("/(auth)/_layout/order/$orderId")({
  component: OrderPage,
});

function OrderPage() {
  const { orderId } = Route.useParams();

  const { data, isLoading, error } = db.useQuery({
    orders: {
      product: {},
      $: {
        where: {
          id: orderId,
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

  const order = data.orders[0];

  if (!order.product) {
    return (
      <p className="text-destructive">
        Something went wrong. Please try again.
      </p>
    );
  }

  return (
    <div className="grid gap-y-2">
      <h4 className="text-2xl font-medium">Your order is confirmed</h4>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Order details</CardTitle>
          {/* fake order time */}
          <CardDescription>
            {new Date().toLocaleString("en-SG", {})}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid rounded-md border p-4">
            <div className="flex justify-between">
              <p>{order.product?.name}</p>
              <p>x {order.quantity}</p>
            </div>
            <p className="font-medium">${formatCents(order.product?.price)}</p>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-x-2.5 font-bold">
          <p>Total:</p>
          <p>${formatCents(order.product?.price * order.quantity)}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
