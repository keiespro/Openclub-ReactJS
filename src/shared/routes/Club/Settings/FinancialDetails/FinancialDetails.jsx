import React, { Component, PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import { Alert, message } from 'antd'
import StripeAccountForm from 'components/forms/StripeAccountForm'
import StripeBankAccountForm from 'components/forms/StripeBankAccountForm'
import { stringKeyObjectFilter } from 'utils/object_helpers'
import { createBankAccount } from 'utils/stripe'

class BankDetails extends Component {
  static propTypes = {
    club: PropTypes.object,
    createAccount: PropTypes.func,
    updateAccount: PropTypes.func,
    saveBankAccount: PropTypes.func,
    submitting: PropTypes.bool
  }
  constructor(props) {
    super(props)

    this.state = { submitting: false }

    this.saveDetails = this.saveDetails.bind(this)
    this.saveBankAccount = this.saveBankAccount.bind(this);
    this.deleteBankAccount = this.deleteBankAccount.bind(this);
  }
  async saveDetails(values, dispatch, props) {
    const { createAccount, updateAccount, club } = this.props;
    const mutation = club.stripe_account ? updateAccount : createAccount;

    let data = stringKeyObjectFilter(values, props.registeredFields)

    if (data.dob instanceof Date) {
      data.dob = {
        day: data.dob.getDate(),
        month: data.dob.getMonth(),
        year: data.dob.getFullYear()
      }
    }

    try {
      await mutation({
        variables: {
          clubId: club._id,
          account: {
            data
          }
        }
      })
      message.success("Account details updated sucessfully!", 10);
    } catch (err) {
      Modal.error({
        title: "Error Updating Account",
        content: err.message
      });
    }
  }
  async saveBankAccount(values, dispatch, props) {
    const { saveBankAccount, club } = this.props;

    try {
      this.setState({ submitting: true })
      const source = await createBankAccount({
        routing_number: values.bank_account.routing_number,
        account_number: values.bank_account.account_number,
        account_holder_name: values.account_holder_name,
        account_holder_type: values.account_holder_type,
        country: club.stripe_account.data.country,
        currency: club.stripe_account.data.default_currency
      });
      await saveBankAccount({
        variables: {
          clubId: club._id,
          source: source.token.id
        }
      })
      this.setState({ submitting: false })
      message.success("Bank account has been added successfully.");
    } catch (err) {
      Modal.error({
        title: "Error Adding Account",
        content: err.message
      });
      this.setState({ submitting: false })
    }
  }
  async deleteBankAccount(id) {
    const { deleteBankAccount, club } = this.props;

    try {
      this.setState({ submitting: true })
      await deleteBankAccount({
        variables: {
          clubId: club._id,
          source: id
        }
      })
      this.setState({ submitting: false })
      message.success("Bank account has been deleted successfully.");
    } catch (err) {
      Modal.error({
        title: "Error Deleting Account",
        content: err.message
      });
      this.setState({ submitting: false })
    }
  }
  async confirmDeleteBankAccount(id) {
    Modal.confirm({
      title: "Delete Bank Account",
      content: "Are you sure you wish to delete this bank account?",
      okText: "Confirm & Delete",
      cancelTest: "Cancel",
      maskClosable: true,
      onOk: await this.deleteBankAccount.bind(this, id)
    })
  }
  renderBankAccounts(club, submitting) {
    if (!club.stripe_account) {
      return (
        <Alert
          message="Club Account Not Setup"
          description="Bank accounts cannot be added until the primary club account above is setup"
          type="warning"
          showIcon
        />
      );
    }
    if (club.stripe_account.data && club.stripe_account.data.external_accounts.data.length === 0) {
      return <StripeBankAccountForm club={club} country={club.stripe_account.data.country} onSubmit={this.saveBankAccount} submitting={submitting || this.state.submitting} />
    }
    const account = club.stripe_account.data.external_accounts.data[0];
    return (
      <div>
        <Alert
          message="Account Connected"
          description={`Funds will be automatically deposited into your ${account.bank_name} account ending in ${account.last4} every ${club.stripe_account.data.payout_schedule.delay_days} days after transactions occur. Funds will be deposited in ${account.currency.toUpperCase()}. Please contact support if you have any concerns.`}
          type="success"
          showIcon
        />
      <Button type="danger" onClick={this.confirmDeleteBankAccount.bind(this, account.id)} disabled>Delete Bank Account</Button>
      </div>
    );
  }
  render() {
    const { club, submitting } = this.props

    return (
      <div className="oc-form">
        <h4 className="bottom-gap-large">Financial Details</h4>
        <StripeAccountForm onSubmit={this.saveDetails} club={club} initialValues={club.stripe_account ? club.stripe_account.data : null} submitting={submitting} />
        <div className="bottom-gap-large" />
        <hr />
        <div className="bottom-gap-large" />
        <h4 className="bottom-gap-large">Bank Accounts</h4>
        <div>
          {this.renderBankAccounts(club, submitting)}
        </div>
      </div>
    )
  }
}

const createAccountMutationQL = gql`
  mutation createClubAccount($clubId: MongoID!, $account: stripeAccountInput!){
    createClubAccount(clubId: $clubId, account: $account){
      _id
      stripe_account{
        _id
        data
      }
    }
  }
`

const updateAccountMutationQL = gql`
  mutation updateClubAccount($clubId: MongoID!, $account: stripeAccountUpdate!){
    updateClubAccount(clubId: $clubId, account: $account){
      _id
      stripe_account{
        data
      }
    }
  }
`

const saveBankAccountQL = gql`
  mutation saveBankAccount($clubId: MongoID!, $source: String!) {
    saveBankAccount(clubId: $clubId, source: $source){
      _id
      stripe_account{
        data
      }
    }
  }
`

const deleteBankAccountQL = gql`
  mutation deleteBankAccount($clubId: MongoID!, $source: String!) {
    deleteBankAccount(clubId: $clubId, source: $source){
      _id
      stripe_account{
        data
      }
    }
  }
`

const FinancialsWithApollo = compose(
  graphql(createAccountMutationQL, {
  name: 'createAccount',
  options: {
    updateQueries: {
      club: (prev, { mutationResult }) => ({
        club: {
          ...prev.club,
          ...mutationResult.data.createAccount
        }
      })
    }
  }
}),
graphql(updateAccountMutationQL, {
name: 'updateAccount',
options: {
  updateQueries: {
    club: (prev, { mutationResult }) => ({
      club: {
        ...prev.club,
        ...mutationResult.data.updateAccount
      }
    })
  }
}
}),
graphql(saveBankAccountQL, {
  name: 'saveBankAccount',
  options: {
    updateQueries: {
      club: (prev, { mutationResult }) => ({
        club: {
          ...prev.club,
          ...mutationResult.data.saveBankAccount
        }
      })
    }
  }
}),
graphql(deleteBankAccountQL, {
  name: 'deleteBankAccount',
  options: {
    updateQueries: {
      club: (prev, { mutationResult }) => ({
        club: {
          ...prev.club,
          ...mutationResult.data.deleteBankAccount
        }
      })
    }
  }
})
)(BankDetails)

export default FinancialsWithApollo
