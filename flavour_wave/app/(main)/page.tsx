"use client";

import Banner from "@/components/home/banner";
import HeroSection from "@/components/home/hero";
import ScrollVelocity from "@/components/home/scroll-velocity";
import Navbar from "@/components/navbar/navbar";
import { IProduct } from "@/components/products/product-card";
import ProductsGrid from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { useInitialSetup } from "@/lib/initial-setup";
import { getProducts } from "@/services/product.service";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { user } = useUser();

  user &&
    useInitialSetup({
      customer_id: user?.id as string,
      email: user?.emailAddresses[0].emailAddress as string,
      imageUrl: user?.imageUrl as string,
      name: user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : (user?.firstName as string),
    });

  const { data: products, status } = useQuery({
    queryKey: ["products", "limit"],
    queryFn: async () => {
      try {
        return await getProducts();
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <main>
      {/* main banner that including header */}
      <Banner />
      {/* scroll velocity section to display our products */}
      <div className="my-24">
        <h2 className="text-center text-3xl md:text-4xl mb-8 font-bold ">
          Our delicious <span className="text-emerald-600">Products</span>
        </h2>
        <ScrollVelocity />
      </div>

      {/* hero section */}
      <div className="my-24">
        <h2 className="text-center text-3xl md:text-4xl mb-8 font-bold ">
          Our delicious <span className="text-emerald-600">Products</span>
        </h2>
        <HeroSection />
      </div>

      {/* popular products */}
      <div className="my-24">
        <h2 className="text-center text-3xl md:text-4xl mb-8 font-bold ">
          Our Popular <span className="text-emerald-600">Products</span>
        </h2>
        <ProductsGrid
          products={products}
          status={status}
          showLoading={false}
          skeletonNumber={4}
        />
      </div>
    </main>
  );
}
