import React, { createContext, useContext } from 'react'

export const Context = createContext<string>('')

export function useSomething(): string {
  return useContext(Context)!
}

export const Provider: React.FC = ({ children }) => {
  return <Context.Provider value="somethin2g">{children}</Context.Provider>
}
