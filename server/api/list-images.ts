export default defineEventHandler(async (event) => {
  const { blobs } = await hubBlob().list({
    limit: 100 // Adjust this number as needed
  });
  
  return blobs
    .filter(blob => blob.contentType.startsWith('image/'))
    .map(blob => blob.pathname);
});