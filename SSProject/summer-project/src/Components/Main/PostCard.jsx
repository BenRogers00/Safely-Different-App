import React from "react";
import { saveAs } from 'file-saver';

const PostCard = ({ uid, id, logo, name, email, text, timestamp, category }) => {
  const pdf = "https://www.pdf995.com/samples/pdf.pdf";


  const handlePdfView = () => {
    if (pdf) {
      window.open(pdf, "_blank");
    }
  };

  const handleDownloadPdf = async () => {
    if (pdf) {
      try {
        const response = await fetch(pdf); // Fetch the PDF file
        console.log("Response status:", response.status); // Log the response status
  
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
  
        const blob = await response.blob(); // Convert the response to a Blob
        console.log("Blob created:", blob); // Log the blob to check if it's created
        saveAs(blob, "document.pdf"); // Use saveAs to download the file
      } catch (error) {
        console.error("Error downloading PDF:", error);
        alert("Failed to download PDF. Error: " + error.message);
      }
    } else {
      alert("No PDF available for download.");
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

          <button onClick={handleDownloadPdf}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
