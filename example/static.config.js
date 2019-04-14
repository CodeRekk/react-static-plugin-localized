export default {
  plugins: [
    [
      require.resolve('./loc-plugin/node.api.js'),
      {
        config: require('./build.config')
      }
    ]
  ]
}
