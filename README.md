# react-static-plugin-localized

A Localization-Plugin for [React-Static](https://react-static.js.org).
This creates Localized Routes with a config-file and data in form of JSON-files.

## install

In an existing react-static site run:

```bash
$ npm i git+https://github.com/woffrek/react-static-plugin-localized.git
```

Then add the plugin to your `static.config.js` with a valid `config` file or object:

```javascript
export default {
  plugins: [
    [
      'react-static-plugin-localized',
      {
        config: require('./build.config')
      }
    ]
  ]
}
```