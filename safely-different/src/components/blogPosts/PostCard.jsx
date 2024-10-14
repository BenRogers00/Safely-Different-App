import React from 'react';


const PostCard = ({ uid, id, logo, name, email, text, pdf, timestamp }) => {


  const handleDownloadPdf = () => {
    const pdfUrl = "Sample.pdf";
        const link = document.createElement("a");
        link.href = pdf;
        link.download = "document.pdf"; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  };

  return (
    <div className='mb-4'>
      <div className='flex flex-col py-4 bg-white rounded-t-3xl'>
        <div className='flex items-center pb-4 ml-2'>
          <div className='flex flex-col'>
            <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
              {email}
            </p>
            <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
              Published: {timestamp}
            </p>
          </div>
        </div>
        <div>
          <p className='ml-4 pb-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
            {text}
          </p>
          {/* Render PDF if available */}
          
        </div>
        <div className='flex justify-around pt-4'>
          {/* Conditionally show download button for PDF */}
          {pdf && (
            <div>
            <a href={pdf} view>
              <button>View PDF</button>
            </a>
             <button onClick={handleDownloadPdf}>Download PDF</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
