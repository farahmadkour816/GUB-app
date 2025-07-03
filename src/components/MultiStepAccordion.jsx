import { useState } from "react";

export default function MultiStepAccordion() {
  const [openStep, setOpenStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      {/* Step 1: Personal Info */}
      <div className="border rounded-xl shadow p-4">
        <button
          onClick={() => setOpenStep(1)}
          className="w-full text-left text-lg font-semibold"
        >
          Step 1: Personal Information
        </button>
        {openStep === 1 && (
          <div className="mt-4 space-y-3">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}
      </div>

      <button
        onClick={() => alert(JSON.stringify(formData, null, 2))}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
}
