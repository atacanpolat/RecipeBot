import { makeStyles } from "@material-ui/core/styles";
import theme from "../themes";

export const useRecipeContainerStyles = makeStyles(() => ({
  cardContainer: {
    marginTop: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
      paddingRight: theme.spacing(8),
    },
    [theme.breakpoints.up("lg")]: {
      width: "33.33%",
    },
  },
  card: {
    height: 300,
    width: 400,
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.grey[100],
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      opacity: 0.5,
      transition: "0.3s",
    },
  },
  cardImage: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: "80px",
    [theme.breakpoints.up("sm")]: {
      borderTopRightRadius: "3xl",
    },
  },
  titleReviewContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  title: {
    ...theme.typography.h6,
    marginBottom: theme.spacing(2),
    whiteSpace: "pre-wrap", // Allow text to wrap to the next line
    wordWrap: "break-word", // Break words if they exceed the width
    textAlign: "center", // Center the text
  },
  ratingsInfo: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
    },
  },
  rating: {
    marginLeft: theme.spacing(1),
    fontWeight: "bold",
  },
  description: {
    ...theme.typography.body2,
    marginTop: theme.spacing(2),
    opacity: "0.5",
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  secondaryInfoContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  iconWithText: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
    },
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: "50%",
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.common.white,
  },
  text: {
    marginLeft: theme.spacing(1),
    ...theme.typography.body2,
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  heading: {
    ...theme.typography.h4,
    marginBottom: theme.spacing(4),
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      ...theme.typography.h3,
      marginBottom: 0,
    },
  },
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Added property
  },
  tabButton: {
    backgroundColor: theme.palette.grey[200],
    border: `1px solid ${theme.palette.grey[400]}`,
    color: theme.palette.text.primary,
    padding: theme.spacing(2, 3), // Increased padding for a larger button
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginRight: theme.spacing(2),
    borderRadius: theme.spacing(2),
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.h6.fontSize, // Increased font size for a larger button
    fontWeight: theme.typography.fontWeightMedium,
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
  },
  activeTabButton: {
    backgroundColor: theme.palette.violet.light,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.violet.light,
    },
  },
}));

export const useRecipeSliderStyles = makeStyles(() => ({
  container: {},
  content: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(4),
    },
  },
  headingWithControl: {
    display: "flex",
    flexDirection: "row",
    width: "78vw",
    maxWidth: "1524px",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "stretch",
    },
  },
  heading: {
    ...theme.typography.h4,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      ...theme.typography.h3,
      marginBottom: 0,
    },
  },

  controlButton: {
    marginLeft: theme.spacing(2),
    borderRadius: "50%",
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.violet.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.violet.light,
    },
  },
  cardSlider: {
    marginTop: theme.spacing(4),
    width: "100%",
    "& .slick-track": {
      display: "flex",
    },
    "& .slick-slide": {
      height: "auto",
      display: "flex",
      justifyContent: "center",
      marginBottom: theme.spacing(1),
    },
  },
  cardContainer: {
    marginTop: theme.spacing(3),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.up("md")]: {
      width: "33.33%",
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.up("lg")]: {
      width: "25%",
      paddingRight: theme.spacing(12),
    },
  },
  card: {
    height: 300,
    width: 450,
    display: "flex",
    flexDirection: "column",
    borderRadius: "3xl",
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      opacity: 0.5,
      transition: "0.3s",
    },
  },
  cardImage: {
    width: "100%",
    height: 1000,
    flex: 1,
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: "80px",
    [theme.breakpoints.up("sm")]: {
      borderTopRightRadius: "3xl",
    },
  },
  titleReviewContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  title: {
    ...theme.typography.h6,
    marginBottom: theme.spacing(2),
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    textAlign: "center",
  },
  ratingsInfo: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
    },
  },
  rating: {
    marginLeft: theme.spacing(1),
    fontWeight: "bold",
  },
  description: {
    ...theme.typography.body2,
    marginTop: theme.spacing(2),
    opacity: "0.5",
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  secondaryInfoContainer: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  iconWithText: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
    },
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: "50%",
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.common.white,
  },
  text: {
    marginLeft: theme.spacing(1),
    ...theme.typography.body2,
    fontWeight: "bold",
    color: theme.palette.text.primary,
  },
  primaryButton: {
    ...theme.typography.button,
    marginTop: "auto",
    alignItems: "center",
    borderRadius: "0",
    backgroundColor: theme.palette.violet.light,
    [theme.breakpoints.up("sm")]: {
      borderTopRightRadius: "3xl",
    },
  },
}));

export const useFilterStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  filterInput: {
    marginRight: theme.spacing(2),
  },
  filterButton: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.violet.main,
    color: theme.palette.grey[100],
  },
  filterSelect: {
    marginRight: theme.spacing(2),
    minWidth: 200,
  },
  filterCheckboxGroup: {
    display: "flex",
    flexDirection: "column",
  },

  includedIngredient: {
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.green.main,
    color: theme.palette.grey[100],
  },
  excludedIngredient: {
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.red.main,
    color: theme.palette.grey[100],
  },
}));

export default {
  useRecipeContainerStyles,
  useRecipeSliderStyles,
  useFilterStyles,
};
