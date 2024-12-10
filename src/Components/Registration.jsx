import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Toaster, toast } from "sonner";
import image from "../Components/sideImage.jpeg"

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
    recaptcha_token: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((currData) => ({
      ...currData,
      [name]: value,
    }));
  };

  const handleVerify = (token) => {
    setCaptchaToken(token);
    setFormData((currData) => ({
      ...currData,
      recaptcha_token: token,
    }));
  };

  const validateEmail = (email) => /^[a-zA-Z]+[0-9]+@akgec\.ac.in$/.test(email);

  const validateNumber = (phone_no) => /^\d{10}$/.test(phone_no);

  const validateStudentNO = (student_no) =>
    /^2\d{5,8}$/.test(student_no);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }

    if (!validateStudentNO(formData.student_no.trim())) {
      toast.error("Please enter a valid student number.");
      return;
    }

    if (!validateEmail(formData.email.trim())) {
      toast.error("Please enter a valid college email.");
      return;
    }

    if (!validateNumber(formData.phone_no.trim())) {
      toast.error("Please enter a valid phone number.");
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
          body: JSON.stringify(formData),
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
          recaptcha_token: "",
        });
        setCaptchaToken(null);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to submit form. Please check your connection.");
      console.error("Error:", error);
    }
  };

  return (
    <div className=" bg-black h-full flex justify-center items-center">
      <div className=" m-2 h-screen w-1/2 hidden md:block">
        <img
          className="h-screen w-full object-cover rounded-3xl"
          src={image}
          alt=""
        />
      </div>

      <div className= " h-full bg-black border shadow-lg rounded-lg my-2 ml-10 mr-10 m w-full md:w-1/2 p-6 ">
      <div className="flex">
        <h3 className=" text-2xl font-semibold text-center text-blue-600 mb-6">
          Registration Form
        </h3>
      </div>
        <Toaster position="top-right" />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full p-3 border border-gray-300 rounded-md bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 font-medium mb-2">
              Branch:
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md bg-transparent text-gray-500"
            >
              <option value="">Select</option>
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
            <label className="block text-gray-400 font-medium mb-2">
              Student No:
            </label>
            <input
              type="text"
              name="student_no"
              value={formData.student_no}
              onChange={handleChange}
              placeholder="Enter your student number"
              required
              className="w-full p-3 border border-gray-300 rounded-md bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 font-medium mb-2">
              Email ID:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full p-3 border border-gray-300 rounded-md bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 font-medium mb-2">
              Phone No:
            </label>
            <input
              type="tel"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className="w-full p-3 border border-gray-300 rounded-md bg-transparent"
            />
          </div>
          <div className=" flex gap-10 justify-around w-full">
            <div className="mb-4 w-1/2">
              <label className="block text-gray-400 font-medium mb-2">
                Gender:
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-transparent text-gray-500"
              >
                <option value="" className="text-gray-100">Select</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
              </select>
            </div>

            <div className="mb-4 w-1/2">
              <label className="block text-gray-400 font-medium mb-2">
                Hostel:
              </label>
              <select
                name="hostel"
                value={formData.hostel}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md bg-transparent text-gray-500"
              >
                <option value="" className="">Select</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <ReCAPTCHA
              sitekey="6LezfHUqAAAAAGhAQ3ZxHFC76e7a8624kdQjYjKM"
              onChange={handleVerify}
            />
          </div>

         <div className=" flex justify-center items-center">
         <button
            type="submit"
            className="px-6 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition w-full"
          >
            Register
          </button>
         </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
