import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Documents() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'documents'));
      setDocuments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h1>Documents</h1>
      <div className="document-list">
        {documents.map(doc => (
          <div key={doc.id} className="document-item">
            <Link to={`/documents/${doc.id}`}>
              <h2>{doc.title}</h2>
              <p>{doc.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Documents;
