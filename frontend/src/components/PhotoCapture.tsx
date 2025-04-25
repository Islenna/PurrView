import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PhotoOverlay } from "@/components/PhotoOverlay"
import { checkBrightness } from "@/utils/checkImageQuality"
import { toast } from "sonner"
import { supabase } from "@/lib/supabaseClient"
import { Instructions } from "./Instructions"
import { useAuth } from "@/components/context/AuthContext"

export const PhotoCapture = () => {
    const { user } = useAuth()
    const [preview, setPreview] = useState<string | null>(null)
    const [isPortrait, setIsPortrait] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<string | null>(null)
    const metadata = JSON.parse(sessionStorage.getItem("purrview-form") || "{}")
    console.log("Upload with metadata:", metadata)
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
    const handleConfirmPhoto = async () => {
        if (!preview) return

        try {
            const response = await fetch(preview)
            const blob = await response.blob()
            const file = new File([blob], `eye-${Date.now()}.jpg`, { type: blob.type })

            const { data, error } = await supabase.storage
                .from("eye-photos")
                .upload(`photos/${file.name}`, file)

            if (error) {
                setUploadStatus(`❌ Upload failed: ${error.message}`)
                toast.error("Upload failed.")
                return
            }

            // ✅ Insert metadata + image path
            const { error: insertError } = await supabase.from("submissions").insert({
                user_id: user?.id,
                pet_name: metadata.petName,
                owner_first: metadata.firstName,
                owner_last: metadata.lastName,
                eye_side: metadata.eyeSide,
                notes: metadata.notes,
                image_path: data.path, // or data.path if you prefer internal
            })

            if (insertError) {
                setUploadStatus(`❌ Upload succeeded but DB insert failed: ${insertError.message}`)
                toast.error("Photo uploaded, but metadata save failed.")
                return
            }

            setUploadStatus(`✅ Uploaded to: ${data.path}`)
            toast.success("Photo and metadata uploaded!")
            setPreview(null)

        } catch (err: any) {
            setUploadStatus(`❌ Upload error: ${err.message}`)
            toast.error("Something went wrong.")
        }
    }



    return (
        <div className="space-y-4">
            <Instructions />
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
                <div className="flex justify-center gap-4 mt-4">
                    <Button variant="outline" onClick={() => setPreview(null)}>
                        ❌ Retake
                    </Button>
                    <Button variant="default" onClick={handleConfirmPhoto}>
                        ✅ Looks Good
                    </Button>
                </div>

            )}
            {uploadStatus && (
                <p className="text-sm text-center text-muted-foreground mt-2">{uploadStatus}</p>
            )}

        </div>
    )
}
