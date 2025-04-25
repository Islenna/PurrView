// src/components/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type Role = "owner" | "clinician" | "superuser"

type User = {
    id: string
    email: string
    role: Role
}

type AuthContextType = {
    user: User | null
    loading: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSessionAndProfile = async () => {
            const { data: authData } = await supabase.auth.getUser()

            if (authData.user) {
                const userId = authData.user.id
                const email = authData.user.email ?? ""

                // Fetch profile row from `public.profiles`
                const { data: profile, error } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", userId)
                    .single()

                if (profile && !error) {
                    setUser({ id: userId, email, role: profile.role })
                } else {
                    console.warn("Profile not found for user:", userId)
                    setUser({ id: userId, email, role: "owner" }) // fallback default
                }
            }

            setLoading(false)
        }

        getSessionAndProfile()

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                getSessionAndProfile()
            } else {
                setUser(null)
            }
        })

        return () => {
            listener?.subscription.unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
