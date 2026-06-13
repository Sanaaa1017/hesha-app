/**
 * 將圖片檔壓縮並轉成 base64 data URL。
 * localStorage 容量有限，故先縮放到指定邊長並以 JPEG 壓縮。
 */
export async function fileToCompressedDataUrl(
  file: File,
  maxSize = 800,
  quality = 0.7,
): Promise<string> {
  const dataUrl = await readFileAsDataUrl(file)
  try {
    const img = await loadImage(dataUrl)
    const { width, height } = scaleToFit(img.naturalWidth, img.naturalHeight, maxSize)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return dataUrl
    ctx.drawImage(img, 0, 0, width, height)
    return canvas.toDataURL('image/jpeg', quality)
  } catch {
    // 壓縮失敗時退回原始 data URL
    return dataUrl
  }
}

export function scaleToFit(
  width: number,
  height: number,
  maxSize: number,
): { width: number; height: number } {
  const longest = Math.max(width, height)
  if (longest <= maxSize) return { width, height }
  const ratio = maxSize / longest
  return { width: Math.round(width * ratio), height: Math.round(height * ratio) }
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('讀取檔案失敗'))
    reader.readAsDataURL(file)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('載入圖片失敗'))
    img.src = src
  })
}
