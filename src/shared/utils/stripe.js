/**
 * functions and init for stripe integration
 */

let initialised = false

const init = () => {
  if(!initialised){
    Stripe.setPublishableKey(process.env.STRIPE_PUBLISHABLE_KEY)
    initialised = true
  }
}

const createBankAccount = details => new Promise((resolve, reject) => {
  init()
  Stripe.bankAccount.createToken(details, (status, response) => {
    if(response.error){
      reject(response.error.message)
    }else{
      // resolve the bank account details
      resolve(response)
    }
  })
})

export {
  createBankAccount
}
