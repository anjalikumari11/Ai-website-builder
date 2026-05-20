import React from "react";
import { useWebsite } from "../Context/WebsiteContext";

function Preview() {
  const { websiteData } = useWebsite();

  console.log("Preview Data: from preview page", websiteData);

  if (!websiteData || Object.keys(websiteData).length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{websiteData.heroTitle}</h1>

      <p>{websiteData.heroSubtitle}</p>

      <h2>About</h2>

      <p>{websiteData.about}</p>

      <div>
        {websiteData.services?.map((service, index) => (
          <div key={index}>
            <h3>{service.name}</h3>

            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Preview;