import { connect } from 'react-redux'
import ClubView from '../components/ClubView'

const mapStateToProps = (state) => {
  return {
    club: {
      data: {
        name: 'BMW Motor Club',
        slug: 'bmw',
        images: {
          square: 'https://pbs.twimg.com/profile_images/798844134404435969/fc6qzNNR_400x400.jpg',
          thumb: 'https://pbs.twimg.com/profile_images/798844134404435969/fc6qzNNR_400x400.jpg',
          background: 'https://www.bmwusa.com/content/dam/bmwusa/BMWi/Overview/BMW_BMWi_Overview-BM5_PureBMW-image01.jpg'
        },
        location: 'Brisbane, Australia'
      }
    },
    club_members: {
      data: [
        { user_id: 1, name: 'Jeffry Boatwright', images: { thumb: '/img/user/01.jpg' } },
        { user_id: 2, name: 'Dexter Padmore', images: { thumb: '/img/user/02.jpg' } },
        { user_id: 3, name: 'Garry Bronson', images: { thumb: '/img/user/03.jpg' } },
        { user_id: 4, name: 'Edgar Shakesheave', images: { thumb: '/img/user/04.jpg' } },
        { user_id: 5, name: 'Maurice George', images: { thumb: '/img/user/05.jpg' } },
        { user_id: 6, name: 'Willis Fuller', images: { thumb: '/img/user/06.jpg' } },
        { user_id: 7, name: 'Irvin Horne', images: { thumb: '/img/user/07.jpg' } },
      ]
    },
    club_about: {
      data: {
        text: 'This is some text about the club and what it does.'
      }
    }
  }
}

export default connect(mapStateToProps)(ClubView)
