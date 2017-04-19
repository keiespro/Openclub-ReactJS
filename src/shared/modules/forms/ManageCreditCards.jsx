import React, { Component, PropTypes } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Tooltip from 'antd/lib/tooltip'
import Button, { Group as ButtonGroup } from 'antd/lib/button'
import CardList from 'components/payment/CardList'
import AddCardForm from 'components/forms/AddCardForm'
import message from 'antd/lib/message'
import Modal from 'antd/lib/modal'

class ManageCreditCards extends Component {
  static propTypes = {
    viewer: PropTypes.object
  }
  async addCreditCard(card) {
    const { addCreditCard } = this.props;
    try {
      await addCreditCard({
        variables: {
          card: card.id
        }
      })
      message.success('Credit card sucessfully added', 10)
      this.setState({ loading: false, addCard: false })
    } catch (err) {
      Modal.error({
        title: "Error adding card",
        content: `Uh-oh! ${err}`
      })
      this.setState({ loading: false })
    }
  }
  makePrimary(id) {
    return true;
  }
  deleteCard(id) {
    return true;
  }
  render() {
    const { viewer } = this.props;
    return (
      <div className="max-form">
        {viewer.stripe_account && viewer.stripe_account.data.sources && viewer.stripe_account.data.sources.data && viewer.stripe_account.data.sources.data.length > 0 && (
        <CardList
          cards={viewer.stripe_account.data.sources.data}
          actions={card => (
            <ButtonGroup style={{ whiteSpace: 'nowrap' }}>
              <Tooltip placement="top" title="Make primary card"><Button type="primary" icon="credit-card" onClick={this.makePrimary.bind(this, card.id)} /></Tooltip>
              <Tooltip placement="top" title="Delete card"><Button type="danger" icon="delete" onClick={this.deleteCard.bind(this, card.id)} /></Tooltip>
            </ButtonGroup>
          )}
        />)}
        <AddCardForm onSubmit={this.addCreditCard} />
      </div>
    )
  }
}

const addCreditCardGQL = gql`
  mutation addCreditCard($card: String!){
    addCreditCard(card: $card) {
      stripe_account {
        data
      }
    }
  }
`

const GraphQLWrapper = graphql(addCreditCardGQL, {
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
  })(ManageCreditCards);

export default GraphQLWrapper;
