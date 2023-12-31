import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import uploadService from "../features/uploadService";
import uploadButtonStyles from "./helpers/styles/buttonStyles";

export const FileSelectButton = ({ onUpload, onRemove }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const classes = uploadButtonStyles();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onUpload(file);
    const reader = new FileReader();

    reader.onerror = (error) => {
      console.error("File read error:", error);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    onRemove();
  };

  return (
    <div>
      <label htmlFor="upload-button">
        <Button
          variant="contained"
          component="span"
          className={classes.uploadButton}
        >
          Upload
        </Button>
        <input
          accept="image/*"
          id="upload-button"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </label>
      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <Button
            size="small"
            onClick={handleFileRemove}
            startIcon={<ClearIcon />}
          >
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
      formData.append("file", selectedFile);

      uploadService
        .uploadUserPhoto(formData)
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response));
          setUploading(false);
          setUploadSuccess(true);
        })
        .catch((error) => {
          console.log("Upload error:", error);
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
        {uploading ? <CircularProgress size={24} /> : "Save Changes"}
      </Button>
      {uploadSuccess && (
        <p className={classes.uploadSuccessText}>
          Profile photo uploaded successfully
        </p>
      )}
    </div>
  );
};
const uploadButtons = { UploadButton, FileSelectButton };
export default uploadButtons;
