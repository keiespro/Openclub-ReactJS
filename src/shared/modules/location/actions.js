
// Constants
export const LOCATION_CHANGE = 'LOCATION_CHANGE'

// Actions
export function locationChange (location = '/') {
  return {
    type    : LOCATION_CHANGE,
    payload : location
  }
}

// Action Creators
export const updateLocation = ({ dispatch }) => {
  return (nextLocation) => dispatch(locationChange(nextLocation))
}