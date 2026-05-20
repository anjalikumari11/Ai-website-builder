import React, { useState } from "react";
import { generateWebsite } from "../api/Ai";
import { useNavigate } from "react-router-dom";
import { useWebsite } from "../Context/WebsiteContext";

function Builder() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setWebsiteData } = useWebsite();
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    description: "",
    theme: "",
    style: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.businessName ||
      !formData.businessType ||
      !formData.description
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      const data = await generateWebsite(formData);
      console.log("API DATA:", data);
const parsedData = JSON.parse(data.body);

      // Save AI data in Context
      setWebsiteData(parsedData);

      // Redirect
      navigate("/preview");

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        {/* Small Width Container */}
        <div className="col-md-8 col-lg-6">

          <div className="card shadow border-0 rounded-4">

            <div className="card-body p-4">

              <h2 className="text-center fw-bold mb-2">
                AI Website Builder
              </h2>

              <p className="text-center text-muted mb-4">
                Generate your website using AI
              </p>

              <form onSubmit={handleSubmit}>

                {/* Business Name */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Business Name
                  </label>

                  <input
                    type="text"
                    name="businessName"
                    className="form-control"
                    placeholder="Enter business name"
                    value={formData.businessName}
                    onChange={handleChange}
                  />
                </div>

                {/* Business Type */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Business Type
                  </label>

                  <input
                    type="text"
                    name="businessType"
                    className="form-control"
                    placeholder="Salon, Gym..."
                    value={formData.businessType}
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Description
                  </label>

                  <textarea
                    name="description"
                    rows="3"
                    className="form-control"
                    placeholder="Describe your business"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Theme */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Theme
                  </label>

                  <select
                    name="theme"
                    className="form-select"
                    value={formData.theme}
                    onChange={handleChange}
                  >
                    <option value="">Select Theme</option>
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="modern">Modern</option>
                  </select>
                </div>

                {/* Style */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Website Style
                  </label>

                  <select
                    name="style"
                    className="form-select"
                    value={formData.style}
                    onChange={handleChange}
                  >
                    <option value="">Select Style</option>
                    <option value="minimal">Minimal</option>
                    <option value="professional">Professional</option>
                    <option value="creative">Creative</option>
                  </select>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="btn btn-dark w-100"
                >
                  Generate Website
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Builder;