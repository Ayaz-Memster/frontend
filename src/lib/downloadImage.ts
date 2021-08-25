import FileSaver from 'file-saver';

export async function downloadImage(data: {
  title: string;
  extension: string;
  link: string;
}) {
  const response = await fetch(data.link, {
    method: 'GET',
  });
  const blob = await response.blob();
  FileSaver.saveAs(blob, `${data.title}.${data.extension}`);
}
