import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/instant";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { LoaderPinwheel } from "lucide-react";

export const Route = createLazyFileRoute("/(auth)/_layout/")({
  component: Landing,
});

function Landing() {
  const { data, isLoading, error } = db.useQuery({ merchants: {} });
  return (
    <>
      <div className="container mx-auto px-4">
        <Input placeholder="Search" className="my-6" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(288px,1fr))] gap-4">
          {isLoading ? (
            <LoaderPinwheel className="mx-auto size-5 animate-spin" />
          ) : error ? (
            <p className="text-destructive">
              Something went wrong. Please try again.
            </p>
          ) : (
            data.merchants?.map((merchant) => (
              <Link
                to="/shop/$merchantId"
                params={{ merchantId: merchant.id }}
                key={merchant.id}
              >
                <Card className="flex gap-x-4 p-5 hover:border-foreground">
                  <img
                    src={merchant.logoSrc}
                    alt={merchant.name}
                    className="size-20 rounded-xl"
                  />
                  <CardHeader className="p-0">
                    <CardTitle>{merchant.name}</CardTitle>
                    <CardDescription>{merchant.category}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}
