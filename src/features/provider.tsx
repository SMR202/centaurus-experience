import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Action, DemoState, initialState, reducer } from "./state";
const key = "centaurus-demo-v1";
const Context = createContext<{
  state: DemoState;
  dispatch: React.Dispatch<Action>;
  ready: boolean;
  storageError: boolean;
}>({
  state: initialState(),
  dispatch: () => {},
  ready: false,
  storageError: false,
});
export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((raw) => {
        if (raw) {
          const parsed = JSON.parse(raw);
          if (
            parsed.version === 1 &&
            Array.isArray(parsed.saved) &&
            Array.isArray(parsed.claims) &&
            parsed.member &&
            parsed.receipt &&
            typeof parsed.clock === "number"
          )
            dispatch({
              type: "hydrate",
              state: { ...initialState(), ...parsed },
            });
        }
      })
      .catch(() => setStorageError(true))
      .finally(() => setReady(true));
  }, []);
  useEffect(() => {
    if (ready)
      AsyncStorage.setItem(key, JSON.stringify(state)).catch(() =>
        setStorageError(true),
      );
  }, [state, ready]);
  return (
    <Context.Provider value={{ state, dispatch, ready, storageError }}>
      {children}
    </Context.Provider>
  );
}
export const useDemo = () => useContext(Context);
