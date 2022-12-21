import React from 'react';
import { useResize } from '../hooks/useResize';
import { useProducts } from '../hooks/useProducts';
import { getDiscountedPrice } from '../utils/dataHelpers';
import ProductCard from './ProductCard';
import { ReactComponent as Spinner } from '../assets/spinner.svg';
import './Products.css';

const DESKTOP_WIDTH = 768;
const MOBILE_IMG_ASPECT_RATIO = '3:4';
const DESKTOP_IMG_ASPECT_RATIO = '3:2';
const MOBILE_IMG_MAX_HEIGHT = '240'; // 120px * 2 for retina
const DESKTOP_IMG_MAX_HEIGHT = '400'; // 200px * 2 for retina

interface Props {
  selectedCityId: string;
  selectedDate: string;
}

const Products: React.FC<Props> = ({ selectedCityId, selectedDate }) => {
  const { width: windowWidth } = useResize();
  const {
    products,
    error: productsError,
    isLoading: isProductsLoading,
  } = useProducts(selectedCityId, selectedDate);

  if (isProductsLoading) {
    return <Spinner className="spinner" />;
  }

  if (productsError) {
    return <p className="error-message">{productsError}</p>;
  }

  if (!products || products.length === 0) {
    return (
      <div className="info-wrapper">
        <p className="info-wrapper__message">
          {!products
            ? 'Select filters first'
            : 'Nothing found, please try a different date'}
        </p>
      </div>
    );
  }

  return (
    <section className="products appear-from-bottom">
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

        let imgAspectRatio: string = MOBILE_IMG_ASPECT_RATIO;
        let imgMaxHeight: string = MOBILE_IMG_MAX_HEIGHT;
        if (windowWidth >= DESKTOP_WIDTH) {
          imgAspectRatio = DESKTOP_IMG_ASPECT_RATIO;
          imgMaxHeight = DESKTOP_IMG_MAX_HEIGHT;
        }

        const imgUrl = `${image}&ar=${imgAspectRatio}&h=${imgMaxHeight}`;
        return (
          <ProductCard
            key={id}
            image={imgUrl}
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
