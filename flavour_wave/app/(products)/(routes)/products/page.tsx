"use client";

import { useQuery } from "@tanstack/react-query";
import ProductsGrid from "@/components/products/product-grid";
import React from "react";
import { IProduct } from "@/components/products/product-card";
import { SearchProduct } from "@/components/products/search-product";
import { getProducts } from "@/services/product.service";

const APIURL = "http://0.0.0.0:8000/storage";

type APIProduct = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  unit_price: number;
  quantity_per_box: number;
};

const Products = () => {
  // fetch from api-endpoint
  const { data: products, status } = useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => {
      const products: APIProduct[] = await getProducts();
      console.log(products);

      return products.map((p) => ({
        id: p.id,
        title: p.name,
        price: p.unit_price * p.quantity_per_box,
        description: p.description,
        image: APIURL + p.image_url,
      })) as IProduct[];
    },
  });

  return (
    <div className="my-16">
      <div className="my-5 mb-10">
        <SearchProduct status={status} products={products} />
      </div>

      <ProductsGrid products={products} status={status} showLoading={true} />
    </div>
  );
};

export default Products;
