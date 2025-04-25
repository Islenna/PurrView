// src/pages/Login.tsx
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Link } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            toast.error(error.message)
        } else {
            toast.success("Logged in!")
            navigate("/info")
        }
    }

    return (
        <div className="max-w-sm mx-auto mt-20 space-y-4">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <form onSubmit={handleLogin} autoComplete="on" className="space-y-4">
                <Input
                    type="email"
                    name="email"
                    autoComplete="username"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full">
                    Log In
                </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                    Create one
                </Link>
            </p>
        </div>
    )
}
