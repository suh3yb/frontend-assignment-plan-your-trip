import React from 'react';
import ProductCard from './ProductCard';
import { ProductsResponse } from '../types';
import { getDiscountedPrice } from '../utils/dataHelpers';
import './products.css';

interface Props {
  products?: ProductsResponse;
}

const Products: React.FC<Props> = ({ products }) => {
  if (!products) {
    return <p>Select filters first</p>;
  }

  if (products.length === 0) {
    return <p>Nothing found, please try a different date</p>;
  }

  return (
    <section className="products">
      {products.map(product => {
        const {
          id,
          image,
          title,
          summary,
          price,
          discount_percentage,
          product_url,
        } = product;
        return (
          <ProductCard
            key={id}
            image={image}
            title={title}
            summary={summary}
            price={price.toFixed(2)}
            discountPrice={
              discount_percentage
                ? getDiscountedPrice(price, discount_percentage)
                : undefined
            }
            productUrl={product_url}
          />
        );
      })}
    </section>
  );
};

export default Products;
