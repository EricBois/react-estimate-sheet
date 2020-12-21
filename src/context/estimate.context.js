import React, { createContext } from 'react';
import estimateReducer from '../reducers/estimate.reducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

export const EstimateContext = createContext();
export const DispatchContext = createContext();

export function EstimatesProvider(props) {
  const [estimates, dispatch] = useLocalStorageReducer("estimates", [], estimateReducer);
  return (
    <EstimateContext.Provider value={estimates}>
      <DispatchContext.Provider value={dispatch }>
        {props.children}
      </DispatchContext.Provider>
    </EstimateContext.Provider>
  );
}
