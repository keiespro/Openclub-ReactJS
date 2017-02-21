module.exports = {
  plugins: [
    require('cssnano')({
      discardComments: {
      removeAll: true
      },
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: true,
      sourcemap: true
    }),
    require('autoprefixer')({
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    })
  ]
}
