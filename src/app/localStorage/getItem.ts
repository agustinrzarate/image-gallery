export const getItemLocalStorage = (key: string) => {
  const valueKey = window.localStorage.getItem(key);
  return valueKey;
};
