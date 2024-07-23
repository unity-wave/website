import React from 'react'; 
import company1 from '../Images/c1.jpg';
import company2 from '../Images/c1.jpg';
import company3 from '../Images/c1.jpg';
import image from '../Images/img.jpg'

const App = () => {
    return (
        <div className="w-full min-h-screen items-center font-primary">
        {/* Header Section */}
        <header className="text-center py-20 px-20 bg-[#537895] w-full text-white">
          <h1 className="text-2xl font-bold ">At the core of our existence is shared vision to reflect integrity in all our engagements.</h1>
          <p className="italic text-xl mt-5">“Doing things differently”</p>
        </header>

        <div className="flex flex-col md:flex-row w-full h-auto bg-white py-8">
        <div className="w-full md:w-1/2 h-auto flex items-center justify-center p-8 mb-0">
          <div className="text-center md:text-left max-w-lg">
            <h2 className="text-2xl font-bold text-[#21506E]">Our Vision</h2>
            <p className="text-[#6B7280] mt-4">
              Taken from the Latin words "dolorem ipsum", which translates to "pain itself", Lorem Ipsum text saw a revival in the mid-20th century as placeholder text in printing and design.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-auto flex items-center justify-center p-8 mb-0">
          <div className="text-center md:text-left max-w-lg">
            <h2 className="text-2xl font-bold text-[#21506E]">Our Mission</h2>
            <p className="text-[#6B7280] mt-4">
              Taken from the Latin words "dolorem ipsum", which translates to "pain itself", Lorem Ipsum text saw a revival in the mid-20th century as placeholder text in printing and design.
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen w-full bg-white flex flex-col items-center justify-between py-0">
        <div className="flex-1 flex flex-col md:flex-row w-full p-8 bg-gray-50">
        <div className="md:w-1/2 flex items-center justify-center">
            <img src={image} alt="Illustration" className="w-full h-full object-contain" />
        </div>
        <div className="md:w-1/2 pl-8 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-10">Why choose us?</h2>
            <ul className="space-y-4 text-lg">
            <li className="flex items-center">
                <span className="text-green-600 mr-2">✔</span> Proactiveness
            </li>
            <li className="flex items-center">
                <span className="text-green-600 mr-2">✔</span> Technology focus
            </li>
            <li className="flex items-center">
                <span className="text-green-600 mr-2">✔</span> Client support
            </li>
            <li className="flex items-center">
                <span className="text-green-600 mr-2">✔</span> Agility
            </li>
            <li className="flex items-center">
                <span className="text-green-600 mr-2">✔</span> Fast driven solutions
            </li>
            </ul>
        </div>
        </div>
        <div className="w-full p-6 bg-gray-200 flex items-center justify-bewteen py-8">
        <h3 className="text-3xl font-bold border-r-5 border-black pr-4">We Proudly Serve</h3>
        <div className="flex space-x-96 ml-10">
            <img src={company1} alt="Company 1" className="h-12" />
            <img src={company2} alt="Company 2" className="h-12" />
            <img src={company3} alt="Company 3" className="h-12" />
        </div>
        </div>
        </div>
            
    </div>
    )
}
export default App;
           

