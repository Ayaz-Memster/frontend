import FileSaver from 'file-saver';
import { apiUrl } from './apiUrl';

export async function downloadImage(name: string) {
  const downloadLink = `${apiUrl}/download/${name}`;
  const response = await fetch(downloadLink, {
    method: 'GET',
  });
  const contentType = response.headers.get('content-type');
  if (!contentType) {
    throw new Error('Response does not contain Content-Type header');
  }
  const extension = contentType.split('/')[1];
  const blob = await response.blob();
  FileSaver.saveAs(blob, `${name}.${extension}`);
}
