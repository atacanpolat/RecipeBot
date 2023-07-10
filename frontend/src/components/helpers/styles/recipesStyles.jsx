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
    width: 375,
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
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
    textAlign: "left",
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
    ...theme.typography.body2,
    fontWeight: "bold",
    color: theme.palette.text.primary,
    textAlign: "left",
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
  loadMoreButton: {
    backgroundColor: theme.palette.violet.dark,
    marginTop: theme.spacing(2),
    color: theme.palette.grey[100],
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
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
    textAlign: "left",
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
    ...theme.typography.body2,
    fontWeight: "bold",
    color: theme.palette.text.primary,
    textalign: "left",
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

export const useCreateRecipeStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    direction: "column",
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  createRecipeContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    direction: "column",
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
  form_field: { flex: "2" },
  output: { marginLeft: "3rem", flex: "1" },
  form_field_label: {
    margin: "0",
    fontSize: "18px",
    fontWeight: "500",
    color: "rgb(84, 84, 84)",
  },
  h2: {
    margin: "0",
    fontSize: "18px",
    fontWeight: "500",
    color: "rgb(84, 84, 84)",
  },
  input: {
    height: "35px",
    width: "100%",
    padding: "7px",
    outline: "none",
    borderRadius: "5px",
    border: "1px solid rgb(220, 220, 220)",
  },
  input_focus: { border: "1px solid rgb(0, 208, 255)" },
  services: { display: "flex", justifyContent: "space-between" },
  first_division: {
    display: "flex",
    flexDirection: "column",
    margin: "0 5px 0.5rem 0",
    width: "100%",
  },
  button: {
    background: "none",
    outline: "none",
    cursor: "pointer",
    fontWeight: "500",
    borderRadius: "2px",
    padding: "5px 10px",
  },
  first_division_button: {
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "center",
    marginTop: "0.5rem",
    color: "rgb(0, 208, 255)",
    border: "1px solid rgb(0, 208, 255)",
  },
  second_division_button: { color: "red", border: "1px solid red" },
}));

export const useFilterStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    direction: "column",
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  createRecipeContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "left",
    flexWrap: "wrap",
    direction: "column",
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
  additionalNotes: {
    margin: theme.spacing(4),
    width: "100%",
  },
  exampleNotes: {
    marginTop: theme.spacing(2),
    fontStyle: "italic",
    color: theme.palette.text.secondary,
  },

  textarea: {
    minHeight: "80px", // Adjust the desired height here
    width: "60%",
    resize: "vertical",
    padding: theme.spacing(1),
    fontSize: theme.typography.fontSize,
    lineHeight: "1.5",
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: theme.shape.borderRadius,
    fontFamily: theme.typography.fontFamily,
    boxSizing: "border-box",
    overflowY: "auto",
  },
}));

export const useSortStyles = makeStyles(() => ({
  menuItem: {
    minWidth: 150,
  },
}));

export default {
  useRecipeContainerStyles,
  useRecipeSliderStyles,
  useFilterStyles,
  useSortStyles,
};
