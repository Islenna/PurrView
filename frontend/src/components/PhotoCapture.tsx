import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PhotoOverlay } from "@/components/PhotoOverlay"
import { checkBrightness } from "@/utils/checkImageQuality"
import { toast } from "sonner"

export const PhotoCapture = () => {
    const [preview, setPreview] = useState<string | null>(null)
    const [isPortrait, setIsPortrait] = useState(false)

    useEffect(() => {
        const checkOrientation = () => {
            setIsPortrait(window.innerHeight > window.innerWidth)
        }

        window.addEventListener("resize", checkOrientation)
        checkOrientation()

        return () => window.removeEventListener("resize", checkOrientation)
    }, [])

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const objectURL = URL.createObjectURL(file)
            setPreview(objectURL)

            const isBrightEnough = await checkBrightness(objectURL)
            if (!isBrightEnough) {
                toast.warning("This photo may be too dark — try again with flash.")
            }
        }
    }


    return (
        <div className="space-y-4">
            <div className="flex flex-col items-center gap-2">
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-block rounded-lg border border-dashed border-muted px-4 py-6 text-sm text-muted-foreground hover:bg-muted transition"
                >
                    Tap to take or upload a photo
                </label>
                {isPortrait && (
                    <p className="text-sm text-orange-600 text-center font-medium">
                        🔄 Try turning your phone sideways for a better photo!
                    </p>
                )}
                {/* Image preview + overlay */}
                {preview && (
                    <div className="relative flex justify-center">
                        <img
                            src={preview}
                            alt="Photo preview"
                            className="w-full max-w-xs rounded-lg shadow"
                        />
                        <PhotoOverlay />
                    </div>
                )}

                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            {preview && (
                <div className="flex justify-center">
                    <img
                        src={preview}
                        alt="Photo preview"
                        className="w-full max-w-xs rounded-lg shadow"
                    />
                </div>
            )}

            {preview && (
                <div className="flex justify-center">
                    <Button variant="outline" onClick={() => setPreview(null)}>
                        Retake Photo
                    </Button>
                </div>
            )}
        </div>
    )
}
