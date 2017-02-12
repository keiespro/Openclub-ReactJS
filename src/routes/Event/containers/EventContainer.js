import { connect } from 'react-redux'
import EventComponent from '../components/Event'

const mapStateToProps = (state) => {
  return {
    event: {
      slug: 'test-event',
      name: 'Test Event',
      description: 'Some test event description will go here and will go for a couple of lines to show that the interface is capable of handling this sort of thing. Perhaps we may need to use an actual editor with this type of thing. We shall see.',
      imageSet: {
        background: ''
      },
      host: {
        slug: 'test',
        name: 'Test Club',
        imageSet: {
          square: ''
        }
      }
    }
  }
}


export default connect(mapStateToProps)(EventComponent)
