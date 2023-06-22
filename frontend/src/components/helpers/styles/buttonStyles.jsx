import { makeStyles } from "@material-ui/core";
import theme from "../themes";

const uploadButtonStyles = makeStyles(() => ({
    fileContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    selectedFileContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    selectedFileText: {
      marginLeft: theme.spacing(1),
    },
    removeButton: {
      marginLeft: theme.spacing(2),
    },
    uploadButton: {
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.violet.main
    },
    uploadSuccessText: {
      marginTop: theme.spacing(2),
      color: theme.palette.text.main,
    },
  }));
  

  export default uploadButtonStyles;