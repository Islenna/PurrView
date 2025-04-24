export const checkBrightness = async (imgSrc: string): Promise<boolean> => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imgSrc

    await new Promise((resolve) => (img.onload = resolve))

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    let brightness = 0
    const count = pixels.length / 4

    for (let i = 0; i < pixels.length; i += 4) {
        const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3
        brightness += avg
    }

    const averageBrightness = brightness / count
    return averageBrightness > 60 // tweak this if needed
}