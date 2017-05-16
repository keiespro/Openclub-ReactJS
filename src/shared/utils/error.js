const rep = s => s.replace('GraphQL error: ', '');
export default error => typeof error === 'string' ? rep(error) : rep(error.message);
