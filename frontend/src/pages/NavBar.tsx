import { Link } from "react-router-dom"
import { useAuth } from "@/components/context/AuthContext"

export default function NavBar() {
    const { user } = useAuth()

    if (!user || (user.role !== "clinician" && user.role !== "superuser")) {
        return null
    }

    return (
        <nav className="w-full px-4 py-3 bg-zinc-900 text-white text-sm shadow flex justify-between items-center">
            <span className="font-bold text-lg">PurrView</span>
            <div className="space-x-4">
                <Link to="/capture" className="hover:text-blue-400 underline">Capture</Link>
                <Link to="/review" className="hover:text-blue-400 underline">Review</Link>
                <Link to="/info" className="hover:text-blue-400 underline">Info</Link>
            </div>
        </nav>
    )
}
