/**
 * ShopZone — Product Service Layer
 * Handles fetching inventory from DummyJSON REST API with resilient fallback seed data.
 */

const DUMMY_JSON_BASE_URL = 'https://dummyjson.com';

// Realistic fallback products payload matching DummyJSON schema
export const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. It features a specially designed brush for dramatic lashes.',
    category: 'beauty',
    price: 9.99,
    discountPercentage: 7.17,
    rating: 4.94,
    stock: 5,
    brand: 'Essence',
    sku: 'BEA-ESS-001',
    warrantyInformation: '1 month warranty',
    shippingInformation: 'Ships in 1 month',
    availabilityStatus: 'Low Stock',
    returnPolicy: '30 days return policy',
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
    images: [
      'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'
    ],
    reviews: [
      { rating: 5, comment: 'Highly recommended! Dramatic lashes all day.', reviewerName: 'Sophia Miller', date: '2024-05-23' },
      { rating: 4, comment: 'Great quality for the price point.', reviewerName: 'Liam Johnson', date: '2024-05-18' }
    ]
  },
  {
    id: 2,
    title: 'Eyeshadow Palette with Mirror',
    description: 'The Eyeshadow Palette with Mirror offers a versatile range of 12 rich pigment shades, from everyday neutrals to bold statement colors with high blendability.',
    category: 'beauty',
    price: 19.99,
    discountPercentage: 5.5,
    rating: 3.28,
    stock: 44,
    brand: 'Glamour Beauty',
    sku: 'BEA-GLA-002',
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png',
    images: [
      'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png'
    ],
    reviews: [
      { rating: 4, comment: 'Colors are true to pan and pigmented.', reviewerName: 'Emma Watson', date: '2024-04-12' }
    ]
  },
  {
    id: 3,
    title: 'Powder Canister Pressed Face Powder',
    description: 'The Powder Canister is a finely milled setting powder designed to blur imperfections, minimize shine, and set makeup for a velvety matte finish.',
    category: 'beauty',
    price: 14.99,
    discountPercentage: 18.14,
    rating: 3.82,
    stock: 59,
    brand: 'Velvet Touch',
    sku: 'BEA-VEL-003',
    warrantyInformation: '2 year warranty',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '60 days return policy',
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png',
    images: [
      'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png'
    ],
    reviews: [
      { rating: 5, comment: 'Flawless finish without caking!', reviewerName: 'Olivia Davis', date: '2024-03-10' }
    ]
  },
  {
    id: 4,
    title: 'Red Lipstick Matte Velvet',
    description: 'The Red Lipstick is a classic bold red with a smooth matte velvet texture. Delivers intense color payoff in a single swipe and stays put for up to 12 hours.',
    category: 'beauty',
    price: 12.99,
    discountPercentage: 19.03,
    rating: 4.51,
    stock: 68,
    brand: 'Chic Lips',
    sku: 'BEA-CHI-004',
    warrantyInformation: 'Lifetime warranty',
    shippingInformation: 'Ships in 2 weeks',
    availabilityStatus: 'In Stock',
    returnPolicy: '90 days return policy',
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png',
    images: [
      'https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png'
    ],
    reviews: [
      { rating: 5, comment: 'The perfect universal red shade!', reviewerName: 'Mia Wilson', date: '2024-05-01' }
    ]
  },
  {
    id: 5,
    title: 'Red Nail Polish Gel Shine',
    description: 'The Red Nail Polish offers a rich glossy gel-like finish without needing a UV lamp. Quick drying formula resists chipping for up to 10 days.',
    category: 'beauty',
    price: 8.99,
    discountPercentage: 2.46,
    rating: 3.91,
    stock: 71,
    brand: 'Nail Couture',
    sku: 'BEA-NAI-005',
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships in 1 week',
    availabilityStatus: 'In Stock',
    returnPolicy: 'No return policy',
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png',
    images: [
      'https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png'
    ],
    reviews: [
      { rating: 4, comment: 'Glossy and fast drying.', reviewerName: 'Chloe Bennett', date: '2024-04-19' }
    ]
  },
  {
    id: 6,
    title: 'Calvin Klein CK One Eau de Toilette',
    description: 'CK One by Calvin Klein is an iconic unisex fragrance featuring notes of green tea, papaya, bergamot, nutmeg, violet, cardamom, and amber.',
    category: 'fragrances',
    price: 49.99,
    discountPercentage: 0.32,
    rating: 4.85,
    stock: 17,
    brand: 'Calvin Klein',
    sku: 'FRA-CK-006',
    warrantyInformation: '5 year warranty',
    shippingInformation: 'Ships overnight',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    thumbnail: 'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png',
    images: [
      'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png',
      'https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/2.png'
    ],
    reviews: [
      { rating: 5, comment: 'Timeless classic. Fresh and clean scent.', reviewerName: 'Noah Brown', date: '2024-05-15' }
    ]
  },
  {
    id: 7,
    title: 'Chanel Coco Noir Eau De Parfum',
    description: 'Coco Noir by Chanel is an intimate, seductive, and intensely brilliant oriental fragrance. Highlights include grapefruit, bergamot, rose, and Indonesian patchouli.',
    category: 'fragrances',
    price: 129.99,
    discountPercentage: 18.64,
    rating: 4.76,
    stock: 41,
    brand: 'Chanel',
    sku: 'FRA-CHA-007',
    warrantyInformation: '3 year warranty',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '60 days return policy',
    thumbnail: 'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De%20Parfum/thumbnail.png',
    images: [
      'https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De%20Parfum/1.png'
    ],
    reviews: [
      { rating: 5, comment: 'Pure luxury in a bottle. Lasts 14+ hours.', reviewerName: 'Charlotte Taylor', date: '2024-05-02' }
    ]
  },
  {
    id: 8,
    title: 'Dior J\'adore Eau de Parfum',
    description: 'J\'adore by Dior is an exquisite floral bouquet crafted with precision. Combines ylang-ylang from the Comoro Islands, Damascus rose, and Sambac jasmine.',
    category: 'fragrances',
    price: 89.99,
    discountPercentage: 17.44,
    rating: 4.7,
    stock: 91,
    brand: 'Dior',
    sku: 'FRA-DIO-008',
    warrantyInformation: 'Lifetime warranty',
    shippingInformation: 'Ships in 2 days',
    availabilityStatus: 'In Stock',
    returnPolicy: '14 days return policy',
    thumbnail: 'https://cdn.dummyjson.com/products/images/fragrances/Dior%20J\'adore/thumbnail.png',
    images: [
      'https://cdn.dummyjson.com/products/images/fragrances/Dior%20J\'adore/1.png'
    ],
    reviews: [
      { rating: 5, comment: 'Exudes elegance and warmth.', reviewerName: 'Harper Harris', date: '2024-04-28' }
    ]
  },
  {
    id: 11,
    title: 'Annibale Colombo Bed Artisan Wood',
    description: 'The Annibale Colombo Bed is a handcrafted masterpiece made of solid walnut with intricate wood joinery and premium headboard upholstery.',
    category: 'furniture',
    price: 1899.99,
    discountPercentage: 0.29,
    rating: 4.14,
    stock: 47,
    brand: 'Annibale Colombo',
    sku: 'FUR-COL-011',
    warrantyInformation: '2 year warranty',
    shippingInformation: 'Ships in 1 month',
    availabilityStatus: 'In Stock',
    returnPolicy: '7 days return policy',
    thumbnail: 'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png',
    images: [
      'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png'
    ],
    reviews: [
      { rating: 4, comment: 'Super solid construction and great heritage feel.', reviewerName: 'Mason Clark', date: '2024-03-21' }
    ]
  },
  {
    id: 14,
    title: 'Knoll Saarinen Executive Chair',
    description: 'Designed by Eero Saarinen in 1950, this executive armchair transformed executive seating with its fluid sculptural form and ergonomic comfort.',
    category: 'furniture',
    price: 499.99,
    discountPercentage: 15.23,
    rating: 4.62,
    stock: 12,
    brand: 'Knoll',
    sku: 'FUR-KNO-014',
    warrantyInformation: '5 year warranty',
    shippingInformation: 'Ships in 3-5 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    thumbnail: 'https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png',
    images: [
      'https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.png'
    ],
    reviews: [
      { rating: 5, comment: 'Iconic mid-century modern design!', reviewerName: 'Alexander Hall', date: '2024-04-03' }
    ]
  },
  {
    id: 16,
    title: 'Organic Hass Avocados Pack',
    description: 'Creamy and nutrient-dense fresh California avocados, hand-selected at optimal ripeness. Perfect for guacamole, salads, and breakfast toast.',
    category: 'groceries',
    price: 4.49,
    discountPercentage: 10.5,
    rating: 4.67,
    stock: 82,
    brand: 'FreshFarm Organics',
    sku: 'GRO-AVO-016',
    warrantyInformation: 'Satisfaction guaranteed',
    shippingInformation: 'Ships in refrigerated packaging',
    availabilityStatus: 'In Stock',
    returnPolicy: '7 days fresh refund',
    thumbnail: 'https://cdn.dummyjson.com/products/images/groceries/Green%20Bell%20Pepper/thumbnail.png',
    images: [
      'https://cdn.dummyjson.com/products/images/groceries/Green%20Bell%20Pepper/1.png'
    ],
    reviews: [
      { rating: 5, comment: 'Fresh and perfectly ripe upon delivery!', reviewerName: 'Lucas Martin', date: '2024-05-11' }
    ]
  },
  {
    id: 20,
    title: 'Honey Jar Pure Raw Wildflower',
    description: '100% pure raw wildflower honey harvested from sustainable regional apiaries. Unfiltered and unpasteurized to preserve natural enzymes and rich floral aroma.',
    category: 'groceries',
    price: 6.99,
    discountPercentage: 1.91,
    rating: 4.92,
    stock: 25,
    brand: 'Golden Hive',
    sku: 'GRO-HON-020',
    warrantyInformation: 'No expiration date',
    shippingInformation: 'Ships in 1-2 business days',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    thumbnail: 'https://cdn.dummyjson.com/products/images/groceries/Honey%20Jar/thumbnail.png',
    images: [
      'https://cdn.dummyjson.com/products/images/groceries/Honey%20Jar/1.png'
    ],
    reviews: [
      { rating: 5, comment: 'Sweetest, richest natural honey I have ever tasted.', reviewerName: 'Amelia Young', date: '2024-05-04' }
    ]
  }
];

