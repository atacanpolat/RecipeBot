
import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import uploadService from '../features/uploadService';
import uploadButtonStyles from './helpers/styles/buttonStyles';


export const FileSelectButton = ({ onUpload, onRemove }) => {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const classes = uploadButtonStyles();

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
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const classes = uploadButtonStyles();

  const handleUpload = () => {
    if (selectedFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      uploadService.uploadUserPhoto(formData)
        .then((response) => {
          console.log(formData);
          console.log(selectedFile);
          console.log(response);
          console.log(response.avatar);
          //const userData = JSON.parse(localStorage.getItem('user'));
          //userData.avatar = response.avatar;
          //const updatedUserData = {...userData, ...response};
          localStorage.setItem('user', JSON.stringify(response));
          console.log(localStorage.getItem('user'))
          setUploading(false);
          setUploadSuccess(true);
        })
        .catch((error) => {
          console.log('Upload error:', error);
          setUploading(false);
          setUploadSuccess(false);
        });
    }
  };
  
  return (
    <div>
      <Button
        variant="contained"
        component="span"
        disabled={!selectedFile || uploading || uploadSuccess}
        onClick={handleUpload}
        className={classes.uploadButton}
      >
        {uploading ? <CircularProgress size={24} /> : 'Save Changes'}
      </Button>
      {uploadSuccess && (
        <p className={classes.uploadSuccessText}>Profile photo uploaded successfully</p>
      )}
    </div>
  );
};

export default {UploadButton, FileSelectButton};

