// src/pages/Register.tsx
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Link } from "react-router-dom"

export default function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async () => {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) {
            toast.error(error.message)
        } else {
            toast.success("Account created! Check your email.")
        }
    }

    return (
        <div className="max-w-sm mx-auto mt-20 space-y-4">
            <h1 className="text-2xl font-bold text-center">Register</h1>
            <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleRegister} className="w-full">
                Create Account
            </Button>
            <p className="text-center text-sm text-muted-foreground">
                Already registered?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    )
}
