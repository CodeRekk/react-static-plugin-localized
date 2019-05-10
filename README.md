[![CircleCI](https://circleci.com/gh/woffrek/react-static-plugin-localized/tree/master.svg?style=svg)](https://circleci.com/gh/woffrek/react-static-plugin-localized/tree/master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6b6914c553ab443796549eb03a040bd9)](https://www.codacy.com/app/woffrek/react-static-plugin-localized?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=woffrek/react-static-plugin-localized&amp;utm_campaign=Badge_Grade)
[![npm version](https://badge.fury.io/js/react-static-plugin-localized.svg)](https://badge.fury.io/js/react-static-plugin-localized)

# react-static-plugin-localized

A Localization-Plugin for [React-Static](https://react-static.js.org).
This creates Localized Routes with a config-file and data in form of JSON-files.

## Installation

In an existing react-static site run:

```bash
$ npm i react-static-plugin-localized
```

## Example
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
  "commonData": "data/common",
  "seoData": "data/seo",
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

## Resulting Routes
This plugin will build localized routes in following structure:
1. for all pages in the `defaultLanguage`: `/[pageRoute]` (for example`/about`)
2. for all pages in not-default-language: `/[language-id]/[pageRoute]` (for example`/en/about`)

## Configuration
### Default-Language Configuration
The default-Language is simply set with a string such as `de` in the example above.

### Language Configuration
If an language is given as string (here `en` from example above) it will be translated to:
```json
{
  "id": "en",
  "dataPath": "data/locales"
}
```
If an object is given the id is required, but the dataPath is optional.

In the dataPath of language the Plugin will get the file for each given language.
For the above Example there are 2 files in that folder: `de.json` and `en.json`.

### CommonData (since 0.8)
The data in the given path-string will be read for each language (like normal translation/page-data `[path]/[languageId].json`) and will be given to every page and their children as a prop with the key `common`.
This can be used for translations of the header/footer for example.
BE AWARE! -> here the complete file is given to every page/child!

### SeoData (since 0.9)
Works like `CommonData` above but it gives only the data under the key of the page-id (`about` for example) to pages.
(Children don't get this, their Seo-Info should be placed in their own 'childrenData-Files'/customData).

### Page Configuration
Each page has:
1. `id`
2. `path` -> which is the route it can be opened in the build
3. `templateFile` -> the React-Component-File which will be rendered
4. `translationKey` -> the key which will be read from the language-file (json)
  and then given to the templateFile in `useRouteData` (from ReachRouter-React-Static)
  in the `translations`-prop.
5. `customData` with: `propKey` where it can be read from router (like translations)
  and `dataPath` which has a json-file for every language.
6. `children` with: `path` as subroute from parent where it can be opened (`parent/child/slug`),
  `urlKeyPath` is the key from the data-file which is used as slug in the route, `templateFile` is the file which will be rendered (like the templateFile of pages), `propKey` is the key on which the data will be given to the Component in the templateFile and `dataPath` like the others where you have to plate a json-file for every language where the plugin reads the data out of

If an page is given as string (here `about` from example above) it will be translated to:
```json
{
  "id": "about",
  "path": "/about",
  "templateFile": "src/pages/about",
  "translationKey": "about",
  "customData": null,
  "children": null
}
```

### Data-Files
#### Language-Files
In the configured dataPaths the plugin looks for a file `[id].json` to read the data from it.
For example if it loads the data for your `index`-page and the language `en` it will get the file `/data/locales/en.json` (for the example-config above).
This file should look something like this:
```json
{
  "index": {
    "header": "welcome de"
  },
  "about": {
    "header": "about de"
  },
  "404": {
    "header": "404 de"
  }
}
```
The Plugin takes the 'index'-key and will give it to the getRouteData-function at the propKey translations.

#### ChildrenData-Files
For `customData` and the data of page-childs you can choose the propKey in which it is given to your template-component.
The DataFiles are filled with an array this time. (To create a route for every child)
```json
[
  {
    "id": 1,
    "title": "post 1 title en",
    "body": "post 1 body en"
  },
  {
    "id": 2,
    "title": "post 1 title en",
    "body": "post 1 body en"
  }
]
```

#### CustomData and CommonData
The page (or every page and children in case of `commonData`) will receive the complete file.
```json
{
  "header": {
    "home": "Start",
    "about": "Über uns"
  },
  "footer": {
    "AGB": "Datenschutz"
  }
}

```

#### SeoData
Every Page will get the `title` and `description` under their id-key as the propkey `seo`.
```json
{
  "index": {
    "title": "index en",
    "description": "index-page en"
  },
  "about": {
    "title": "about en",
    "description": "about-page en"
  },
  "stories": {
    "title": "stories en",
    "description": "stories-page en"
  }
}

```

### Reading the Data in your Components
#### Reading translation/language/common-Data
From `useRouteData` you will get the translationData, the current locale and location (for example `/about`).
The current locale and location can be used for routing.
You dont have to worry about the language for the texts, you only get the ones for the current language. (This saves data which has to be sent to the client)
```jsx harmony
import Header from 'Header.jsx';
import { useRouteData } from 'react-static';
export default () => {
  const { translations, locale, location, common, seo } = useRouteData();
  /*
    locale for example 'en'
    location for example '/stories/post/1'
  */
  return (
    <>
      <SeoHelmet data={seo} />
      <Header data={common.header} />
      <p>Current locale: {locale}</p>
      <p>Current location: {location}</p>
      <h1>Translated header {translations.header}</h1>
    </>
  );
}
```

#### Reading custom/children-Data
From `useRouteData` you will get the custom- or children-Data and the current locale.
You only get the current dataSet in the current language.
This means if you open `/en/blog/post/1` for example you only get the post with the id `1` in the language `en`.
```jsx harmony
import { useRouteData } from 'react-static';
export default () => {
  const { post, locale } = useRouteData();
  return (
    <>
      <p>Current locale: {locale}</p>
      <h1>Currrent Post-Tilte {post.title}</h1>
    </>
  );
}
```
