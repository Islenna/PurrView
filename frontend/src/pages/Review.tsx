import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/context/AuthContext"
import { toast } from "sonner"

export default function Review() {
    const { user } = useAuth()
    const [submissions, setSubmissions] = useState<any[]>([])
    const [current, setCurrent] = useState(0)
    const [score, setScore] = useState<number | null>(null)
    const [notes, setNotes] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user || (user.role !== "clinician" && user.role !== "superuser")) return

        const fetchSubmissions = async () => {
            const { data, error } = await supabase
                .from("submissions")
                .select("*")
                .is("photo_score", null) // only check this
                .order("created_at", { ascending: true })

            console.log("Fetched submissions:", data)
            console.log("Fetch error:", error)

            if (error) {
                toast.error("Failed to fetch submissions")
            } else {
                setSubmissions(data || [])
            }

            setLoading(false)
        }


        fetchSubmissions()
    }, [user])

    const handleSubmit = async () => {
        if (!user) return
        const submission = submissions[current]
        if (!submission) return

        const { error } = await supabase
            .from("submissions")
            .update({
                photo_score: score,
                clinician_notes: notes,
                reviewed_by_uuid: user.id,
                reviewed_at: new Date().toISOString(),
            })
            .eq("id", submission.id)

        if (error) {
            toast.error("Failed to submit review")
            return
        }

        toast.success("Review submitted")
        setSubmissions((prev) => prev.filter((_, i) => i !== current))
        setCurrent(0)
        setScore(null)
        setNotes("")
    }

    if (!user || (user.role !== "clinician" && user.role !== "superuser")) {
        return <p className="text-center mt-10">You do not have access to this page.</p>
    }

    if (loading) return <p className="text-center mt-10">Loading submissions...</p>
    if (submissions.length === 0) return <p className="text-center mt-10">No submissions to review 🎉</p>

    const currentSubmission = submissions[current]

    return (
        <div className="max-w-xl mx-auto mt-10 space-y-4">
            <h1 className="text-2xl font-bold text-center">Review Eye Photo</h1>
            <img
                src={`https://pkcbjuhxbfjeoafwybpf.supabase.co/storage/v1/object/public/eye-photos/${currentSubmission.image_path}`}
                alt="Submission"
                className="rounded shadow w-full"
            />
            <div>
                <p className="text-sm text-muted-foreground">
                    Submitted by: <strong>{currentSubmission.owner_first} {currentSubmission.owner_last}</strong><br />
                    Pet: <strong>{currentSubmission.pet_name}</strong> | Eye: <strong>{currentSubmission.eye_side}</strong>
                </p>
            </div>
            <div className="space-y-2">
                <select
                    value={score ?? ""}
                    onChange={(e) => setScore(Number(e.target.value))}
                    className="w-full border rounded px-3 py-2 text-sm text-muted-foreground"
                >
                    <option value="" disabled>
                        Select a score (1–5)
                    </option>
                    <option value="1">1 — ❌ Unusable (blurry, obstructed, wrong target)</option>
                    <option value="2">2 — ⚠️ Poor quality (difficult to interpret)</option>
                    <option value="3">3 — ➖ Usable but not ideal</option>
                    <option value="4">4 — ✅ Good quality</option>
                    <option value="5">5 — 🩺 Diagnostic quality</option>
                </select>

                <Textarea
                    placeholder="Clinician notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <Button onClick={handleSubmit} className="w-full">
                    Submit Review
                </Button>
            </div>
        </div>
    )
}
