import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useNavigate } from "react-router-dom"

export default function Confirm() {
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.getSession().then(() => {
            navigate("/info") // or dashboard/home if you prefer
        })
    }, [])

    return (
        <div className="text-center mt-20 text-lg">
            🔄 Verifying your email... hang tight.
        </div>
    )
}
