import { KeysLocalStorage } from './keys';

export const setItemLocalStorage = (key: keyof typeof KeysLocalStorage, value: unknown) => {
  const parsedValue = typeof value === 'string' ? value : JSON.stringify(value);
  window.localStorage.setItem(key, parsedValue);
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
};
