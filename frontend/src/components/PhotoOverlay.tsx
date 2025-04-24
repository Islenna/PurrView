export const PhotoOverlay = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
                viewBox="0 0 400 400"
                className="w-full h-full max-w-xs opacity-70"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Eye outline — made wider and taller */}
                <ellipse
                    cx="200"
                    cy="200"
                    rx="165"   // was 110 → 165 (50% wider)
                    ry="82.5" // was 55  → 82.5 (50% taller)
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                />

                {/* Pupil/center dot — also slightly larger */}
                <circle
                    cx="200"
                    cy="200"
                    r="28" // was 20
                    fill="white"
                    opacity="0.4"
                />
            </svg>
        </div>
    )
}
