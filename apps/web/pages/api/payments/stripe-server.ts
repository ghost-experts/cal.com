import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_S_KEY!, {
  apiVersion: "2022-08-01",
});

export const createCustomer = async (email: any) =>
  await stripe.customers.create({
    email,
  });

export const getInvoices = async (customer: any) => {
  const invoices = await stripe.invoices.list({ customer });
  return invoices?.data;
};

// export const getProducts = async () => {
//   const [products, prices] = await Promise.all([stripe.products.list(), stripe.prices.list()]);
//   const productPrices = {};
//   prices?.data.map((price) => (productPrices[price.product] = price));
//   products?.data.map((product) => (product.prices = productPrices[product.id]));
//   return products?.data.reverse();
// };

export default stripe;
