function TemplateOne({ data }) {

  console.log("Template Data:", data);

  return (
    <div>
      <h1>{data.heroTitle}</h1>
      <p>{data.heroSubtitle}</p>

      <h2>About</h2>
      <p>{data.about}</p>

      {data.services?.map((service, index) => (
        <div key={index}>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
}