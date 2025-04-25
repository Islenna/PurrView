import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"

type Metadata = {
    firstName: string
    lastName: string
    petName: string
    eyeSide: "left" | "right" | "both"
    notes?: string
}

export default function InfoForm() {
    const [form, setForm] = useState<Metadata>({
        firstName: "",
        lastName: "",
        petName: "",
        eyeSide: "right",
        notes: "",
    })

    const navigate = useNavigate()

    const handleChange = (key: keyof Metadata, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = () => {
        sessionStorage.setItem("purrview-form", JSON.stringify(form))
        navigate("/capture")
    }

    return (
        <div className="max-w-md mx-auto mt-10 space-y-4">
            <h1 className="text-xl font-bold text-center">Patient Info</h1>

            <Input
                placeholder="Owner First Name"
                value={form.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
            />
            <Input
                placeholder="Owner Last Name"
                value={form.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
            />
            <Input
                placeholder="Pet Name"
                value={form.petName}
                onChange={(e) => handleChange("petName", e.target.value)}
            />

            <div className="flex gap-4 justify-center">
                {["left", "right", "both"].map((side) => (
                    <Button
                        key={side}
                        variant={form.eyeSide === side ? "default" : "outline"}
                        onClick={() => handleChange("eyeSide", side as Metadata["eyeSide"])}
                    >
                        {side.charAt(0).toUpperCase() + side.slice(1)} Eye
                    </Button>
                ))}
            </div>

            <Textarea
                placeholder="Additional notes (optional)"
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
            />

            <Button onClick={handleSubmit} className="w-full">
                Continue to Camera
            </Button>
        </div>
    )
}
