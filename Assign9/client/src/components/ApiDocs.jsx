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

  const sampleMovie = {
    _id: "6af10ebf5796bbd9655f7684",
    id: 1,
    name: "The House of Wax",
    year: 1953,
    description:
      "An obsessed pathologist discovers and captures a parasitic <br>creature that grows when fear grips its host.",
    image: "/images/house_of_wax.jpg",
    imageTag: '<img src="/images/house_of_wax.jpg" alt="The House of Wax" />',
  };

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

      <h3>Movie Fields</h3>
      <ul className="api-endpoint-list">
        <li>
          <code>image</code>
          <span>Image path stored in MongoDB (example: /images/the_raven.jpg)</span>
        </li>
        <li>
          <code>imageTag</code>
          <span>HTML image tag string stored in MongoDB for display/reference</span>
        </li>
      </ul>

      <h3>Sample Movie Response</h3>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        <code>{JSON.stringify(sampleMovie, null, 2)}</code>
      </pre>
    </section>
  );
}

export default ApiDocs;
