import gql from 'graphql-tag';

export default gql`
  query user {
    user {
      _id
      email
      name
      notification_token
      helpdesk_jwt
      address {
        formatted_address
      }
      stripe_account {
        _id
        cards
        default_source
      }
      images {
        thumb
        square
      }
      memberships {
        _id
        club_id
        feed_permissions
        roles
        club{
          _id
          name
          images{
            square
            thumb
            background
          }
          slug
        }
        following
        notifications
        directory_visible
        display_email
        display_phone
        display_messenger
        bio
        subscription{
          start_date
          pending_approval
          auto_renew
          membership_plan{
            _id
            name
            prices{
              price{
                amount_float
              }
              setup_price{
                amount_float
              }
            }
          }
          last_renewal_date
        }
      }
    }
  }
`