/**
 * Fetch all products from DummyJSON or return resilient fallback
 */
export async function fetchAllProducts() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(`${DUMMY_JSON_BASE_URL}/products?limit=30`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    if (data && Array.isArray(data.products) && data.products.length > 0) {
      return data.products;
    }
    return FALLBACK_PRODUCTS;
  } catch (err) {
    console.warn('DummyJSON network fetch failed, using fallback products data:', err.message);
    return FALLBACK_PRODUCTS;
  }
}

/**
 * Fetch a single product by ID or return from local fallback cache
 */
export async function fetchProductById(id) {
  const numericId = Number(id);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(`${DUMMY_JSON_BASE_URL}/products/${numericId}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.id) {
      return data;
    }
    throw new Error('Invalid product payload structure');
  } catch (err) {
    console.warn(`Product #${numericId} fetch failed, checking fallback items:`, err.message);
    const fallbackItem = FALLBACK_PRODUCTS.find(p => p.id === numericId);
    if (fallbackItem) {
      return fallbackItem;
    }
    // If not found in primary list, generate a synthesized fallback for smooth UX
    return {
      id: numericId,
      title: `Product SKU #${numericId}`,
      description: 'High-performance e-commerce catalog item with verified build specifications and standard warranty coverage.',
      category: 'general',
      price: 29.99,
      discountPercentage: 10,
      rating: 4.5,
      stock: 15,
      brand: 'ShopZone Essentials',
      sku: `SKU-${numericId}-GEN`,
      warrantyInformation: '1 year standard warranty',
      shippingInformation: 'Ships in 2-3 business days',
      availabilityStatus: 'In Stock',
      returnPolicy: '30 days return policy',
      thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
      ],
      reviews: [
        { rating: 5, comment: 'Excellent quality and fast delivery!', reviewerName: 'Verified Buyer', date: '2024-05-01' }
      ]
    };
  }
}
