import { makeStyles } from "@material-ui/core";
import theme from "../themes";

export const useHeroStyles = makeStyles(() => ({
    heading: {
      fontWeight: "bold",
      fontSize: "3rem",
      [theme.breakpoints.up("lg")]: {
        fontSize: "3rem",
      },
    },
    violetText: {
      color: theme.palette.violet.light
    },
    paragraph: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(8),
      fontSize: "1rem",
      [theme.breakpoints.up("lg")]: {
        fontSize: "1.125rem",
      },
    },
    actionButton: {
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        position: "relative",
        right: 0,
        top: 0,
        bottom: 0,
        margin: "0.25rem",
        width: "200%",
        minWidth: "8rem",
        maxWidth: "22rem",
      },
      backgroundColor: theme.palette.violet.light,
      color: theme.palette.common.white,
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "9999px",
      transition: "background-color 300ms",
      "&:hover": {
        backgroundColor: theme.palette.violet.dark,
      },
    },
    illustration: {
      display: "flex",
      justifyContent: "center",
      height: "%90",
      [theme.breakpoints.up("lg")]: {
        justifyContent: "flex-end",
      },
    },
    illustrationImage: {
      width: "100%",
      maxWidth: "60rem",
      [theme.breakpoints.up("xl")]: {
        maxWidth: "50rem",
      },
    },
    decoratorBlob1: {
      pointerEvents: "none",
      opacity: 0.5,
      position: "absolute",
      left: 0,
      bottom: 0,
      height: "16rem",
      width: "16rem",
      transform: "translateX(-66.66%)",
      zIndex: -10,
    },
  }));

  export const useStepsStyles = makeStyles(() => ({
    container: {
      position: "relative",
      width: "80%",
    },
    twoColumn: {
      flexWrap: "nowrap",
      justifyContent: "space-between",
      maxWidth: theme.breakpoints.values.xl,
      margin: "auto",
      padding: theme.spacing(10, 0),
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    column: {
      width: "100%",
      maxWidth: theme.breakpoints.values.md,
      margin: "auto",
      [theme.breakpoints.down("md")]: {
        textAlign: "center",
        marginBottom: theme.spacing(4),
      },
    },
    imageColumn: {
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    textColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        width: "80%",
        textAlign: "center",
        order: 1,
      },
    },
    image: {
      width: "100%",
      height: "auto",
    },
    textContent: {
      padding: theme.spacing(2),
      textAlign: "left",
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(0),
      },
    },
    subheading: {
      textAlign: "left",
      marginBottom: theme.spacing(1),
      color: theme.palette.violet.dark
    },
    heading: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
      fontWeight: "bold",
      fontSize: "2.25rem",
      lineHeight: "1.2",
      [theme.breakpoints.up("sm")]: {
        fontSize: "3rem",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "4rem",
      },
    },
    steps: {
      marginTop: theme.spacing(6),
      listStyle: "none",
      padding: 0,
    },
    step: {
      display: "flex",
      alignItems: "flex-start",
      marginTop: theme.spacing(4),
    },
    stepNumber: {
      fontWeight: "bold",
      fontSize: "2rem",
      lineHeight: "1",
      color: theme.palette.grey[400],
    },
    stepText: {
      marginLeft: theme.spacing(2),
    },
    stepHeading: {
      fontWeight: "bold",
      fontSize: "1.5rem",
      lineHeight: "1.2",
    },
    stepDescription: {
      marginTop: theme.spacing(1),
      fontSize: "0.875rem",
      color: theme.palette.grey[600],
      fontWeight: "medium",
    },
  }));

  export const useTeamCardStyles = makeStyles(() => ({

    heading: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(16)
    },
    subheading: {
      marginBottom: theme.spacing(3),
      textAlign: "center",
    },
    card: {
      marginTop: theme.spacing(6),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    cardImage: {
      width: 200,
      height: 200,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "50%",
    },
    cardContent: {
      marginTop: theme.spacing(2),
      textAlign: "center",
    },
    name: {
      marginTop: theme.spacing(1),
      fontWeight: "bold",
      fontSize: "1.25rem",
      color: theme.palette.text.main,
    },
    cardLinks: {
      marginTop: theme.spacing(2),
      display: "flex",
    },
    link: {
      marginRight: theme.spacing(2),
      color: theme.palette.text.secondary,
      "&:hover": {
        color: theme.palette.violet.dark,
      },
    },
    icon: {
      width: 24,
      height: 24,
      fill: "currentColor",
    },
  }));



  export default {useHeroStyles, useStepsStyles, useTeamCardStyles};