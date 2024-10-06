import { getBlobList } from '@nuxthub/core';

export default eventHandler(async (event) => {
  const blobs = await getBlobList();
  return blobs.filter(blob => blob.type === 'image/png').map(blob => blob.key);
});