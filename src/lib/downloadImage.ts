import { AxiosResponse, AxiosError } from 'axios';
import FileSaver from 'file-saver';
import { apiUrl, fetcher } from './apiUrl';
import { Error as ResponseError } from '../contract/error';

export async function downloadImage(name: string) {
  const downloadLink = `${apiUrl}/download/${name}`;
  let response: AxiosResponse<Blob>;
  try {
    response = await fetcher.get(downloadLink, { responseType: 'blob' });
  } catch (err) {
    const { response } = err as AxiosError<ResponseError>;
    console.error(response?.data);
    throw new Error(response?.data.message);
  }
  const contentType = response.headers['content-type'];
  if (!contentType) {
    throw new Error('Response does not contain Content-Type header');
  }
  const extension = contentType.split('/')[1];
  FileSaver.saveAs(response.data, `${name}.${extension}`);
}
