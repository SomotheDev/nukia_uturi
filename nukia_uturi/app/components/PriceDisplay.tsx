import React from 'react';

interface PriceDisplayProps {
  price: number;
  className?: string;
}

export function PriceDisplay({ price, className = '' }: PriceDisplayProps) {
  const formattedPrice = new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <span className={className}>
      {formattedPrice}
    </span>
  );
}

