import gql from 'graphql-tag';

export default gql`
  query club($slug: String!) {
    club(slug: $slug) {
      _id
      name
      images{
        thumb
        background
        square
      }
      slug
      settings{
        directory_privacy
        feed_permissions
        feed_public_permissions
        theme
      }
      membership_plans{
        _id
        name
        description
        public
        prices{
          _id
          duration
          price{
            amount
            amount_float
          },
          setup_price{
            amount
            amount_float
          }
        }
      }
      details{
        about
        location
        minimum_age
        founded
        email
        phone
        website
        facebook
        instagram
        linkedin
        twitter
      }
      stripe_account{
        data
      }
    }
  }
`
