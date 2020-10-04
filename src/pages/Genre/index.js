import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Node Modules
import axios from "axios";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

// Services
import api from "../../services/api";

// components
import Menu from "../../Components/Menu";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

function Genre() {
  const key = "d870f3353d5cf268798d6e6a25a2dcbc";
  const [generos, setGeneros] = useState([]);
  const [language, setLanguage] = useState("pt-BR");

  useEffect(() => {
    async function getFilmes() {
      window.scrollTo(0, 0);

      axios
        .all([
          await api.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=${language}`
          ),
        ])
        .then((response) => {
          setGeneros(response[0].data.genres);
        });
    }
    getFilmes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} sm={4}>
            <Menu />
          </Col>
          <Col xs={12} sm={8}>
            <Row>
              <Col>
                <h1 className="title">Filtre por Gênero</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
            <Row>
              {generos !== undefined && generos.length
                ? generos.map((genero) => (
                    <Col xs={12} md={6} lg={4} key={genero.id}>
                      <Link
                        to={`genre/${genero.id}/${genero.name}`}
                        className="blocoFilme"
                      >
                        <Button className="btn-danger">{genero.name}</Button>
                      </Link>
                    </Col>
                  ))
                : ""}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Genre;
