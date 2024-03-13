import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Api, noliApi } from "../core/Api";
import { Either, left, right } from "../core/either";
import { User, UserProps } from "../domain/User";

export type AuthContextProps = {
  user: User | undefined,
  login: (email: string, password: string) => Promise<Either<Response, null>>,
  getToken: () => string | undefined

}

export const AuthContextInitialValue: AuthContextProps = {
  user: undefined,
  getToken: () => "",
  login: async () => left(new Response())
}

export const AuthContext = createContext<AuthContextProps>(AuthContextInitialValue) 

export const AuthProvider = (props: React.PropsWithChildren) => {

  const [user, setUser] = useState<User | undefined>(undefined)

  /**
   * Fetch user data.
   * */
  const fetchUser = async (token: string) => {
    const response = await noliApi.get("/user/me", token)
    if (response.isLeft()) {
      return
    }

    setUser(new User(response.value))
  }

  /**
   * Login user
   *
   * @param {string} email
   * @param {string} password
   *
   * @returns {Either<Response, null>}
   * */
  const login = async (email: string, password: string): Promise<Either<Response, null>> => {
    const response = await noliApi.post("/auth/login", { email, password }, undefined) 
    if (response.isLeft()) {
      return left(response.value)
    }

    const token = response.value.token
    saveToken(token)

    await fetchUser(token)
    return right(null)
  }


  const saveToken = (token: string) => {
    localStorage.setItem("auth_token", token)
  }

  // get local storage token
  const getToken = (): string | undefined => {
    const token = localStorage.getItem("auth_token")
    if (token === null) {
      return undefined
    }

    return token
  }



  // Get user on token change
  useEffect(() => {
    const token = getToken()
    if (token === undefined) {
      setUser(undefined)
      return
    }

    fetchUser(token)
  }, [])
  
  return(
    <AuthContext.Provider value={{user, login, getToken}}>
      {props.children}
    </AuthContext.Provider>
  )
}

// Auth context hook
export const useAuth = (): AuthContextProps => {
  return useContext(AuthContext)
}
