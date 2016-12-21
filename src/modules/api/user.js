
export default {
  url: '/user/',
  transformer(data) {
  	// return some dummy data until server is up
  	return {
  		first_name: 'Tester',
  		last_name: 'User',
  		other: 987654
  	}
  }
}