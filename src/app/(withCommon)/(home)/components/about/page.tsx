

// import { FaXTwitter } from "react-icons/fa6";
// import { FaTelegramPlane } from "react-icons/fa";
// import { FaLinkedinIn } from "react-icons/fa";
// import { FaFacebookF } from "react-icons/fa";
// import { FaHome } from "react-icons/fa";
// import { TfiEmail } from "react-icons/tfi";
// import { MdOutlinePhone } from "react-icons/md";
// import { FaLocationDot } from "react-icons/fa6";
// import Container from "@/components/Shared/Container";
// import OurFleet from "./components/OurFleet";
// import TeamSection from "./components/TeamSection/TeamSection";


// const page = () => {
//     return (
//         <Container>

// {/* history  */}

// <div className="py-8">
//   <div className="py-8 rounded-lg shadow-md">
//     <h2 className="text-3xl lg:text-4xl carter-one-regular text-center mb-4 text-gray-300 ">Company History</h2>
//     <p className=" mb-4 text-gray-400 lg:text-[17px]">
//       Established in 2005, our car rental company has grown from a small, local
//       business to one of the leading car rental services in the country. Over the
//       years, we have expanded our fleet to include a wide variety of vehicles,
//       ranging from compact cars to luxury SUVs, to meet the diverse needs of our
//       customers.
//     </p>
//     <p className=" mb-4 text-gray-400 lg:text-[17px]">
//       Our commitment to providing top-notch customer service and maintaining a
//       reliable fleet has earned us a loyal customer base and numerous accolades
//       within the industry. We have always strived to innovate and adapt to the
//       changing needs of our customers, introducing new technologies and services
//       to make the rental experience as seamless as possible.
//     </p>
//     <p className=" text-gray-400 lg:text-[17px]">
//       Today, we continue to build on our legacy of excellence, ensuring that every
//       customer enjoys a safe, convenient, and enjoyable rental experience. We look
//       forward to serving you and being a part of your journey.
//     </p>
//   </div>
// </div>

// {/* fleet  */}
// <OurFleet/>

//         {/* Passion and Values of the company  */}


//         <div className="flex justify-center mt-24">
//             <img src="/pngegg (180).png" className="opacity-80 w-[700px] mb-7" />
//         </div>
        
//         <div className="flex flex-col gap-5">
         
//             <h2 className="text-3xl lg:text-4xl carter-one-regular text-center mb-4 text-gray-300 ">Our mission and values</h2>
//             <p className="text-base lg:text-xl text-gray-400"> In React One-way data binding means that data flows in a single direction: from a parent component to its children. This flow ensures that changes in the parent can affect its children, but not the other way around. Children components receive data from parents (via props), but they can't directly change that data. If a child needs to change something, it communicates with the parent by using callback functions passed as props. This setup maintains a clear and predictable flow of data, making the application easier to manage and less prone to bugs caused by conflicting data changes.</p>
//             <div className="flex items-center justify-end">
//             <button type="submit" className= "rounded-md py-1 md:py-2 outline-none border  border-gray-400 text-gray-300 px-10 hover:bg-gray-300/20"> Read More </button>
//             <time> November, 7 2023</time>
//             </div>
//         </div>


//         <TeamSection/>


//         <div className="flex flex-col lg:flex-row md:gap-8 lg:gap-10 relative lg:mt-5">

// {/* left side  */}
//     <div className="w-full rounded-3xl bg-cover  mt-2">

//     <div className="w-full h-60 md:h-[320px]">
//     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116399.90657227112!2d89.79155163654143!3d24.259362611903022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fdfb44c7eeadc1%3A0x635d437a356cefa!2sTangail%20Sadar%20Upazila!5e0!3m2!1sen!2sbd!4v1720767292885!5m2!1sen!2sbd"  className="rounded w-full h-full" loading="lazy" ></iframe>
//     </div>

//         <div className="p-4 space-y-2">
//         <h3 className="flex gap-5 items-center text-lg  text-gray-400 inter-normal"> <FaHome size={26} />ZipCar LTD</h3>

//         <h5 className="flex gap-5 items-center text-lg  text-gray-400 inter-normal"> <TfiEmail size={22} />Email :  campers77@gmail.com</h5>

//         <h5 className="flex gap-5 items-center text-lg  text-gray-400 inter-normal"> <MdOutlinePhone size={22} /> +88 018654545</h5>

//         <h5 className="flex gap-5 items-center text-lg  text-gray-400 inter-normal"> <FaLocationDot size={22} />Tangail, Bangladesh</h5>

