import React, { useState, useRef, useEffect } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Typography } from "@mui/material";
import { UploadButton, FileSelectButton } from "../components/UploadButton";
import { useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import theme from "../components/helpers/themes";
import { HeaderPrivateTop } from "../components/HeaderPrivate";
import silhouettePP from "../images/silhoutte_pp.png";

const usePreviousLocation = () => {
  const location = useLocation();
  const previousLocation = useRef(null);

  useEffect(() => {
    previousLocation.current = location;
  }, [location]);

  return previousLocation.current;
};

const useStyles = makeStyles(() => ({
  root: {
    //  display: 'flex',
    //  flexDirection: 'column',
    //  alignItems: 'center',
    justifyContent: "center",
    minHeight: "100vh",
    minWidth: "100vh",
    //  paddingTop: theme.spacing(10),
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    backgroundColor: "#fff",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    textAlign: "center",
    fontWeight: "bold",
    fontSize: theme.typography.h3.fontSize,
    color: "#333",
  },
  profileWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  profileContainer: {
    width: "15vw", // Adjust the width as desired
    height: "15vw",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid #ccc",
    margin: "0 auto",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  name: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
    color: "#666",
  },
  uploadButton: {
    width: "100%",
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.violet.main,
  },
  submitButton: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  proceedButton: {
    marginTop: theme.spacing(2),
    left: theme.spacing(40),
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: theme.palette.violet.main,
    color: "#fff",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  },
}));

const SetAvatarPage = () => {
  const classes = useStyles();

  const url = "http://localhost:8000/";
  const user = JSON.parse(localStorage.getItem("user"));
  const currentAvatar = user.avatar;
  const [avatar, setAvatar] = useState(
    !currentAvatar || currentAvatar === "" ? silhouettePP : url + currentAvatar
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const previousLocation = usePreviousLocation();
  const navigate = useNavigate();

  const handleAvatarUpload = (file) => {
    setSelectedFile(file);
    setAvatar(file);
  };

  const handleAvatarRemove = () => {
    setSelectedFile(silhouettePP);
    setAvatar(silhouettePP);
  };

  //TODO
  const handleClick = () => {
    if (previousLocation?.pathname === "/register") {
      navigate("/home");
    } else if (previousLocation?.pathname === "/settings") {
      navigate("/settings");
    } else {
      navigate("/home"); // Default fallback route
    }
  };

  return (
    <>
      <div style={{ width: "100vw" }}>
        <HeaderPrivateTop />
      </div>
      <div className={classes.root}>
        <Typography variant="h4" component="h1" className={classes.title}>
          Set Profile Picture
        </Typography>
        <div className={classes.container}>
          <div className={classes.profileWrapper}>
            <div className={classes.profileContainer}>
              {avatar && (
                <img
                  src={
                    typeof avatar === "string"
                      ? avatar
                      : URL.createObjectURL(avatar)
                  }
                  alt="Profile Pic"
                  className={classes.profileImage}
                />
              )}
            </div>
            <Typography variant="h5" component="h2" className={classes.name}>
              {user.firstName + " " + user.lastName}
            </Typography>
          </div>
          <FileSelectButton
            onUpload={handleAvatarUpload}
            onRemove={handleAvatarRemove}
            className={classes.uploadButton}
          />
          {(selectedFile || !selectedFile) && (
            <div className={classes.submitButton}>
              <UploadButton selectedFile={selectedFile} />
            </div>
          )}
          <Button
            variant="contained"
            className={classes.proceedButton}
            onClick={handleClick}
          >
            <ArrowForwardIcon />
          </Button>
        </div>
        <Typography variant="h6" component="h6">
          You can always change this from Settings
        </Typography>
      </div>
    </>
  );
};

export default SetAvatarPage;
