import React from "react";
import HeaderPrivate from "../components/HeaderPrivate";
import HeaderPrivateTop from "../components/HeaderPrivateTop";
import PopularRecipesSlider from "../components/PopularRecipesSlider";
import "../assets/css/index.css";
import CreatedRecipesSlider from "../components/CreatedRecipesSlider";




function PrivateHomepage() {
  return (
    <div style={{ alignItems: "center", width: "100%", gap: "20px", flexDirection: "column"}}>
      <HeaderPrivateTop style={{ marginBottom:'20px'}}/>
      <div style={{display:"flex", flexDirection:'column'}}>
        <HeaderPrivate className="sideNav" style={{}}/>
        <div style={{}}>
        <PopularRecipesSlider style={{}}/>
        <CreatedRecipesSlider />
        </div>
      </div>
    </div>
  );
}

export default PrivateHomepage;
