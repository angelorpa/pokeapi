import CONFIGURATION from '../config.json';

const getURL = (resource = null) =>
  new URL(
    `https://${CONFIGURATION.POKE_API.HOST}/api/v${
      CONFIGURATION.POKE_API.VERSION
    }/${resource || ''}`
  );

export const list = async (params = { offset: 0, limit: 10 }) => {
  try {
    const resource = getURL('pokemon');
    resource.search = new URLSearchParams(params).toString();

    const results = await fetch(resource);
    const asJson = await results.json();

    return asJson;
  } catch (error) {
    return null;
  }
};

export const detail = async (resource) => {
  try {
    const results = await fetch(resource);
    const asJson = await results.json();

    return asJson;
  } catch (error) {
    return null;
  }
};
