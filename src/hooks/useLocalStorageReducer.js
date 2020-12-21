import { useReducer, useEffect } from 'react';

function UseLocalStorageReducer(key, defaultVal, reducer) {
  // make piece of state based off value in localstorage
  const [state, dispatch] = useReducer(reducer, defaultVal, () => {
    let val;
    try {
      val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal));
    } catch (err) {
      val = defaultVal;
    }
    return val;
  });
  // use useEffect to update localstorage when state change
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return [state, dispatch];
}
export default UseLocalStorageReducer;