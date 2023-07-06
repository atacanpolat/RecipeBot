import CreateInputComponent from "../components/CreateInputComponent";
import { HeaderPrivate, HeaderPrivateTop } from "../components/HeaderPrivate";
import { Container } from "@material-ui/core";

function Create() {
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
            <h1>Create a recipe manually</h1>
            <p>
              Do you want to manually add a recipe? Maybe a tasty recipe from
              your grandmother or your latest creation? Feel free do add it
              here.
            </p>
            <div style={{marginTop: "100px"}}></div>
            <CreateInputComponent></CreateInputComponent>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Create;