//         <div className="flex gap-2 mt2">

//             <span className="bg-gray-300 p-2 rounded hover:bg-gray-800 transition-all hover:text-gray-200 cursor-pointer"> <FaXTwitter size={15}/> </span>
//             <span className="bg-gray-300 p-2 rounded hover:bg-gray-800 transition-all hover:text-gray-200 cursor-pointer"> <FaTelegramPlane size={15}/> </span>
//             <span className="bg-gray-300 p-2 rounded hover:bg-gray-800 transition-all hover:text-gray-200 cursor-pointer"> <FaLinkedinIn size={15}/> </span>
//             <span className="bg-gray-300 p-2 rounded hover:bg-gray-800 transition-all hover:text-gray-200 cursor-pointer"> <FaFacebookF size={15}/> </span>
//         </div>
//         </div>
//     </div>


// </div> 



//         </Container>
       
//     );
// };

// export default page;






import React from 'react';
import { FaUsers, FaHandshake, FaRocket, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';

const teams = [
    {
        userName: 'Alice Johnson',
        position: 'Project Manager',
        image: 'https://i.ibb.co/3ynTBk9/portrait-of-smiling-female-manager.jpg',
        id: 1
    },
    {
        userName: 'James Smith',
        position: 'Lead Developer',
        image: 'https://i.ibb.co/5s2TZt7/portrait-of-young-programmer.jpg',
        id: 2
    },
    {
        userName: 'Emily Davis',
        position: 'UX/UI Designer',
        image: 'https://i.ibb.co/bB6C4Pv/portrait-of-happy-female-designer.jpg',
        id: 3
    },
    {
        userName: 'Michael Brown',
        position: 'Quality Assurance Specialist',
        image: 'https://i.ibb.co/QNsksD5/portrait-of-smiling-male-tester.jpg',
        id: 4
    },
    {
        userName: 'Sarah Wilson',
        position: 'Product Owner',
        image: 'https://i.ibb.co/gJDZJ2H/portrait-of-female-product-owner.jpg',
        id: 5
    },
    {
        userName: 'David Lee',
        position: 'Data Analyst',
        image: 'https://i.ibb.co/sCMLGRx/portrait-of-male-data-analyst.jpg',
        id: 6
    },
];



const page = () => {
  return (
    <div className="bg-white rounded-xl py-10 px-5">

      {/* Location */}
      <section className="mb-10 bg-indigo-500 py-8 rounded-xl text-white">
        <div className="container mx-auto text-center">
          <FaMapMarkerAlt className="text-white text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Our Location</h2>
          <p className=" max-w-2xl mx-auto px-3">
            We are located in the heart of the city, making it easy for our clients to connect with us. Visit us anytime!
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-5">About Us</h1>
        <p className="text-gray-600 text-lg text-justify">
          Welcome to [Your Company Name], where innovation meets excellence. Our goal is to create amazing digital experiences for all our clients Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, numquam expedita! Sint aut doloremque  
        </p>
      </div>

      {/* Our Mission */}
      <section className="mt-10">
        <div className="container mx-auto text-center">
          <FaRocket className="text-indigo-500 text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Mission</h2>
          <p className="text-gray-600 text-lg mx-auto text-justify">
            Our mission is to drive technological advancements and provide solutions that empower businesses and individuals to thrive in the digital age. Our mission is to drive technological advancements and provide solutions that empower businesses and individuals to thrive in the digital age.Our mission is to
          </p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="mt-10">
        <div className="container mx-auto text-center">
          <FaHandshake className="text-indigo-500 text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Vision</h2>
          <p className="text-gray-600 text-lg text-justify mx-auto">
            We envision a future where technology seamlessly integrates into everyday life, making it easier, more efficient, and more enjoyable for all.  making it easier, more efficient, and more enjoyable for all.  making it easier, more efficient
          </p>
        </div>
      </section>

      {/* Our Team */}
      <section className="mt-10">
        <div className="container mx-auto text-center">
          <FaUsers className="text-indigo-500 text-5xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-9">Meet Our Team</h2>
          
          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teams?.map(team => <div key={team.id} className="bg-white p-6 rounded-lg shadow-md">
              <Image width={230} height={230}
                src={team.image}
                alt="Team Member"
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">{team.userName}</h3>
              <p className="text-gray-600">{team.position}</p>
            </div>)}
           
          </div>
        </div>
      </section>


    </div>
  );
};

export default page;