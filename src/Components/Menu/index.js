import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { RiMovieLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { AiTwotoneFire, AiFillDatabase } from "react-icons/ai";
import { CgCalendarDates } from "react-icons/cg";

import { FaLinkedinIn, FaGithub, FaHome } from "react-icons/fa";
import { Row, Col, Button, Form } from "react-bootstrap";

function Menu() {
  let history = useHistory();
  const [busca, setBusca] = useState("");
  const [buscou, setBuscou] = useState(false);

  function handleBuscaFilme() {
    history.push(`/search/${busca}`);
  }

  return (
    <>
      <div className="boxMenu">
        <div className="logo">
          <RiMovieLine size={24} color="#E02041" /> Cine Pipoca
        </div>

        <hr />

        <ul>
          <li>
            <Link to="/">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/trending">
              <AiTwotoneFire /> Populares
            </Link>
          </li>
          <li>
            <Link to="/discover">
              <CgCalendarDates /> Breve Lançamentos
            </Link>
          </li>
          <li>
            <Link to="/genres">
              <AiFillDatabase /> Gêneros
            </Link>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/rudolfkrokerjr/">
              <FaLinkedinIn /> Linkedin
            </a>
          </li>
          <li>
            <a href="https://github.com/rudolfjr">
              <FaGithub /> GitHub
            </a>
          </li>
        </ul>

        <hr />

        <Form onSubmit={handleBuscaFilme}>
          <Row>
            <Col xs={9}>
              <Form.Control
                type="text"
                placeholder="Busque por Filme..."
                value={busca}
                onClick={(e) => setBuscou(false)}
                onChange={(e) => setBusca(e.target.value)}
              />
            </Col>
            <Col xs={3}>
              <Button variant="danger" type="submit">
                <FiSearch size={16} color="#fff" />
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      {buscou ? (
        <div className="buscaFeita">
          <h4>
            Você buscou por: <strong>{busca}</strong>
          </h4>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Menu;
