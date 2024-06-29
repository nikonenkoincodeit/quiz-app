export const getBrowserLanguage = () => {
  const lang =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage ||
    navigator.browserLanguage;

  return lang ? lang : "en";
};

export const prepareDataForSending = (items = []) => {
  return items.reduce((acc, item) => {
    acc[item.name] = item.selected;
    return acc;
  }, {});
};
