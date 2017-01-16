
const config = {}

config.club = {
  url: '/clubs/:club_id',
  crud: true,
  transformer(data) {
  	return {
      name: 'BMW Motor Club',
  		slug: 'bmw',  	
      profile_picture: 'https://pbs.twimg.com/profile_images/798844134404435969/fc6qzNNR_400x400.jpg',	
  		profile_cover: 'https://pbs.twimg.com/profile_banners/1545994664/1476365735/1500x500',
      slogan: 'Sheer Driving Pleasure'
  	}
  }
}

config.club_members = {
  url: '/clubs/:club_id/members',
  transformer(data) {
    return {
      page: [
        { user_id: 1, name: 'Billy johnson' },
        { user_id: 2, name: 'Mary Hilstead' }
      ]
    }
  }
}

config.club_about = {
  url: '/clubs/:club_id/about',
  transformer(data) {
    return {
      text: 'This is some text about the club and what it does.'
    }
  }
}

config.club_feed = {
  url: '/clubs/:club_id/feed',
  transformer(data) {
    return {
      page: [
        { item_id: 1, details: 'What is this?' },
        { item_id: 2, details: 'Here is a post about dog paws.' }
      ]
    }
  }
}

config.club_events = {
  url: '/clubs/:club_id/events',
  transformer(data) {
    return {
      page: [
        { event_id: 1, title: 'My cool event' },
        { event_id: 2, title: 'Some event in the park' },
      ]
    }
  }
}

config.club_admin = {
  url: '/clubs/:club_id/admin',
  transformer(data) {
    return {
      pages: []
    }
  }
}

config.club_join = {
  url: '/clubs/:club_id/join',
  transformer(data) {
    return {
      pages: []
    }
  }
}

export default config