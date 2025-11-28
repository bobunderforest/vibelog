import { statusIcons, type EmojiType } from './statusIcons'

export const prepareVideoRecognition = (
  video: HTMLVideoElement,
  // canvas: HTMLCanvasElement,
  onEmojiUpdated: (emoji: EmojiType) => void,
) => {
  let interval: ReturnType<typeof setInterval>

  video.addEventListener('play', () => {
    // Get dimensions from the actual video source
    const displaySize = { width: video.videoWidth, height: video.videoHeight }

    // Match those dimensions
    // faceapi.matchDimensions(canvas, displaySize)

    interval = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions()

      // const resizedDetections = faceapi.resizeResults(detections, displaySize)
      // const ctx = canvas.getContext('2d')!
      // ctx.clearRect(0, 0, canvas.width, canvas.height)
      // faceapi.draw.drawDetections(canvas, resizedDetections)
      // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)

      if (detections.length > 0) {
        // For each face detection
        detections.forEach((element: any) => {
          let status = ''
          let valueStatus = 0.0
          for (const [key, value] of Object.entries(
            element.expressions,
          ) as any) {
            if (value > valueStatus) {
              status = key
              valueStatus = value
            }
          }

          // Once we have the highest scored expression (status)
          onEmojiUpdated(statusIcons[status])
        })
      } else {
        // If not face was detected
        onEmojiUpdated(statusIcons['default'])
      }
    }, 100)
  })

  return {
    stop: () => {
      clearInterval(interval)
    },
  }
}
