import React, { useEffect, useState } from 'react';
import { firestore, storage } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

function DocumentDetails({ match }) {
  const [document, setDocument] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    const fetchDocument = async () => {
      const docRef = doc(firestore, 'documents', match.params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDocument(docSnap.data());
        const storageRef = ref(storage, docSnap.data().filePath);
        const url = await getDownloadURL(storageRef);
        setDownloadUrl(url);
      } else {
        console.log('No such document!');
      }
    };

    fetchDocument();
  }, [match.params.id]);

  return (
    <div>
      {document && (
        <>
          <h1>{document.title}</h1>
          <p>{document.description}</p>
          <a href={downloadUrl} download>
            <button>Download PDF</button>
          </a>
        </>
      )}
    </div>
  );
}

export default DocumentDetails;
