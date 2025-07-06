import React, { useState } from 'react';
import { Star } from 'lucide-react';
import type { Product, ColorOption } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>('yellow');

  // PDF dokümanındaki renk tonları
  const colorOptions = [
    { key: 'yellow' as ColorOption, color: '#E6CA97', label: 'Yellow Gold' },
    { key: 'white' as ColorOption, color: '#D9D9D9', label: 'White Gold' },
    { key: 'rose' as ColorOption, color: '#E1A4A9', label: 'Rose Gold' },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Tam yıldız sayısı (4.7 → 4)
    const decimal = rating - fullStars; // Ondalık kısım (4.7 → 0.7)
    const fillPercentage = decimal * 100; // Doluluk yüzdesi (0.7 → 70%)

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Tam dolu yıldız - altın/sarı renk
        stars.push(
          <Star
            key={i}
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 fill-yellow-500 text-yellow-500"
          />
        );
      } else if (i === fullStars && decimal > 0) {
        // Kısmi dolu yıldız - doluluk yüzdesine göre
        stars.push(
          <div key={i} className="relative w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 lg:w-4 lg:h-4">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 fill-gray-200 text-gray-300 absolute" />
            <Star 
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 fill-yellow-500 text-yellow-500 absolute"
              style={{ 
                clipPath: `polygon(0 0, ${fillPercentage}% 0, ${fillPercentage}% 100%, 0 100%)`
              }}
            />
          </div>
        );
      } else {
        // Boş yıldız - açık gri renk
        stars.push(
          <Star
            key={i}
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 fill-gray-200 text-gray-300"
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-sm">
      {/* Product Image */}
      <div className="w-full h-48 sm:h-56 md:h-64 lg:h-60 flex items-center justify-center rounded-lg bg-gray-50">
                  <img
            src={product.images[selectedColor]}
            alt={product.name}
            className="w-full h-full object-cover sm:object-cover md:object-contain md:w-full md:h-auto md:max-w-none lg:object-cover scale-100"
          />
      </div>

      {/* Product Info */}
      <div>
        {/* Product Name - Montserrat Medium 15pt */}
        <h3 className="text-sm sm:text-[14px] md:text-[13px] lg:text-[15px] font-montserrat font-medium text-black mb-1 sm:mb-2 md:mb-1 lg:mb-2 mt-1 sm:mt-2 md:mt-1 lg:mt-2">
          {product.name}
        </h3>

        {/* Price - Montserrat Regular 15pt */}
        <p className="text-sm sm:text-[14px] md:text-[13px] lg:text-[15px] font-montserrat font-normal text-black mb-2 sm:mb-3 md:mb-2 lg:mb-3">
          ${product.price.toFixed(2)} USD
        </p>

        {/* Color Options */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-1 lg:gap-2 mb-1 sm:mb-2 md:mb-1 lg:mb-2">
          {colorOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setSelectedColor(option.key)}
              className={`w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                selectedColor === option.key
                  ? 'border border-black'
                  : 'border-0'
              }`}
              title={option.label}
            >
              <div
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full"
                style={{ backgroundColor: option.color }}
              />
            </button>
          ))}
        </div>

        {/* Color Label - Avenir Book 12pt */}
        <p className="text-xs sm:text-xs md:text-[11px] lg:text-xs font-avenir font-normal text-black mb-1 sm:mb-2 md:mb-1 lg:mb-2">
          {colorOptions.find(c => c.key === selectedColor)?.label}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-1 lg:gap-2">
          <div className="flex items-center gap-0.5">
            {renderStars(product.popularity)}
          </div>
          <span className="text-xs sm:text-sm md:text-xs lg:text-sm font-montserrat font-normal text-black">
            {product.popularity.toFixed(1)}/5
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 