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

function Home() {
  const key = "d870f3353d5cf268798d6e6a25a2dcbc";
  const [page, setPage] = useState(1);
  const [filmes, setFilmes] = useState([]);
  const [language, setLanguage] = useState("pt-BR");
  const [tipo, setTipo] = useState("movie");

  useEffect(() => {
    async function getFilmes() {
      window.scrollTo(0, 0);

      axios
        .all([
          await api.get(
            `discover/${tipo}?api_key=${key}&language=${language}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
          ),
        ])
        .then((response) => {
          setFilmes(response[0].data.results);
        });
    }
    getFilmes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, tipo]);

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
                <h1 className="title">Filmes sugeridos para você</h1>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button className="btn-danger" onClick={() => setTipo("movie")}>
                  Por Filme
                </Button>
              </Col>
              <Col className="text-center">
                <Button className="btn-danger" onClick={() => setTipo("tv")}>
                  Por Série
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
            <Row>
              {filmes !== undefined && filmes.length
                ? filmes.map((filme) => (
                    <Col xs={12} md={6} lg={4} key={filme.id}>
                      <Link to={`/${tipo}/${filme.id}`} className="blocoFilme">
                        <h2>
                          {filme.original_title
                            ? filme.original_title
                            : filme.name}
                        </h2>
                        <Image
                          src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
                          fluid
                        />
                        <div className="nota">{filme.vote_average}</div>
                        <div className="data">
                          Data de Lançamento:
                          <br />
                          {filme.release_date
                            ? filme.release_date
                            : filme.first_air_date}
                        </div>
                        <p></p>
                      </Link>
                    </Col>
                  ))
                : ""}
            </Row>
            <Row>
              <Col className="text-center">
                <Button onClick={() => setPage(page <= 1 ? 1 : page - 1)}>
                  Anterior
                </Button>{" "}
                <Button onClick={() => setPage(page + 1)}>Próxima</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
