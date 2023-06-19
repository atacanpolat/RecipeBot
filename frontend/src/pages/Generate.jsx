import { HeaderPrivate, HeaderPrivateTop } from "../components/HeaderPrivate";
import { Container } from "@material-ui/core";

import GenerateInputComponent from "../components/GenerateInputComponent";

const handleRecipeGeneration = async (recipeParameters) => {
  console.log("Generating recipe...");
  // TODO: impement
};

function Generate() {
  return (
    <div
      style={{
        alignItems: "center",
        width: "100%",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <HeaderPrivateTop />
      <div style={{ display: "flex" }}>
        <HeaderPrivate className="sideNav" />
        <div
          style={{ display: "flex", flexDirection: "column", flex: "1 1 auto" }}
        >
          {/* MAIN CONTAINER */}
          <Container>
            <GenerateInputComponent onClickGenerate={"TODO"} />
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Generate;
