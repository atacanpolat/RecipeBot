import { HeaderPrivate, HeaderPrivateTop } from "../components/HeaderPrivate";
import Header from "../components/Header";

import { Container } from "@material-ui/core";

import GenerateInputComponent from "../components/GenerateInputComponent";

function Generate() {
  const token = localStorage.getItem('jwt');


  return (
    <div
      style={{
        alignItems: "center",
        width: "100%",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      {token ? <HeaderPrivateTop /> : <Header />}

      <div style={{ display: "flex" }}>
        {token && <HeaderPrivate className="sideNav" />}
        <div
          style={{ display: "flex", flexDirection: "column", flex: "1 1 auto" }}
        >
          {/* MAIN CONTAINER */}
          <Container>
            <GenerateInputComponent onClickGenerate={""} />
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Generate;
