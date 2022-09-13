import Stripe from 'stripe';

const stripeClient = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: '2022-08-01',
});

export default stripeClient;
