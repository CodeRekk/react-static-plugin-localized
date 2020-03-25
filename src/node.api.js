import fp from 'lodash/fp';
import { getAllRoutesWithData } from './routeBuilder';

export default (pluginOptions) => ({
  getRoutes: async (routes) => {
    const { config } = pluginOptions;

    if (!fp.isEmpty(routes)) {
      console.warn('Routes will be overridden, got following:', routes);
    }
    if (!config) {
      console.error('react-static-plugin-localized got no config!');
      return undefined;
    }

    return getAllRoutesWithData(config);
  },
});
