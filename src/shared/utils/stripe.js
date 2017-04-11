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
  Stripe.setPublishableKey(process.env.STRIPE_PUBLISHABLE_KEY);
  return Stripe(process.env.STRIPE_PUBLISHABLE_KEY);
}

async function createBankAccount(details) {
  const Stripe = await init();

  return new Promise((resolve, reject) => {
      Stripe.bankAccount.createToken(details, (status, response) => {
      if (response.error) reject(response.error.message);
      resolve(response)
    });
  });
}

async function createCardElement(style, mountNode, err) {
  const stripe = await init();

  const elements = stripe.elements();

  let card = null

  const errorListener = ({ error }) => {
    if (error) err(error.message);
  }

  const boundErrorListener = errorListener.bind(this);

  const mount = () => {
    card = elements.create('card', style);
    card.mount(mountNode)
    card.addEventListener('change', boundErrorListener);
  }
  const unmount = () => {
    card.removeEventListener('change', boundErrorListener);
  }
  const submit = async () => {
    console.log(card)
    const { token, error } = await stripe.createToken(card);
    console.log(token, error)
    if (error) return err(error.message);
    return token;
  }

  return {
    mount: mount.bind(this),
    unmount: unmount.bind(this),
    card,
    submit: submit.bind(this)
  };
}


export {
  createBankAccount,
  createCardElement
}
