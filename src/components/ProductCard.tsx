import React, { useState } from 'react';
import { getImgAltTextFromTitle } from '../utils/dataHelpers';
import LazyImg from './LazyImg';
import './productCard.css';

interface Props {
  productUrl: string;
  image: string;
  title: string;
  summary: string;
  price: string;
  discountPrice?: string;
}

const ProductCard: React.FC<Props> = ({
  productUrl,
  image,
  title,
  summary,
  price,
  discountPrice,
}) => (
  <a className="product-card" href={productUrl} target="_blank">
    <LazyImg
      className="product-card__image"
      src={image}
      alt={getImgAltTextFromTitle(title)}
    />
    <div className="product-card__info">
      <h2 className="product-card__info__title truncate">{title}</h2>
      <p className="product-card__info__summary truncate">{summary}</p>
      <div className="product-card__info__prices">
        {discountPrice && (
          <p className="product-card__info__prices__discount-price">
            &euro;{discountPrice}
          </p>
        )}
        <p className="product-card__info__prices__full-price">&euro;{price}</p>
      </div>
    </div>
  </a>
);

export default ProductCard;
