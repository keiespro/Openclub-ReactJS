/**
 * functions and init for stripe integration
 */
Stripe.setPublishableKey(process.env.STRIPE_PUBLISHABLE_KEY)

const createBankAccount = details => new Promise((resolve, reject) => {
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
