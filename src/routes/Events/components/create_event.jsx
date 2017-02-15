import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { PageHeader } from 'layouts/PageLayout'
import { browserHistory } from 'react-router'
import CreateEventForm from './create_event_form'

const CreateEvent = ({ mutate }) => {

  const createTheEvent = values => {
    console.log(values)
    mutate({
      variables: values
    }).then(({ data }) => {
      browserHistory.push(`/event/${values.slug}`)
    }).catch(err => {
      console.log('Error creating event')
      console.log(err)
    })
  }

  return (
    <div className="card">
      <div className="card-body">
        <PageHeader title="Create Event"></PageHeader>
        <CreateEventForm onSubmit={createTheEvent}/>
      </div>
    </div>
  )
}

CreateEvent.propTypes = {
  mutate: PropTypes.func.isRequired
}

const createMutation = gql`
  mutation createEvent($slug: String!, $hosting_club_id: MongoID!, $event: eventInput!){
    createEvent(slug: $slug, hosting_club_id: $hosting_club_id, event: $event){
      _id
      slug
    }
  }
`

const clubList = gql`
  query currentViewer {
    user {
      clubs {
        _id
        slug
        name
        images {
          thumb
        }
      }
    }
  }
`

const CreateEventWithApollo = graphql(clubList)(graphql(createMutation)(CreateEvent))

export default CreateEventWithApollo
