import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import RequestHTTP from "../../../services/services";

export default function CustomersAdd() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [rg, setRG] = useState("");
  const [cpf, setCPF] = useState("");
  const [matricula, setMatricula] = useState("");
  const [cep, setCEP] = useState("");
  const [endereco, setEndereco] = useState("");
  const [uf, setUF] = useState("");
  const [detalhesCliente, setDetalhesCliente] = useState("");

  const CustomFormField = (
    label,
    placeholder,
    nome,
    set,
    required = false,
    as = "input"
  ) => {
    return (
      <>
        <Form.Group controlId={nome} className="mb-4">
          <Form.Label>{`${label}:`}</Form.Label>
          <Form.Control
            type="text"
            placeholder={placeholder}
            value={nome}
            onChange={(event) => set(event.target.value)}
            required={required}
            as={as}
            rows={as === "textarea" ? 6 : null}
          />
        </Form.Group>
      </>
    );
  };

  const SubmitFormData = () => {
    const body = {};

    body.nome = nome;
    body.sobrenome = sobrenome;
    body.telefone = telefone;
    body.email = email;
    body.rg = rg;
    body.cpf = cpf;
    body.matricula = matricula;
    body.cep = cep;
    body.endereco = endereco;
    body.uf = uf;
    body.detalhesCliente = detalhesCliente;

    if ((nome !== "", sobrenome !== "", telefone !== "", email !== "")) {
      RequestHTTP.AddItem("/customers", body);
      window.location.reload();
    }
  };

  return (
    <Container fluid>
      <Form>
        <Row className="form-group mb-4">
          <Col>
            {CustomFormField("Nome", "Insira o nome...", nome, setNome, true)}
          </Col>

          <Col>
            {CustomFormField(
              "Sobrenome",
              "Insira o sobrenome...",
              sobrenome,
              setSobrenome,
              true
            )}
          </Col>
        </Row>

        <Row className="form-group mb-4">
          <Col>
            {CustomFormField(
              "Telefone",
              "(00)90000-0000",
              telefone,
              setTelefone,
              true
            )}
          </Col>

          <Col>
            {CustomFormField(
              "Email",
              "exemplo@exemplo.com",
              email,
              setEmail,
              true
            )}
          </Col>
        </Row>

        <Row className="form-group mb-4">
          <Col>{CustomFormField("RG", "00.000.000-0", rg, setRG)}</Col>

          <Col>{CustomFormField("CPF", "000.000.000-00", cpf, setCPF)}</Col>

          <Col>
            {CustomFormField("Matrícula", "000000", matricula, setMatricula)}
          </Col>
        </Row>

        <Row className="form-group mb-4">
          <Col>{CustomFormField("CEP", "00000-000", cep, setCEP)}</Col>

          <Col>
            {CustomFormField(
              "Endereco",
              "Rua Exemplo, n° 100",
              endereco,
              setEndereco
            )}
          </Col>

          <Col>{CustomFormField("UF", "Rio de Janeiro", uf, setUF)}</Col>
        </Row>

        <Row>
          <Col>
            {CustomFormField(
              "Detalhes do cliente",
              "",
              detalhesCliente,
              setDetalhesCliente,
              false,
              "textarea"
            )}
          </Col>
        </Row>
        <Form.Group className="mb-4"></Form.Group>

        <Form.Group className="mb-4">
          <Button variant="primary" onClick={() => SubmitFormData()}>
            Adicionar Cliente
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
