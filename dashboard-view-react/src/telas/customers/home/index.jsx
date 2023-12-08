import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonToolbar,
  Modal,
  Dropdown,
} from "react-bootstrap";

// Componente da app
import Dashboard from "../../../components/Dashboard";
import StyledModal from "./components/StyledModal";

// Serviços
import RequestHTTP from "../../../services/services";

// Placeholder Loader
// import ContentLoader from "react-content-loader";

const ModalPessoaConvenio = ({
  showModal,
  handleClose,
  currentUserName,
  currentUserId,
  dataList = [],
  dropdownOptions = [],
  setDropdownOptions = [],
}) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Emitir guia para {currentUserName}:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {dataList.length > 0 &&
            dataList.map((convenio) => {
              return (
                <>
                  <Row>
                    <Col>
                      <p className="text-center">{convenio.nome}</p>
                    </Col>
                    <Col>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Ativo
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => {}}>
                            Ativo
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => {}}>
                            Inativo
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </>
              );
            })}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => console.log(dataList)}>
          Save Changes
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            handleClose();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function CustomersHome() {
  const [customerList, setCustomerList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalConvenio, setShowModalConvenio] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();
  const [currentUserName, setCurrentUserName] = useState();
  const [agreementsList, setAgreementsList] = useState();
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleCloseConvenio = () => setShowModalConvenio(false);
  const handleShowConvenio = () => setShowModalConvenio(true);

  const actionsButtonGroup = [
    {
      title: "Ações",
      component: ({ _id = "_id", name = "name" }) => {
        return (
          <>
            <Button
              variant="success"
              size="sm"
              className="me-2"
              onClick={() => {
                setCurrentUserId(_id);
                setCurrentUserName(name);
                handleShow();
              }}
            >
              Emitir
            </Button>
            <Button
              variant="info"
              size="sm"
              className="me-2"
              onClick={() => {
                setCurrentUserId(_id);
                setCurrentUserName(name);
                handleShowConvenio();
              }}
            >
              Convênios
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="me-2"
              onClick={() => console.log("Editar")}
            >
              Editar
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                RequestHTTP.DeleteItemById("/customers", _id);
                window.location.reload();
              }}
            >
              Deletar
            </Button>
          </>
        );
      },
    },
  ];

  const GetCustomers = async () => {
    const data = await RequestHTTP.GetPaginatedItems("/customers");
    setCustomerList(data);
  };

  const GetAllConvenios = async () => {
    const data = await RequestHTTP.GetPaginatedItems("/agreements");
    setAgreementsList(data);
  };

  useEffect(() => {
    GetCustomers();
  }, []);

  useEffect(() => {
    if (showModalConvenio) {
      GetAllConvenios();
    }
  }, [showModalConvenio]);

  return (
    <>
      <StyledModal
        showModal={showModal}
        handleClose={handleClose}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
      />
      <ModalPessoaConvenio
        showModal={showModalConvenio}
        handleClose={handleCloseConvenio}
        currentUserId={currentUserId}
        currentUserName={currentUserName}
        dataList={agreementsList}
        dropdownOptions={dropdownOptions}
        setDropdownOptions={setDropdownOptions}
      />

      <Container fluid>
        <Container fluid className="pt-3 pb-2 mb-3 border-bottom">
          <Row className="justify-content-between align-items-center">
            <Col md="auto">
              <h1 className="h2">Clientes:</h1>
            </Col>
            <Col md="auto" className="flex-fill">
              <Form.Control
                type="text"
                placeholder="Pesquisar..."
                className="mr-sm-2"
              />
            </Col>
            <Col md="auto">
              <ButtonToolbar className="mb-2 mb-md-0">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => {}}
                >
                  Pesquisar
                </Button>
              </ButtonToolbar>
            </Col>
            <Col md="auto">
              <ButtonToolbar className="mb-2 mb-md-0">
                <Button
                  href="/customers/add"
                  variant="outline-secondary"
                  size="sm"
                >
                  + Novo Cliente
                </Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Container>

        <Dashboard
          elements={customerList}
          fields={["nome", "cpf", "email", "telefone", "registerDate"]}
          buttonsGroup={actionsButtonGroup}
        />
      </Container>
    </>
  );
}

export default CustomersHome;
