import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const currentValue = JSON.parse(localStorage.getItem(key));
    return currentValue ? currentValue : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue, key]);

  return [storedValue, setStoredValue];
}
// export function getLocalStorage(key) {
//   const currentValue = JSON.parse(localStorage.getItem(key));
//   return currentValue ? currentValue : null;
// }
export function deleteLocalStorage(key) {
  localStorage.removeItem(key);
}
