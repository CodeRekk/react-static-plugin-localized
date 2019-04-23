# react-static-plugin-localized

A Localization-Plugin for [React-Static](https://react-static.js.org).
This creates Localized Routes with a config-file and data in form of JSON-files.

## install

In an existing react-static site run:

```bash
$ npm i react-static-plugin-localized
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

## Example config-file
```json
{
  "defaultLanguage": "de",
  "languages": [
    {
      "id": "de",
      "dataPath": "data/locales"
    },
    "en"
  ],
  "pages": [
    {
      "id": "index",
      "path": "/",
      "templateFile": "src/pages/index",
      "translationKey": "index"
    },
    "about",
    {
      "id": "stories",
      "customData": {
        "propKey": "posts",
        "dataPath": "data/stories"
      },
      "children": {
        "path": "/post",
        "urlKeyPath": "id",
        "templateFile": "src/containers/Post",
        "propKey": "post",
        "dataPath": "data/stories"
      }
    },
    "404"
  ]
}
```
