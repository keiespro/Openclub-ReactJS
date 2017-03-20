
import { LOCATION_CHANGE } from './actions'

// Reducer
const initialState = null
export default (state = initialState, action) => {
  return action.type === LOCATION_CHANGE
    ? action.payload
    : state
}