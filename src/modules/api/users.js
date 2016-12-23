
export default {
  url: '/users/:user_id',
  transformer(data) {
    // return some dummy data until server is up
    return {
      first_name: 'John',
      last_name: 'Doe',
      other: 987654
  	}
  }
}