function convertToWebP(url) {
  const regex = /\/upload\/(.*?)(?=\/|$)/;
  if (!url.includes('/upload/')) return url;

  // Insert `f_webp` after /upload/
  return url.replace('/upload/', '/upload/f_webp/');
}


export default convertToWebP