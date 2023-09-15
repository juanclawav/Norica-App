import { createContext, useContext, useReducer } from "react";
import { initialValues, storeReducer } from "./storeReducer";

const StoreContext = createContext({});

interface Props {
  children: JSX.Element;
}

// useReducer, y el useContext

export const StoreProvider = ({ children }: Props) => {
  return (
    <StoreContext.Provider value={useReducer(storeReducer, initialValues)}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext<any>(StoreContext)[0];
export const useDispatch = () => useContext<any>(StoreContext)[1];
