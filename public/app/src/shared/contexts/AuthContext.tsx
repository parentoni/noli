import { createContext } from "react";
import { User } from "../domain/User";

export type AuthContextProps = {
  user: User | undefined,
  token: string | undefined 
}

export const AuthContextInitialValue: AuthContextProps = {
  user: undefined,
  token: undefined
}

export const AuthContext = createContext<AuthContextProps>(AuthContextInitialValue) 

export const AuthContextProvider = (props: React.PropsWithChildren) => {

  
  return(
    <AuthContext.Provider value={AuthContextInitialValue}>
      {props.children}
    </AuthContext.Provider>
  )
}
