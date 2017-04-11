import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { Field, reduxForm } from 'redux-form'
import { Menu, message, Col, Row, Tooltip } from 'antd'
import { Group as ButtonGroup } from 'antd/lib/button'
import { required, maxLength, email } from 'utils/form_validation/errors'
import gql from 'graphql-tag'
import { stringKeyObjectFilter, shallowObjectDiff } from 'utils/object_helpers'
import CardList from 'components/payment/CardList'
import { ContentArea, ContentPage } from 'components/layout'

import {
  Form,
  FieldContainer,
  DatePicker,
  Input,
  Address,
  Button,
  ImageUploader,
} from 'components/form_controls'

import { StripeCreditCardField } from 'components/custom_form_fields'

class Profile extends Component {
  static propTypes = {
    form_values: PropTypes.object,
    token: PropTypes.string,
    updateProfile: PropTypes.func,
    submitting: PropTypes.bool,
    handleSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    viewer: PropTypes.object
  }
  constructor(props) {
    super(props)

    this.state = {
      addCard: false,
      cardSubmit: () => Promise.reject('No card details added.'),
      selectedKeys: [],
      loading: false
    }

    this.anchors = {};

    this.handleCreditCardInput = this.handleCreditCardInput.bind(this);
    this.handleCreditCardSubmit = this.handleCreditCardSubmit.bind(this);
    this.toggleCreditCardAdd = this.toggleCreditCardAdd.bind(this);
    this.menuClick = this.menuClick.bind(this);
  }
  static async handleSubmit(values, dispatch, props) {
    const { updateProfile, initialValues, registeredFields } = props;
    // get clean value object and image diff
    const userProfile = stringKeyObjectFilter(values, registeredFields)
    userProfile.images = shallowObjectDiff(userProfile.images, values.images)
    console.log(userProfile)

    try {
      await updateProfile({
        variables: {
          user: userProfile
        }
      });
      message.success('Profile successfully updated', 10)
    } catch (err) {
      message.error(`Uh-oh! ${err}`, 20)
    }
  }
  async handleCreditCardSubmit(e) {
    e.preventDefault();

    const { addCreditCard } = this.props;
    this.setState({ loading: true })
    const card = await this.state.cardSubmit();

    console.log(card);

    try {
      await addCreditCard({
        variables: {
          card: card.id
        }
      })
      message.success('Credit card sucessfully added', 10)
      this.setState({ loading: false, addCard: false })
    } catch (err) {
      message.error(`Uh-oh! ${err}`, 20)
      this.setState({ loading: false })
    }
  }
  handleCreditCardInput(submit) {
    this.setState({
      cardSubmit: submit
    });
  }
  toggleCreditCardAdd() {
    this.setState({
      addCard: !this.state.addCard
    })
  }
  inView(el) {
    const { top, bottom } = el.getBoundingClientRect();
    return top >= 0 && bottom <= window.innerHeight;
  }
  scroll() {
    const keys = Object.keys(this.anchors);
    let viewKeys = [];
    keys.forEach(anchor => {
      if (this.inView(this.anchors[anchor])) {
        viewKeys.push(anchor)
      }
    })
    if (viewKeys.length > 0) return this.setState({ selectedKeys: [viewKeys.slice(viewKeys.length - 2, viewKeys.length)]})
    this.setState({ selectedKeys: [] })
  }
  menuClick(e) {
    this.anchors[e.key].scrollIntoView();
  }
  componentDidMount() {
    document.addEventListener('scroll', this.scroll);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.scroll)
  }

  render() {
    const { token, viewer } = this.props;
    console.log(this.props)
    return (
        <ContentArea>
            <ContentPage>
              <Row gutter={20}>
                <Col xs={{span: 0}} md={{span: 6}}>
                  <Menu
                    onClick={this.menuClick}
                    selectedKeys={this.state.selectedKeys}
                    mode="inline"
                  >
                  <Menu.ItemGroup key="sub1" title={<span>Profile Settings</span>}>
                    <Menu.Item key="overview">Overview</Menu.Item>
                    <Menu.Item key="profile">Portable Profile</Menu.Item>
                    <Menu.Item key="payment">Payment Details</Menu.Item>
                  </Menu.ItemGroup>
                  </Menu>
                </Col>
                <Col xs={{span: 24}} md={{span: 18}}>
                  <h3 className="bottom-gap-large" id="overview" ref={overview => { this.anchors.overview = overview }}>OpenClub Profile</h3>
                  <hr className="bottom-gap" />
                  <div className="bottom-gap-large">
                    <p>OpenClub securely stores your data and only shares certain bits with the clubs that you join. Your payment details are never shared and are stored securely with us.</p>
                  </div>
                  <hr className="bottom-gap-large" />
                    <h3 className="bottom-gap" ref={profile => { this.anchors.profile = profile }}>Portable Profile</h3>
                    <hr className="bottom-gap" />
                    <div className="bottom-gap-large">
                      <p className="bottom-gap">This is your portable profile. This data is shared with clubs you join. Your profile phot and name may appear publicly if you post on a public wall.</p>
                      <Form onSubmit={this.props.handleSubmit}>
                        <FieldContainer required title="Name">
                          <Field
                            name="name"
                            type="text"
                            help="Full Name"
                            validate={[required, maxLength(64)]}
                            component={Input}
                          />
                        </FieldContainer>
                        <FieldContainer title="Profile Photo">
                          <Field
                            name="images.thumb"
                            component={ImageUploader}
                            token={token}
                            postname="thumb"
                            action={`${process.env.ICEPICK_URL}/upload/image/thumb`}
                          />
                        </FieldContainer>
                        <FieldContainer title="Address">
                          <Field
                            name="address"
                            help="Enter your address"
                            validate={[maxLength(64)]}
                            component={Address}
                          />
                        </FieldContainer>
                        <FieldContainer title="Contact Email">
                          <Field
                            name="email"
                            type="text"
                            help="Email address"
                            validate={[email]}
                            component={Input}
                          />
                        </FieldContainer>
                        <Button icon={this.props.submitting ? 'loading' : ''} type="primary" htmlType="submit" disabled={this.props.submitting}>Save Profile</Button>
                      </Form>
                    </div>
                    <h3 className="bottom-gap-large" id="payment" ref={payment => { this.anchors.payment = payment }}>Payment Details</h3>
                    <hr className="bottom-gap" />
                    <div className="bottom-gap-large">
                      {viewer.stripe_account && viewer.stripe_account.data.sources && viewer.stripe_account.data.sources.data && viewer.stripe_account.data.sources.data.length > 0 ? (
                        <div>
                          <div>
                            <p>Credit Cards:</p>
                              <CardList
                                cards={viewer.stripe_account.data.sources.data}
                                actions={card => (
                                  <div>
                                    <ButtonGroup style={{ whiteSpace: 'nowrap' }}>
                                      <Tooltip placement="top" title="Make primary card"><Button type="primary" icon="credit-card" /></Tooltip>
                                      <Tooltip placement="top" title="Delete card"><Button type="danger" icon="delete" /></Tooltip>
                                    </ButtonGroup>
                                  </div>
                                )}
                              />
                          </div>
                          <small className="bottom-gap">You can store up to 5 cards within OpenClub.</small>
                        </div>
                      ) : (
                        <p className="bottom-gap">You can store up to 5 cards within OpenClub. To add a card, click the button below.</p>
                      )}
                      <hr className="bottom-gap" />
                        {this.state.addCard ? (
                          <form onSubmit={this.handleCreditCardSubmit}>
                            <FieldContainer title="Add Card" id="payment" ref={payment => { this.anchors.payment = payment }}>
                              Enter the card you wish to add.
                              <StripeCreditCardField input={{onChange: this.handleCreditCardInput}} />
                              <ButtonGroup>
                                <Button className="bottom-gap" icon="plus" type="primary" onClick={this.handleCreditCardSubmit} loading={this.state.loading}>Add Card</Button>
                                <Button className="bottom-gap" icon="cross" type="danger" onClick={this.toggleCreditCardAdd} disabled={this.state.loading}>Cancel</Button>
                              </ButtonGroup>
                            </FieldContainer>
                          </form>
                        ) : (
                          <Button className="bottom-gap" icon="plus" type="primary" onClick={this.toggleCreditCardAdd}>Add Card</Button>
                        )}
                    </div>
                </Col>
              </Row>
            </ContentPage>
        </ContentArea>
    );
  }
}

