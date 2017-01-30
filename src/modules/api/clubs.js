
const config = {}

config.club = {
  url: '/clubs/:club_id',
  crud: true,
  transformer(data) {
    return {
      name: 'BMW Motor Club',
      slug: 'bmw',
      images: {
        square: 'https://pbs.twimg.com/profile_images/798844134404435969/fc6qzNNR_400x400.jpg',
        thumb: 'https://pbs.twimg.com/profile_images/798844134404435969/fc6qzNNR_400x400.jpg',
        background: 'https://pbs.twimg.com/profile_banners/1545994664/1476365735/1500x500'
      },
      location: 'Brisbane, Australia'
    }
  }
}

config.club_members = {
  url: '/clubs/:club_id/members',
  transformer(data) {
    return {
      page: [
        { user_id: 1, name: 'Jeffry Boatwright', images: { thumb: '/img/user/01.jpg' } },
        { user_id: 2, name: 'Dexter Padmore', images: { thumb: '/img/user/02.jpg' } },
        { user_id: 3, name: 'Garry Bronson', images: { thumb: '/img/user/03.jpg' } },
        { user_id: 4, name: 'Edgar Shakesheave', images: { thumb: '/img/user/04.jpg' } },
        { user_id: 5, name: 'Maurice George', images: { thumb: '/img/user/05.jpg' } },
        { user_id: 6, name: 'Willis Fuller', images: { thumb: '/img/user/06.jpg' } },
        { user_id: 7, name: 'Irvin Horne', images: { thumb: '/img/user/07.jpg' } },
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
