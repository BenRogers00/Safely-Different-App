/**
 * Renders the About Us component.
 * 
 * @returns {JSX.Element} The rendered About Us component.
 */
import NavBar from "./NavBar";
function AboutUs() {
    return (
      <>
      <NavBar></NavBar>
        <div className="overflow-y-auto overflow-x-hidden h-screen bg-gradient-to-b from-teal-400 to teal-600">
       
          <div className="w-full h-auto md:col-start-2 col-span-3">
            <div className="w-full text-[200px] ">
             
              <h1 className="text-start ml-5 text-white">About Us</h1>
            </div>
  
            <div className="ml-5 text-start">
              <p>
                We recognise that each business encounters distinct challenges on
                its path to success. That's precisely why we are here – to offer
                customised solutions that address your specific needs and propel
                your business forward.
              </p>
              <p>
                Committed to your success, we provide a range of consulting
                services, including the development and implementation of
                Enforceable Undertaking initiatives and innovative applications as
                well as tools and frameworks that contribute to Health, Safety and
                Wellbeing. Our goal is to simplify processes, ensure compliance,
                and offer fresh perspectives on work to drive your success.
              </p>
              <p>
                Over the last few years the team have worked on a variety of
                interesting projects including: the co-creation of a by Māori for
                Māori project aimed at developing a Māori-focused Health & Safety
                (H&S) application. The development of an opensource crowdsourcing
                platform for all of Government, which we successfully used to
                facilitate crowdsourcing challenges across various industries,
                including forestry and construction. The app's features are able
                to be tailored to meet the unique demands of these sectors. We
                have meticulously developed content and facilitated workshops for
                over 200 New Zealand workers across a range of industries and
                large and small businesses. Through this work, we have also
                introduced and promoted new ways of working and better work
                methodologies among New Zealand businesses, championing safer,
                more inclusive, and efficient workplace environments.
              </p>
              <p>
                Experience the power of collective wisdom through our
                crowdsourcing services. Whether you're in search of innovative
                ideas, market insights, or collaborative solutions, our platform
                connects you with a diverse community for effective
                problem-solving. This fosters creativity and harnesses collective
                intelligence to propel your business forward.
              </p>
            </div>
  
            <div className="text-start ">
              <button className=" ml-5 font-serif text-20 mt-3 mb-3 py-1 px-4 font-extrabold bg-teal-500 rounded-[14px] hover:bg-teal-400 ">
                Get in Touch
              </button>
            </div>
          </div>
  
          <div className="w-full md: ">
            <img
              src="images/workplace.png"
              alt="workplace"
              className=" w-full md:w-96"
              
            />
          </div>
        </div>
      </>
    );
  }
  
  export default AboutUs;
  