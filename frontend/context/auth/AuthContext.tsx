import React, { createContext, useState, useContext, useEffect } from "react"
import { Button } from "react-native"
import * as AuthSession from "expo-auth-session"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ReactNode } from "react"
import { SCHWAB_CLIENT_ID, SCHWAB_CLIENT_SECRET, REDIRECT_URI as ENV_REDIRECT_URI } from "@env"


interface AuthContextType {
  userAccessToken: { accessToken: string } | null
  loginWithSchwab: () => Promise<void>
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

// schwab API credentials
const CLIENT_ID = SCHWAB_CLIENT_ID;
const CLIENT_SECRET = SCHWAB_CLIENT_SECRET;
export const REDIRECT_URI = AuthSession.makeRedirectUri({
  scheme: "expo-UI",
  path: ENV_REDIRECT_URI.replace("expo-UI://", ""),
})
console.log("REDIRECT_URI", REDIRECT_URI)

// required for useAuthRequest hook
const authRequestConfig = {
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
}
const discovery = {
  authorizationEndpoint: "https://api.schwab.com/oauth/authorize",
  tokenEndpoint: "https://api.schwab.com/oauth/token",
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [userAccessToken, setUserAccessToken] = useState<{ accessToken: string } | null>(null)
  // useAuthRequest hook to create an OAuth request, returns a promptAsync trigger function
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    authRequestConfig,
    discovery
  )

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params
      getTokenWithcode(code).then((accessToken) => {
        setUserAccessToken({ accessToken })
        AsyncStorage.setItem("accessToken", accessToken)
      })
    }
  }, [response])

  const loginWithSchwab = async () => {
    await promptAsync()
  }

  const getTokenWithcode = async (code: string) => {
    const response = await fetch("https://api.schwab.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }),
    })

    const data = await response.json()
    return data.access_token
  }

  return (
    <AuthContext.Provider value={{ userAccessToken, loginWithSchwab }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to access auth context
export function useAuth() {
  return useContext(AuthContext)
}

// Example Button Component
export function OAuthButton() {
  const authContext = useAuth()
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  const { loginWithSchwab } = authContext
  return <Button title="Login with Schwab" onPress={loginWithSchwab} />
}
