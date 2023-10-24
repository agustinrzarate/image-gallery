import { useState } from 'react';
import { KeysLocalStorage } from '@/app/localStorage/keys';

export const useLocalStorage = (keyName: KeysLocalStorage, defaultValue: unknown) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      }
      window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue: unknown) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      throw new Error('Error while setting value in localStorage');
    }
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};
