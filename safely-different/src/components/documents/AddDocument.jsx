import React, { useState } from 'react';
import { firestore, storage } from '../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function AddDocument() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `documents/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Optional: Track upload progress
      },
      (error) => {
        console.error('Upload error:', error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(firestore, 'documents'), {
          title,
          description,
          filePath: uploadTask.snapshot.ref.fullPath,
          downloadURL,
          createdAt: new Date(),
        });
        setUploading(false);
        setTitle('');
        setDescription('');
        setFile(null);
        alert('Document uploaded successfully.');
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input type="file" accept="application/pdf" onChange={handleFileChange} required />
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Add Document'}
      </button>
    </form>
  );
}

export default AddDocument;
