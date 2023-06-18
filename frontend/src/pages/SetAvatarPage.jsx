import React, { useState, useRef, useEffect } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Button } from '@mui/material';
import {UploadButton, FileSelectButton} from "../components/UploadButton";
import { useNavigate, useLocation  } from 'react-router-dom';


const usePreviousLocation = () => {
  const location = useLocation();
  const previousLocation = useRef(null);

  useEffect(() => {
    previousLocation.current = location;
  }, [location]);

  return previousLocation.current;
};

const SetAvatarPage = () => {
  const url = "http://localhost:8000/";
  const currentAvatar = JSON.parse(localStorage.getItem('user')).avatar;
  const [avatar, setAvatar] = useState(!currentAvatar || currentAvatar =='' ? '' : url+currentAvatar );
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const previousLocation = usePreviousLocation();

  const handleAvatarUpload = (file) => {
    setSelectedFile(file);
    setAvatar(file);
  };

  const handleAvatarRemove = () => {
    setSelectedFile(null);
    setAvatar('');
  };

//TODO
  const handleClick = () => {
    if (previousLocation?.pathname === '/register') {
      navigate('/home');
    } else if (previousLocation?.pathname === '/settings') {
      navigate('/settings');
    } else {
      navigate('/home'); // Default fallback route
    }
  };

  return (
    <div>
      <h1>Set Profile Picture</h1>
      <FileSelectButton onUpload={handleAvatarUpload} onRemove={handleAvatarRemove} />
      {avatar && (
        <div>
          <h3>Selected Profile Picture:</h3>
          {typeof avatar === 'string' ? (
            <img src={avatar} alt="Profile Picture" />
          ) : (
            <img src={URL.createObjectURL(avatar)} alt="Profile Picture" />
          )}        </div>
      )}
      <UploadButton selectedFile={selectedFile}/>
      <Button variant="contained" color="primary" size="large" style={{ borderRadius: '50%', fontWeight: 'bold' }} onClick={handleClick}>
        <ArrowForwardIcon />
      </Button>
    </div>
  );
};

export default SetAvatarPage;
