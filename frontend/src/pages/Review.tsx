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
                .is("photo_score", null)
                .order("created_at", { ascending: true })

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
                <Input
                    type="number"
                    placeholder="Score (1-5)"
                    value={score ?? ""}
                    onChange={(e) => setScore(Number(e.target.value))}
                    min={1}
                    max={5}
                />
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
