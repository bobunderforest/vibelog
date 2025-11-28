export function captureVideoFrame(
  video: HTMLVideoElement,
  format: string = 'jpeg',
  quality: number = 1,
) {
  var canvas = document.createElement('canvas')

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  canvas.getContext('2d')!.drawImage(video, 0, 0)

  var dataUri = canvas.toDataURL('image/' + format, quality)
  var data = dataUri.split(',')[1]
  var mimeType = dataUri.split(';')[0].slice(5)

  var bytes = window.atob(data)
  var buf = new ArrayBuffer(bytes.length)
  var arr = new Uint8Array(buf)

  for (var i = 0; i < bytes.length; i++) {
    arr[i] = bytes.charCodeAt(i)
  }

  var blob = new Blob([arr], { type: mimeType })
  return {
    blob: blob,
    dataUri: dataUri,
    format: format,
  }
}

export function captureVideoFrameByRatio(
  video: HTMLVideoElement,
  aspectRatio?: number, // width / height
  format: string = 'jpeg',
  quality: number = 1,
) {
  const vw = video.videoWidth
  const vh = video.videoHeight

  let sw = vw
  let sh = vh
  let sx = 0
  let sy = 0

  if (aspectRatio) {
    const videoRatio = vw / vh

    if (videoRatio > aspectRatio) {
      // crop width
      sw = vh * aspectRatio
      sh = vh
      sx = (vw - sw) / 2
    } else {
      // crop height
      sw = vw
      sh = vw / aspectRatio
      sy = (vh - sh) / 2
    }
  }

  const canvas = document.createElement('canvas')

  if (aspectRatio) {
    canvas.width = sw
    canvas.height = sh
  } else {
    canvas.width = vw
    canvas.height = vh
  }

  const ctx = canvas.getContext('2d')!
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)

  const dataUri = canvas.toDataURL('image/' + format, quality)
  const data = dataUri.split(',')[1]
  const mimeType = dataUri.split(';')[0].slice(5)

  const bytes = atob(data)
  const buf = new ArrayBuffer(bytes.length)
  const arr = new Uint8Array(buf)

  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i)

  return {
    blob: new Blob([arr], { type: mimeType }),
    dataUri,
    format,
  }
}
