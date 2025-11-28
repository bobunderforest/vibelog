export const startVideoRecording = async (videoEl: HTMLVideoElement) => {
  // Some browsers partially implement mediaDevices. We can't just assign an object
  // with getUserMedia as it would overwrite existing properties.
  // Here, we will just add the getUserMedia property if it's missing.
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      // First get ahold of the legacy getUserMedia, if present
      const getUserMedia =
        (navigator as any)?.webkitGetUserMedia ||
        (navigator as any)?.mozGetUserMedia

      // Some browsers just don't implement it - return a rejected promise with an error
      // to keep a consistent interface
      if (!getUserMedia) {
        return Promise.reject(
          new Error('getUserMedia is not implemented in this browser'),
        )
      }

      // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject)
      })
    }
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1080 },
        height: { ideal: 1920 },
      },
    })
    // Older browsers may not have srcObject
    if ('srcObject' in videoEl) {
      videoEl.srcObject = stream
    } else {
      // Avoid using this in new browsers, as it is going away.
      ;(videoEl as any).src = window.URL.createObjectURL(stream as any)
    }
    videoEl.onloadedmetadata = function (e) {
      videoEl.play()
    }
    return {
      stop: () => {
        stream.getTracks().forEach((track) => {
          track.stop()
        })
      },
    }
  } catch (err: any) {
    console.log(err.name + ': ' + err.message)
  }

  return {
    stop: () => {},
  }
}
