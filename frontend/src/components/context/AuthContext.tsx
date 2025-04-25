import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

type User = {
    id: string
    email: string
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
        const getSession = async () => {
            const { data } = await supabase.auth.getUser()
            if (data.user) {
                setUser({ id: data.user.id, email: data.user.email ?? "" })
            }
            setLoading(false)
        }

        getSession()

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            
            if (session?.user) {
                setUser({ id: session.user.id, email: session.user.email ?? "" })
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
