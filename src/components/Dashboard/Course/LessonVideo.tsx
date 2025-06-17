const LessonVideo = ({ videoUrl }: { videoUrl: string }) => {
    return (
        <div className="w-full h-full rounded-lg overflow-hidden">
            <video src={videoUrl} className="w-full h-full" />
        </div>
    )
}

export default LessonVideo;