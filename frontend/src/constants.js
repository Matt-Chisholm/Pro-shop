export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

export const PRODUCTS_URL = `${BASE_URL}/api/products`;

export const PAYPAL_URL = `${BASE_URL}/api/config/paypal`;

export const ORDERS_URL = `${BASE_URL}/api/orders`;

export const USERS_URL = `${BASE_URL}/api/users`;
