import gql from 'graphql-tag';

export const decline = gql`
  mutation deleteInivte($invitationId: MongoID!) {
    deleteInvite(invitationId: $invitationId) {
      _id
    }
  }
`

export const accept = gql`
  mutation acceptInvite($invitationId: MongoID!) {
    acceptInite(invitationId: $invitationId) {
      _id
    }
  }
`
