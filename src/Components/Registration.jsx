import { useState } from "react";
import Button from '@mui/material/Button';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    studentNo: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 ">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Registration Form</h2>
      <form onSubmit={handleSubmit}>
      
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      
        <div className="mb-4">
          <label htmlFor="branch" className="block text-gray-700 font-medium mb-2">Branch:</label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            placeholder="Enter your branch"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

  
        <div className="mb-4">
          <label htmlFor="studentNo" className="block text-gray-700 font-medium mb-2">Student No:</label>
          <input
            type="text"
            id="studentNo"
            name="studentNo"
            value={formData.studentNo}
            onChange={handleChange}
            placeholder="Enter your student number"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email ID:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

     
        <div className="mb-6">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone No:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button variant="contained" color="primary" className="w-full py-3 mt-4" onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
