import { makeStyles } from "@material-ui/core";
import theme from "../themes";

const useAccountSettingStyles = makeStyles(() => ({
  accountSettingsMainContainer: {
    alignItems: "center",
    width: "100%",
    gap: "20px",
    flexDirection: "column",
  },
  accountSettingsMainContent: {
    display: "flex",
    flexDirection: "row",
  },
  accountSettingsContent: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    width: "10rem",
  },
  accountSettingsInnerContent: {
    width: "50rem",
    margin: "auto",
    padding: "0 0 3rem 0",
    alignContent: "center"
  },
  directionColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submitButton: {
    width: "150px",
    float: "right",
    margin: "2rem 0 0 0",
    backgroundColor: theme.palette.violet.main,
    color: "white",
  },
  boldLabel: {
    fontweight: 500
  }
}));



export default useAccountSettingStyles;