import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Spin from 'antd/lib/spin';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import error from 'utils/error';

import AddCardForm from 'components/forms/AddCardForm'

class AddCard extends Component {
  static propTypes = {
    addCreditCard: PropTypes.func,
    successCallback: PropTypes.func
  }
  constructor(props) {
    super(props);

    this.addCreditCard = this.addCreditCard.bind(this);

    this.state = {
      loading: false
    }
  }
  async addCreditCard(card) {
    if (!card) return message.error('No card details have been added', 10);
    const { addCreditCard, successCallback } = this.props;
    try {
      this.setState({ loading: true })
      await addCreditCard({
        variables: {
          card: card.id
        }
      })
      message.success('Credit card sucessfully added', 10)
      this.setState({ loading: false })
      if (successCallback) successCallback();
    } catch (err) {
      Modal.error({
        title: "Error adding card",
        content: `Uh-oh! ${error(err)}`
      })
      this.setState({ loading: false })
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <div style={{ textAlign: 'center', borderRadius: 4, margin: 20 }}>
          <Spin tip="Adding card..." />
        </div>
      )
    }
    return (
      <AddCardForm onSubmit={this.addCreditCard} />
    )
  }
}

const addCreditCardGQL = gql`
  mutation addCreditCard($card: String!){
    addCreditCard(card: $card) {
      _id
      stripe_account {
        _id
        cards
      }
    }
  }
`

const AddCardApollo = graphql(addCreditCardGQL, {
    name: 'addCreditCard',
    options: {
      updateQueries: {
        currentViewer: (prev, { mutationResult }) => ({
          user: {
            ...prev.user,
            ...mutationResult.data.addCreditCard
          }
        })
      }
    }
  })(AddCard);

  export default AddCardApollo;
