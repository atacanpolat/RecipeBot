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
            <CreateInputComponent></CreateInputComponent>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Create;
