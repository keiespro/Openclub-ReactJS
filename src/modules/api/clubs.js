
export default {
  url: '/clubs/:club_id',
  crud: true,
  transformer(data) {
  	return {
  		club_id: 'jdjsoidccc',
  		slug: 'aslug',
  		name: 'Some Club',
  		other: 12345
  	}
  }
}