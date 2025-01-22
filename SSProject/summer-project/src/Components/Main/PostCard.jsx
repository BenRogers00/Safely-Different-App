import React from "react";
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
const PostCard = ({ uid, id, logo, name, email, text, pdf, timestamp }) => {
  const handlePdfView = () => {
    if (pdf) {
      window.open(pdf, "_blank"); // Open PDF in a new tab
    }
  };

  const handleDownloadPdf =async  () => {
    if (pdf) {
        try {
          // Fetch the PDF data as a Blob
          const response = await fetch(pdf); 
          const blob = await response.blob();
          saveAs(blob, 'post.pdf'); // Trigger download with the desired filename
        } catch (error) {
          console.error('Error downloading PDF:', error);
        }
      } else {
        alert('No PDF available for download.');
      }
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col py-4 bg-white rounded-t-3xl">
        <div className="flex items-center pb-4 ml-2">
          <img
            className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
            src="/worklogin.png"
            alt="Bordered avatar"
          />
          <div className="flex flex-col">
            <p className="ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
              {email}
            </p>
            <p className="ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
              Published: {timestamp}
            </p>
          </div>
        </div>
        <div>
          <p className="ml-4 pb-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            {text}
          </p>
          {pdf && (
            <div
              className="w-24 h-24 border border-gray-400 flex justify-center items-center cursor-pointer"
              onClick={handlePdfView}
            >
              <span>📄</span> 
            </div>
          )}
          <button onClick={handleDownloadPdf}>button</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;