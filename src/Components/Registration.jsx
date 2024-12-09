import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Toaster, toast } from "sonner";

const RegistrationForm = () => {
  const [captchaToken, setCaptchaToken] = useState(null);

  const [formData, setFormData] = useState({
    fullname: "",
    branch: "",
    student_no: "",
    email: "",
    phone_no: "",
    gender: "",
    hostel: "",
    recaptcha: "",
  });

  const handleChange = (e) => {
    let fieldName = e.target.name;
    let fieldValue = e.target.value;
    setFormData((currData) => {
      currData[fieldName] = fieldValue;
      return { ...currData };
    });
  };

  const handleVerify = (token) => {
    setCaptchaToken(token);
    setFormData((currData) => ({
      ...currData,
      recaptcha: token, // Add the token to formData
    }));
  };

  const validateEmail = (email) => {
    // console.log(email);
    const regex = /^[a-zA-z]+[0-9]+@akgec\.ac.in$/;
    return regex.test(email);
  };

  const validateNumber = (phone_no) => {
    // console.log(phone);
    const regex = /^\d{10}$/;
    return regex.test(phone_no);
  };
  const validateStudentNO = (student_no) => {
    const regex = /^(21|23|24|25)\d{3,5}$/;
    return regex.test(student_no);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }
  
    if (!validateStudentNO(formData.student_no.trim())) {
      toast.error("Please enter a valid student number");
      return;
    }
    if (!validateEmail(formData.email.trim())) {
      toast.error("Please enter a valid college email");
      return;
    }
    if (!validateNumber(formData.phone_no.trim())) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!formData.email.includes(formData.student_no.trim())) {
      toast.error("Your student number must be included in your email.");
      return;
    }
  
    try {
      const response = await fetch(
        "https://brl_registration_12.sugandhi.tech/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // formData includes recaptcha token
        }
      );
  
      if (response.ok) {
        const result = await response.json();
        toast.success("Form submitted successfully!");
        console.log("Response:", result);
  
        setFormData({
          fullname: "",
          branch: "",
          student_no: "",
          email: "",
          phone_no: "",
          gender: "",
          hostel: "",
          recaptcha: "",
        });
        setCaptchaToken(null); // Reset captcha token
      } else {
        toast.error("Something went wrong. Please try again.");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      toast.error("Failed to submit form. Please check your connection.");
      console.error("Error:", error);
    }
  };
  
  return (
    <div className=" bg-cyan-600 m-0 p-0 h-full bg-cover bg-centbg-slate-600 min-h-screen flex justify-center items-centerer ">
      <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg m-5">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Registration Form
        </h2>
        <Toaster position="top-right" />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="branch"
              className="block text-gray-700 font-medium mb-2"
            >
              Branch:
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Branch</option>
              <option value="CSE(core)">CSE</option>
              <option value="CSE(AIML)">CSE(AIML)</option>
              <option value="CSE(DS)">CSE(DS)</option>
              <option value="CSE">CSE(Hindi)</option>
              <option value="CS">CS</option>
              <option value="IT">IT</option>
              <option value="CSIT">CSIT</option>
              <option value="AIML">AIML</option>
              <option value="ECE/EN">ECE/EN</option>
              <option value="ME">ME</option>
              <option value="CE">CE</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="studentNo"
              className="block text-gray-700 font-medium mb-2"
            >
              Student No:
            </label>
            <input
              type="text"
              id="studentNo"
              name="student_no"
              value={formData.student_no}
              onChange={handleChange}
              placeholder="Enter your student number"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email ID:
            </label>
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
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone No:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 font-medium mb-2"
            >
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Gender</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>
          </div>

        <div className="mb-4">
          <label
            htmlFor="hostel"
            className="block text-gray-700 font-medium mb-2"
          >
            Residence:
          </label>
          <select
            id="hostel"
            name="hostel"
            value={formData.hostel}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Hostel</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
          </select>
        </div>
        <ReCAPTCHA
          sitekey="6LfhDZkaAAAAAA7cvVRIbrOl__2frrLF_aQh7WPL"  // Replace with your site key from Google reCAPTCHA v3
          size="invisible" // Invisible reCAPTCHA
        />
          <div className="mb-4">
            <label
              htmlFor="hostel"
              className="block text-gray-700 font-medium mb-2"
            >
              Residence:
            </label>
            <select
              id="hostel"
              name="hostel"
              value={formData.hostel}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Residence</option>
              <option value="Hostel">Hostel</option>
              <option value="Day-scholar">Day-scholar</option>
            </select>
          </div>
          <ReCAPTCHA
            sitekey="6LfhDZkaAAAAAA7cvVRIbrOl__2frrLF_aQh7WPL" // Replace with your site key
            size="invisible" // Invisible reCAPTCHA
            onChange={handleVerify} // Pass the handleVerify function
          />

          <div className=" relative mx-auto  z-2 text-center font-albert font-semibold text-[1vw] flex justify-center items-center shadow-sm text-black py-4   px-4  bg-no-repeat bg-center bg-contain w-fit transform hover:scale-105 transition-all ease-in-out delay-0 duration-3000 cursor-pointer ">
            <button className="p-3 text-2xl font-bolder bg-blue-500 rounded-lg w-36">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
