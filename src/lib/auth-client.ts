import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
})

const { useSession } = createAuthClient()

export const useAuthSession = () => {
    const { data, error, isPending } = useSession()
    return { data, error, isPending }
}