
import { saveAs } from 'file-saver';
import React, { useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const PostCard = ({ uid, id, logo, name, email, text, timestamp, category, pdf }) => {
  const storage = getStorage();
  const [pdfUrl, setPdfUrl] = useState('');
  const handlePdfView = () => {
    if (pdf) {
      window.open(pdf, "_blank");
    }
  };

  const handleDownloadPdf = async () => {
    try {
      if (!pdf) {
        throw new Error("No PDF file provided.");
      }
  
      let url;
  
      // If `pdf` is a direct URL
      if (pdf.startsWith("http")) {
        url = pdf;
      } else {
        // If `pdf` is stored in Firebase Storage
        const pdfRef = ref(storage, `pdfs/${pdf.name}`); // Adjust the path to your storage structure
        url = await getDownloadURL(pdfRef);
      }
  
      // Fetch the file as a blob
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch the PDF file. HTTP status: ${response.status}`);
      }
  
      const blob = await response.blob();
  
      // Create a Blob URL and download the file
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = pdf.split('/').pop(); // Use the file name from the path
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
  
      // Release the Blob URL
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading PDF:", error.message);
    }
  };
  

  return (
    <div className="mb-4">
      <div className="h-50 w-80 flex flex-col py-4 bg-gray-200 rounded-3xl">
        <div className="flex flex-col items-center flex-grow">
          <img
            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            src="/worklogin.png"
            alt="Bordered avatar"
          />
          <p className="py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            {email}
          </p>
          <p className="py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            Category: {category}
          </p>
          <p className="pb-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            {text}
          </p>
        </div>

        <div className="flex justify-center items-center">
          {pdf && (
            <div
              className="w-24 h-24 border border-gray-400 flex justify-center items-center cursor-pointer mx-auto"
              onClick={handlePdfView}
            >
              <span className="flex justify-center items-center text-xl">📄</span>
            </div>
          )}
        </div>
        <button className="flex justify-center items-center" onClick={handleDownloadPdf}>
          Download
        </button>
      </div>
    </div>
  );
};

export default PostCard;