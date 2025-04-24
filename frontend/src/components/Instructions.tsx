import { Card, CardContent } from "@/components/ui/card"

export const Instructions = () => {
    return (
        <Card className="mb-6">
            <CardContent className="pt-6 space-y-2">
                <h2 className="text-lg font-semibold">📸 How to Take a Great Eye Photo</h2>
                <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                    <li>Use your phone’s rear camera (not selfie mode)</li>
                    <li>Turn your flash ON — this helps us see inside the eye</li>
                    <li>Gently hold your pet’s eyelid open</li>
                    <li>Fill the screen with just the eye</li>
                    <li>Take a clear, steady shot</li>
                </ul>
            </CardContent>
        </Card>
    )
}
