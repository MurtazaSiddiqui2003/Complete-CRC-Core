// Converts a selected image file into a compressed base64 string, right
// in the browser, before it ever gets saved. This is what keeps images
// stored directly in MongoDB from becoming huge -- a normal phone photo
// might be 4-8MB, but after this it's usually under 300KB.
//
// No external service needed (no Cloudinary, no S3) -- the trade-off is
// that images live inside your database documents instead of on a
// dedicated image CDN, which is a fine trade for a handful of case
// study photos on a small business site.

export function compressImageToBase64(file, maxWidth = 1000, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new window.Image();

      img.onload = () => {
        // Scale down only if the image is wider than maxWidth --
        // never scale small images UP.
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // JPEG compresses much smaller than PNG for photos, which is
        // what case study thumbnails mostly are.
        resolve(canvas.toDataURL("image/jpeg", quality));
      };

      img.onerror = () => reject(new Error("Couldn't read that image file."));
      img.src = event.target.result;
    };

    reader.onerror = () => reject(new Error("Couldn't read that file."));
    reader.readAsDataURL(file);
  });
}