const ProfileReduxForm = reduxForm({
  form: 'userProfile',
  enableReinitialize: true,
  onSubmit: Profile.handleSubmit
})(Profile)

const updateProfileGQL = gql`
  mutation updateProfile($user:userUpdate!){
    updateUser(user: $user) {
      name
      email
      address {
        formatted_address
      }
      images {
        thumb
        square
      }
      stripe_account {
        data
      }
    }
  }
`

const addCreditCardGQL = gql`
  mutation addCreditCard($card: String!){
    addCreditCard(card: $card) {
      stripe_account {
        data
      }
    }
  }
`

const userProfileGQL = gql`
  query userProfile {
    user {
      _id
      email
      name
      address {
        formatted_address
      }
      images {
        thumb
        square
      }
      stripe_account {
        data
      }
    }
  }
`

const ProfileApollo = compose(
  graphql(userProfileGQL, {
      skip: ownProps => !ownProps.token,
      props: ({ data }) => ({
        refetch: data.refetch,
        initialValues: data.user
      })
    }
  ),
  graphql(updateProfileGQL, {
    name: 'updateProfile',
    options: {
      updateQueries: {
        currentViewer: (prev, { mutationResult }) => ({
          user: {
            ...prev.user,
            ...mutationResult.data.updateUser
          }
        })
      }
    }
  }),
  graphql(addCreditCardGQL, {
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
  }),
)(ProfileReduxForm)

export default connect(state => ({
  token: state.auth.token
}))(ProfileApollo)
