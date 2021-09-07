import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../../redux/projectSlice";
import useWindowDimensions, { dateString, priceString } from "../../utils";
import LoadingIndicator from "../Utils/LoadingIndicator";

export default function Projects() {
  const projects = useSelector((state) => state.project.project);
  const status = useSelector((state) => state.project.status);
  const error = useSelector((state) => state.project.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <section style={{ height: "100%" }}>
      <h1 style={{ width: "90%" }}>These Are My Projects</h1>
      <div
        style={{ height: "90%", width: "90%", justifyContent: "flex-start" }}
      >
        {useWindowDimensions().width > 700 ? (
          <table>
            <thead>
              <tr style={{ paddingBottom: 0 }}>
                <th style={{ width: "20%" }}>CREATE DATE</th>
                <th style={{ width: "30%" }}>CLIENT</th>
                <th style={{ width: "20%" }}>PROJECT</th>
                <th style={{ width: "10%" }}>STATUS</th>
                <th style={{ width: "20%" }}>TOTAL PRICE</th>
              </tr>
            </thead>
            {!projects || status === "loading" ? (
              <tbody>
                <tr>
                  <td>
                    {error ? (
                      <p className="error-text">{error}</p>
                    ) : (
                      <LoadingIndicator status={status} />
                    )}
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {projects.data.map((project, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ width: "20%" }}>
                        {dateString(project.created_at)}
                      </td>
                      <td style={{ width: "30%" }}>{project.client_name}</td>
                      <td style={{ width: "20%" }}>{project.name}</td>
                      <td style={{ width: "10%" }}>{project.status}</td>
                      <td style={{ width: "20%" }}>
                        ${priceString(project.price_total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        ) : !projects || status === "loading" ? (
          <div>
            {error ? (
              <p className="error-text">{error}</p>
            ) : (
              <LoadingIndicator status={status} />
            )}
          </div>
        ) : (
          <ul>
            {projects.data.map((project, index) => {
              return (
                <div key={index} className="project-card">
                  <div
                    className="row"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div style={{ width: "90%", height: "100%" }}>
                      <h3>{project.name}</h3>
                      <ul className="card-list">
                        <li>
                          <span className="card-list-title">client: </span>
                          <span className="card-list-body">
                            {project.client_name}
                          </span>
                        </li>
                        <li>
                          <span className="card-list-title">created: </span>
                          <span className="card-list-body">
                            {dateString(project.created_at)}
                          </span>
                        </li>
                        <li>
                          <span className="card-list-title">status: </span>
                          <span className="card-list-body">
                            {project.status}
                          </span>
                        </li>
                        <li>
                          <span className="card-list-title">total: </span>
                          <span className="card-list-body">
                            ${priceString(project.price_total)}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="card-line" />
                  </div>
                </div>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
