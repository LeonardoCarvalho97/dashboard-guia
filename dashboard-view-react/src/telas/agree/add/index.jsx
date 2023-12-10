import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import RequestHTTP from "../../../services/services";
import CustomAuthorizationDropdown from "./components/CustomAuthorizationDropdown";
import DefaultAppFormField from "../../../components/DefaultAppFormField";

export default function AgreeAdd() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadesAtivas, setEspecialidadesAtivas] = useState([]);
  const [locais, setLocal] = useState([]);
  const [locaisAtivos, setLocaisAtivos] = useState([]);

  const SubmitAgreeData = async () => {
    const body = {};

    body.especialidades = [];
    body.locais = [];

    especialidadesAtivas.forEach((especialidade) => {
      body.especialidades.push(especialidade._id);
    });

    locaisAtivos.forEach((local) => {
      body.locais.push(local._id);
    });

    body.nome = nome;
    body.preco = preco;
    body.criadoPor = "656cb3af8d7c85e024a6a892";

    console.log(body);

    if (
      body.especialidades.length > 0 &&
      body.locais.length > 0 &&
      body.nome &&
      body.preco
    ) {
      const response = await RequestHTTP.AddItem("/agreements", body);
      console.log(response);
      // window.location.reload();
    }
  };

  const GetAllDropdownData = async () => {
    const dadosEspecialidades = await RequestHTTP.GetPaginatedItems(
      "/expertises",
      100
    );
    const dadosLocalidades = await RequestHTTP.GetPaginatedItems(
      "/clinics",
      100
    );

    setLocal(dadosLocalidades);
    setEspecialidades(dadosEspecialidades);
  };

  const JoinArrayByName = (array, field = "nome") => {
    const formattedArray = array.map((item) => item[field]);
    const string = formattedArray.join("; ");
    return string;
  };

  useEffect(() => {
    GetAllDropdownData();
  }, []);

  return (
    <Container fluid>
      <Form>
        <Row className="form-group mb-4">
          {/* Nome */}
          <Col>
            <DefaultAppFormField
              label={"Nome"}
              placeholder={"Insira o nome..."}
              state={nome}
              setState={setNome}
              required={true}
            />
          </Col>

          {/* Preço */}
          <Col>
            <DefaultAppFormField
              label={"Preço"}
              placeholder={"Insira o preço..."}
              state={preco}
              setState={setPreco}
              required={true}
            />
          </Col>
        </Row>

        <Row className="mb-2">
          {/* Especialidades */}
          <Col className="d-flex flex-column align-items-start">
            <div className="d-flex">
              <CustomAuthorizationDropdown
                title={"Especialidades"}
                list={especialidades}
                state={especialidadesAtivas}
                setState={setEspecialidadesAtivas}
              />
              <Button className="ms-2" variant={"light"}>
                + Nova Especialidade
              </Button>
            </div>
            <p
              style={{ overflowWrap: "break-word", maxWidth: "350px" }}
              className="mt-2"
            >
              {`Selecionados: ${JoinArrayByName(especialidadesAtivas)}`}
            </p>
          </Col>

          {/* Locais */}
          <Col className="d-flex flex-column align-items-start">
            <div className="d-flex">
              <CustomAuthorizationDropdown
                title={"Locais"}
                list={locais}
                state={locaisAtivos}
                setState={setLocaisAtivos}
              />
              <Button className="ms-2" variant={"light"}>
                + Novo Local
              </Button>
            </div>
            <p
              style={{ overflowWrap: "break-word", maxWidth: "350px" }}
              className="mt-2"
            >
              {`Selecionados: ${JoinArrayByName(locaisAtivos)}`}
            </p>
          </Col>
        </Row>

        <Button
          variant="primary"
          onClick={() => SubmitAgreeData()}
          className="mt-4"
        >
          Criar guia
        </Button>
      </Form>
    </Container>
  );
}
