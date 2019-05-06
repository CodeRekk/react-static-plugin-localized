import path from 'path';
import fp from 'lodash/fp';

export function generateSaveLanguageSettings(language) {
  if (typeof language === 'string') {
    return {
      id: language,
      dataPath: 'data/locales',
    };
  }
  return {
    id: fp.get('id', language),
    dataPath: fp.propOr('data/locales', 'dataPath', language),
  };
}

export function generateSavePageChildrenSettings(children) {
  if (!children) {
    return null;
  }
  return {
    path: fp.get('path', children),
    urlKeyPath: fp.propOr('id', 'urlKeyPath', children),
    templateFile: fp.get('templateFile', children),
    propKey: fp.propOr('data', 'propKey', children),
    dataPath: fp.get('dataPath', children),
  };
}

export function generateSavePageCustomDataSettings(customData) {
  if (!customData) {
    return null;
  }
  return {
    dataPath: fp.get('dataPath', customData),
    propKey: fp.propOr('data', 'propKey', customData),
  };
}

export function generateSavePageSettings(page) {
  if (typeof page === 'string') {
    return {
      id: page,
      path: `/${page}`,
      templateFile: `src/pages/${page}`,
      translationKey: page,
      customData: null,
      children: null,
    };
  }
  const id = fp.get('id', page);
  return {
    id,
    path: fp.propOr(`/${id}`, 'path', page),
    templateFile: fp.propOr(`src/pages/${id}`, 'templateFile', page),
    translationKey: fp.propOr(id, 'translationKey', page),
    customData: generateSavePageCustomDataSettings(fp.get('customData', page)),
    children: generateSavePageChildrenSettings(fp.get('children', page)),
  };
}

export function getRouteData(key, language) {
  const locale = language.id;
  const completeTranslations = require(path.resolve(`${language.dataPath}/${locale}`));
  const translations = fp.get(key, completeTranslations);
  return { locale, translations };
}

export function getCustomData(config, language) {
  const locale = language.id;
  const data = require(path.resolve(`${config.dataPath}/${locale}`));
  return { [config.propKey]: data };
}

export function getChildrenData(config, language, parentPath, common) {
  const locale = language.id;
  const data = require(path.resolve(`${config.dataPath}/${locale}`));
  return fp.map((child) => {
    const childPath = `${config.path}/${fp.get(config.urlKeyPath, child)}`;
    return {
      path: childPath,
      template: config.templateFile,
      getData: () => ({
        [config.propKey]: child, locale, location: parentPath + childPath, common,
      }),
    };
  }, data);
}

export function getRoutePathWithLanguage(location, language, defaultLanguage) {
  if (language === defaultLanguage) {
    return location;
  }
  return `${language}${location}`;
}

export function getAllRoutesWithData(config) {
  const {
    defaultLanguage, languages, pages, commonData, seoData,
  } = config;
  return fp.flatMap((page) => {
    const savePage = generateSavePageSettings(page);
    return fp.map((language) => {
      const saveLanguage = generateSaveLanguageSettings(language);
      const common = commonData ? require(path.resolve(`${commonData}/${saveLanguage.id}`)) : undefined;
      const seo = seoData ? fp.get(savePage.id, require(path.resolve(`${seoData}/${saveLanguage.id}`))) : undefined;
      return {
        path: getRoutePathWithLanguage(savePage.path, fp.get('id', saveLanguage), defaultLanguage),
        template: savePage.templateFile,
        getData: () => {
          const customData = savePage.customData
            ? getCustomData(savePage.customData, saveLanguage)
            : undefined;
          return {
            ...getRouteData(savePage.translationKey, saveLanguage),
            ...customData,
            location: savePage.path,
            common,
            seo,
          };
        },
        children: savePage.children
          ? getChildrenData(savePage.children, saveLanguage, savePage.path, common)
          : undefined,
      };
    }, languages);
  }, pages);
}
