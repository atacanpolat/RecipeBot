import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import SortIcon from '@mui/icons-material/Sort';
import { useSortStyles } from "./helpers/styles/recipesStyles";
import { PrimaryButton } from "./helpers/themes";

const SortingComponent = ({ onSortSubmit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCriterion, setSelectedCriterion] = useState("");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCriterionSelect = (criterion) => {
    setSelectedCriterion(criterion === "" ? "" : criterion); 
    onSortSubmit(criterion);
    handleMenuClose();
  };


  const classes = useSortStyles();

  return (
    <>
      <PrimaryButton 
      onClick={handleMenuOpen} 
      startIcon={<SortIcon/>}
      >
       Sort
      </PrimaryButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          className={classes.menuItem}
          onClick={() => handleCriterionSelect("")}
          selected={selectedCriterion === ""}
        >
          <ListItemText primary="Default" />
        </MenuItem>

        <MenuItem
          className={classes.menuItem}
          onClick={() => handleCriterionSelect("author")}
          selected={selectedCriterion === "author"}
        >
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText primary="Author" />
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={() => handleCriterionSelect("title")}
          selected={selectedCriterion === "title"}
        >
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText primary="Title" />
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={() => handleCriterionSelect("popularity")}
          selected={selectedCriterion === "popularity"}
        >
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText primary="Most Popular" />
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={() => handleCriterionSelect("highest-ranking")}
          selected={selectedCriterion === "highest-ranking"}
        >
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText primary="Highest Ranking" />
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={() => handleCriterionSelect("most-commented")}
          selected={selectedCriterion === "most-commented"}
        >
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText primary="Most Commented" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default SortingComponent;
