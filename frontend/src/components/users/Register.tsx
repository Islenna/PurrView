// src/pages/Register.tsx
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            toast.error(error.message)
        } else {
            toast.success("Account created! Check your email.")
            navigate("/info")
        }
    }

    return (
        <div className="max-w-sm mx-auto mt-20 space-y-4">
            <h1 className="text-2xl font-bold text-center">Register</h1>
            <form onSubmit={handleRegister} autoComplete="on" className="space-y-4">
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
                    autoComplete="new-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full">
                    Create Account
                </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground">
                Already registered?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    )
}
