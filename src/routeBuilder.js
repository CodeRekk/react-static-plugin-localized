import path from 'path';
import fp from 'lodash/fp';

export function getAllRoutesWithData(config) {
  const { defaultLanguage, languages, pages } = config;
  return fp.flatMap(page => {
    const savePage = generateSavePageSettings(page);
    return fp.map(language => {
      const saveLanguage = generateSaveLanguageSettings(language);
      return {
        path: getRoutePathWithLanguage(savePage.path, fp.get('id', saveLanguage), defaultLanguage),
        template: savePage.templateFile,
        getData: () => {
          const customData = savePage.customData ? getCustomData(savePage.customData, saveLanguage) : null;
          return {
            ...getRouteData(savePage.translationKey, saveLanguage),
            ...customData
          }
        },
        children: savePage.children ? getChildrenData(savePage.children, saveLanguage) : null
      };
    }, languages);
  }, pages);
}

function generateSaveLanguageSettings(language) {
  if (typeof language === 'string') {
    return {
      id: language,
      dataPath: 'data/locales/'
    }
  } else {
    return {
      id: fp.get('id', language),
      dataPath: fp.propOr('data/locales/', 'dataPath', language)
    }
  }
}

function generateSavePageSettings(page) {
  if (typeof page === 'string') {
    return {
      id: page,
      path: `/${page}`,
      templateFile: `src/pages/${page}`,
      translationKey: page,
      customData: null,
      children: null
    };
  } else {
    const id = fp.get('id', page);
    return {
      id: id,
      path: fp.propOr(`/${id}`, 'path', page),
      templateFile: fp.propOr(`src/pages/${id}`, 'templateFile', page),
      translationKey: fp.propOr(id, 'translationKey', page),
      customData: generateSavePageCustomDataSettings(fp.get('customData', page)),
      children: generateSavePageChildrenSettings(fp.get('children', page))
    };
  }
}

function generateSavePageChildrenSettings(children) {
  if (!children) {
    return null;
  }
  return {
    path: fp.get('path', children),
    urlKeyPath: fp.propOr('id', 'urlKeyPath', children),
    templateFile: fp.get('templateFile', children),
    propKey: fp.propOr('data', 'propKey', children),
    dataPath: fp.get('dataPath', children)
  };
}

function generateSavePageCustomDataSettings(customData) {
  if (!customData) {
    return null;
  }
  return {
    dataPath: fp.get('dataPath', customData),
    propKey: fp.propOr('data', 'propKey', customData)
  };
}

function getRouteData(key, language) {
  const locale = language.id;
  const completeTranslations = require(path.resolve(`${language.dataPath}/${locale}`));
  const translations = fp.get(key, completeTranslations);
  return {locale, translations};
}

function getCustomData(config, language) {
  const locale = language.id;
  const data = require(path.resolve(`${config.dataPath}/${locale}`));
  return {locale, [config.propKey]: data};
}

function getChildrenData(config, language) {
  const locale = language.id;
  const data = require(path.resolve(`${config.dataPath}/${locale}`));
  return fp.map(child => {
    return {
      path: `${config.path}/${fp.get(config.urlKeyPath, child)}`,
      template: config.templateFile,
      getData: () => ({[config.propKey]: child, locale})
    };
  }, data);
}

function getRoutePathWithLanguage(path, language, defaultLanguage) {
  if ( language === defaultLanguage ) {
    return path;
  } else {
    return `en${path}`;
  }
}
