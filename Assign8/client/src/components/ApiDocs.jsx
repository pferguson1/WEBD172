function ApiDocs({ apiBaseUrl }) {
  const baseUrl = apiBaseUrl.replace(/\/$/, "");

  const endpoints = [
    { method: "GET", path: "/api", description: "API index" },
    { method: "GET", path: "/api/movies", description: "Read all movies" },
    { method: "POST", path: "/api/movies", description: "Create a movie" },
    {
      method: "GET",
      path: "/api/movies/:id",
      description: "Read one movie",
    },
    {
      method: "PUT",
      path: "/api/movies/:id",
      description: "Update one movie",
    },
    {
      method: "DELETE",
      path: "/api/movies/:id",
      description: "Delete one movie",
    },
  ];

  return (
    <section className="api-page">
      <h2>Movie API</h2>
      <p className="api-base-url">
        Base URL: <span>{baseUrl}</span>
      </p>

      <ul className="api-endpoint-list">
        {endpoints.map((endpoint, index) => (
          <li key={`${endpoint.method}-${endpoint.path}-${index}`}>
            <span
              className={`api-method api-method-${endpoint.method.toLowerCase()}`}
            >
              {endpoint.method}
            </span>
            <code>{endpoint.path}</code>
            <span>{endpoint.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ApiDocs;
