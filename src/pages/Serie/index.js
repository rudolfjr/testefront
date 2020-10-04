import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Node Modules
import { Container, Row, Col, Image } from "react-bootstrap";

// components
import Menu from "../../Components/Menu";

// Services
import api from "../../services/api";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

function Serie({ match }) {
  const { id } = match.params;
  const [filme, setFilme] = useState([]);
  const [video, setVideos] = useState([]);
  const [language, setLanguage] = useState("pt-BR");

  useEffect(() => {
    async function getFilme() {
      const response = await api.get(
        `tv/${id}?api_key=d870f3353d5cf268798d6e6a25a2dcbc&language=${language}`
      );
      setFilme(response.data);
    }

    async function getTrailer() {
      const response = await api.get(
        `tv/${id}/videos?api_key=d870f3353d5cf268798d6e6a25a2dcbc&language=${language}`
      );
      console.log(response);
      setVideos(response.data);
    }
    getFilme();
    getTrailer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {filme.original_name !== undefined && filme.original_name.length ? (
        <Container>
          <Row>
            <Col xs={12} sm={4}>
              <Menu />
              <p>
                <Link to="/" className="btn btn-danger">
                  Voltar
                </Link>
              </p>
            </Col>

            <Col xs={12} sm={8}>
              <Row>
                <Col>
                  <h1 className="title">{filme.title}</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="movieBox">
                    <Row>
                      <Col xs={12} md>
                        <p>
                          <Image
                            src={`https://image.tmdb.org/t/p/w500/${filme.poster_path}`}
                            fluid
                          />
                        </p>
                      </Col>
                      <Col xs={12} md>
                        <legend>
                          <strong>Sinopse</strong>
                        </legend>
                        <p className="mt-2 mb-2 plot">
                          {filme.overview
                            ? filme.overview
                            : "Sinopse não informada"}
                        </p>
                        <hr />
                        <legend>
                          <strong>Informações</strong>
                        </legend>
                        <p>
                          <strong>Lançamento:</strong>{" "}
                          {filme.release_date !== "N/A"
                            ? filme.release_date
                            : "Sem informação"}
                        </p>
                        <p>
                          <strong>Gêneros:</strong> &nbsp;
                          {filme.genres
                            ? filme.genres.map((genre, index) => (
                                <span className="genres" key={index}>
                                  {genre.name}{" "}
                                </span>
                              ))
                            : "Sem informação"}
                        </p>
                        {filme.runtime && (
                          <p>
                            <strong>Duração: </strong>
                            {filme.runtime ? `${filme.runtime}m` : ""}
                          </p>
                        )}
                        {filme.number_of_episodes && (
                          <p>
                            <strong>Nº de Episódios: </strong>
                            {filme.number_of_episodes
                              ? `${filme.number_of_episodes}`
                              : ""}
                          </p>
                        )}
                        {filme.number_of_seasons && (
                          <p>
                            <strong>Nº de Temporadas: </strong>
                            {filme.number_of_seasons
                              ? `${filme.number_of_seasons}`
                              : ""}
                          </p>
                        )}
                      </Col>
                    </Row>
                    {video.results &&
                      video.results.map((v, index) => (
                        <Row>
                          <Col>
                            <hr />
                            <legend>
                              <strong>{v.type}</strong>
                            </legend>

                            <Row>
                              <Col>
                                {v.site === "YouTube" ? (
                                  <>
                                    <iframe
                                      width="100%"
                                      height="315"
                                      src={`https://www.youtube.com/embed/${v.key}`}
                                      frameborder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowfullscreen
                                    ></iframe>
                                  </>
                                ) : (
                                  <>
                                    <iframe
                                      src={`https://player.vimeo.com/video/${v.key}`}
                                      width="640"
                                      height="428"
                                      frameborder="0"
                                      allow="autoplay; fullscreen"
                                      allowfullscreen
                                    ></iframe>
                                  </>
                                )}
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ))}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}
    </>
  );
}

export default Serie;
