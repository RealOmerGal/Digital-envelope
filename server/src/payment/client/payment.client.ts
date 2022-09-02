import * as paypal from 'paypal-rest-sdk';

paypal.configure({
  mode: 'sandbox',
  client_id: process.env.PAYPAL_CLIENT,
  client_secret: process.env.PAYPAL_SECRET,
});

export { paypal as paypalClient };
