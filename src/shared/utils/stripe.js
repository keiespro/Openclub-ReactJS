/**
 * functions and init for stripe integration
 */

const windowCheck = () => {
  if (typeof window === 'undefined') return true;
  return false;
}

const timeout = 10000;

async function init() {
  if (windowCheck()) return null;
  let Stripe = null;

  if (window.Stripe) Stripe = window.Stripe;

  return Stripe;
}

async function createBankAccount(details) {
  const Stripe = await init();

  Stripe.setPublishableKey(process.env.STRIPE_PUBLISHABLE_KEY)

  return new Promise((resolve, reject) => {
      Stripe.bankAccount.createToken(details, (status, response) => {
      if (response.error) reject(response.error.message);
      resolve(response)
    });
  });
}

async function createCardElement(style, mountNode, err) {
  const Stripe = await init();
  const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);
  const elements = stripe.elements();

  const card = elements.create('card', style);

  card.mount(mountNode);

  const errorListener = ({ error }) => {
    if (error) err(error.message);
  }

  const boundErrorListener = errorListener.bind(this);

  const mount = () => {
    card.addEventListener('change', boundErrorListener);
  }
  const unmount = () => {
    card.removeEventListener('change', boundErrorListener);
  }
  const submit = async () => {
    const { token, error } = await Stripe.createToken(card);
    if (error) return err(error.message);
    return token;
  }

  return {
    mount,
    unmount,
    card,
    submit
  };
}


export {
  createBankAccount,
  createCardElement
}
