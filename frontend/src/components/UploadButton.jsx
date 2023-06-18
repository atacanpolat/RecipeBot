
import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import uploadService from '../features/uploadService';


export const FileSelectButton = ({ onUpload, onRemove }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onUpload(file);
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const url = reader.result;
      if (typeof url === 'string') {
        setImageUrl(url);
      //  onUpload(url);
      } else {
        console.error('Invalid file URL:', url);
      }
    };
  
    reader.onerror = (error) => {
      console.error('File read error:', error);
    };
  
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setImageUrl('');
    onRemove();
  };

  return (
    <div>
      <label htmlFor="upload-button">
        <Button variant="contained" component="span">
          Upload
        </Button>
        <input
          accept="image/*"
          id="upload-button"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
      </label>
      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <Button size="small" onClick={handleFileRemove} startIcon={<ClearIcon />}>
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export const UploadButton = ({ selectedFile }) => {

  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    if (selectedFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      uploadService.uploadUserPhoto(formData)
        .then((response) => {
          console.log(selectedFile);
          console.log(response);
          console.log(response.avatar);
          const userData = JSON.parse(localStorage.getItem('user'));
          const updatedUserData = {...userData, ...response};
          localStorage.setItem('user', JSON.stringify(updatedUserData));
          console.log(localStorage.getItem('user'))
          setUploading(false);
        })
        .catch((error) => {
          console.log('Upload error:', error);
          setUploading(false);
        });
    }
  };
  
  return (
  <Button variant="contained" component="span" disabled={!selectedFile || uploading} onClick={handleUpload}>
    {uploading ? <CircularProgress size={24} /> : 'Submit'}
  </Button>
  );

};

export default {UploadButton, FileSelectButton};

