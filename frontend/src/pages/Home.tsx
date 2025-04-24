import { Instructions } from "@/components/Instructions"
import { PhotoCapture } from "@/components/Photocapture"

export default function Home() {
    return (
        <main className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">🐾 PurrView — Eye Photo Guide</h1>
            <Instructions />
            <PhotoCapture />
        </main>
    )
}
