import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import { getDocument } from 'pdfjs-dist/webpack';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js';

GlobalWorkerOptions.workerSrc = pdfWorker;

const loadPdfImages = async (pdfPath) => {
  const pdf = await getDocument(pdfPath).promise;
  const images = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.9});
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width =viewport.width
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;

    images.push(canvas.toDataURL());
  }

  return images;
};

export { loadPdfImages };
