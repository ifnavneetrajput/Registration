import { useState } from "react";

import { Toaster, toast } from 'sonner';


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    studentNo: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
   let fieldName = (e.target.name);
   let fieldValue = (e.target.value);
   setFormData((currData) => {
   
     currData[fieldName]=fieldValue
     return {...currData};

 });
  };

  const validateEmail = (email)=>{
   // console.log(email);
      const regex = /^[a-zA-z]+[0-9]+@akgec\.ac.in$/;
      return regex.test(email);
  }

  const validateNumber = (phone)=>{
   // console.log(phone);
    const regex = /^\d{10}$/;
    return regex.test(phone);

  }
  // const validateStudentNO=(studentNo)=>{
  //   const regex = /^(21|22|23|24)\d{4}$/;

  //   return regex.test(studentNo);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
 
    let hasError = false;
    // if(!validateStudentNO(formData.studentNo)){
    //   toast.error("please enter a valid student number");
    //   return hasError = true;
    // }

    if (!validateEmail(formData.email)) {
      toast.error("please enter college mail");
      
      return hasError=true;
    }

    if(!validateNumber(formData.phone)){
    toast.error("please enter a valid phone number");
      return hasError=true;
    }

    if(hasError){
      return;
    }
    console.log("Form Submitted:", formData);
 
    

    setFormData({name: "",
      branch: "",
      studentNo: "",
      email: "",
      phone: "",})
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 ">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Registration Form</h2>
      <Toaster position="top-right"/>
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

        <div className=" relative mx-auto  z-2 text-center font-albert font-semibold text-[1vw] flex justify-center items-center shadow-sm text-black py-4   px-4  bg-no-repeat bg-center bg-contain w-fit transform hover:scale-105 transition-all ease-in-out delay-0 duration-3000 cursor-pointer ">
          <button className="p-3 text-2xl font-bolder bg-blue-500 rounded-lg w-36">Submit</button>
        </div>
      </form>
     
    </div>
  );
};

export default RegistrationForm;
