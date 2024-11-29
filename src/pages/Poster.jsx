import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PosterPdf from '../assets/poster.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js`;

export default () => {
    const [numPages, setNumPages] = useState(null);
    const [error, setError] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const onLoadError = (error) => {
        setError(error);
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = PosterPdf;
        link.download = 'poster.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ 
            paddingTop: '160px',
            height: 'calc(100vh - 80px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto'
        }}>
            {error && <div>Error loading PDF: {error.message}</div>}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <Document 
                    file={PosterPdf}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onLoadError}
                    loading="Loading PDF..."
                >
                    <Page pageNumber={1} />
                </Document>
                <button
                    onClick={handleDownload}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
}
