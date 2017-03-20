
export default {
  url: '/users/:user_id',
  transformer(data) {
    // return some dummy data until server is up
    // currently returns the logged in user information
    return {
      first_name: 'Jennifer',
      last_name: 'Terrigalsonson',
      profile_picture: 'http://static.anakinworld.com/uploads/entries/square_medium/personnage-jabba-the-hutt.jpg',
      club_memberships: [
        {
          id: 12345,
          name: 'BMW Motor Club',
          slug: 'bmw',
          profile_picture: 'https://pbs.twimg.com/profile_images/798844134404435969/fc6qzNNR_400x400.jpg'
        },
        {
          id: 9865,
          name: 'Terrace Rowing',
          slug: 'terracerowing',
          profile_picture: 'https://pbs.twimg.com/profile_images/641277552783310849/0F1X6Yae.jpg'
        }
      ]
  	}
  }
}