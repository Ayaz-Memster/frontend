import FileSaver from 'file-saver';

export async function downloadImage(data: { title: string; link: string }) {
  const response = await fetch(data.link, {
    method: 'GET',
  });
  const contentType = response.headers.get('content-type');
  if (!contentType) {
    throw new Error('Response does not contain Content-Type header');
  }
  const extension = contentType.split('/')[1];
  const blob = await response.blob();
  FileSaver.saveAs(blob, `${data.title}.${extension}`);
}
