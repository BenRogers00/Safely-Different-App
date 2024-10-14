import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from "./NavBar";

/**
 * Renders the About Us component.
 * 
 * @returns {JSX.Element} The rendered About Us component.
 */
function AboutUs() {
    return (
      <>
      
        <div className="overflow-y-auto overflow-x-hidden h-screen bg-gradient-to-b from-teal-400 to teal-600">
        <NavBar />
          <div className="w-full h-auto md:col-start-2 col-span-3">
            <div className="w-full text-[200px]">
              <h1 className="text-start ml-5 text-white">About Us</h1>
            </div>
  
            <div className="ml-5 text-start">
              <p>
              "S2" is an approach to safety that challenges traditional methods of workplace safety management. It was popularized by Sidney Dekker, a professor and thought leader in safety and human factors. The philosophy centers around shifting the focus from compliance and blame to understanding and improving safety through a human-centered lens.
              </p>
              <p>
              Key Principles of Safe Differently:
People as a Solution, Not a Problem: Instead of viewing human error as a cause of accidents, the Safe Differently approach sees people as critical to maintaining safety. Workers are seen as adaptive and resourceful, using their experience and knowledge to handle unexpected situations safely.
Emphasizing Learning Over Compliance: Traditional safety management often focuses on compliance with rules and regulations. Safe Differently encourages continuous learning from incidents and near misses, using these opportunities to improve systems and processes, rather than solely enforcing rules.
Blame-Free Culture: In Safe Differently, the focus is on understanding why things happen the way they do, rather than blaming individuals for failures. This approach aims to create a culture of trust, where employees feel safe to report issues and contribute to improvements.
Resilience Over Risk Reduction: The goal is not just to reduce risks but to build resilience into systems and processes. Safe Differently encourages organizations to prepare for the unexpected and design systems that are flexible and robust enough to handle variability in human performance.
Safety as an Emergent Property: The philosophy views safety not as something that can be directly controlled or managed but as something that emerges from the complex interactions between people, technology, and processes. It focuses on creating conditions that allow for safe outcomes to emerge.
              </p>
              <p>
              Key Takeaway:
              Safe Differently promotes a more holistic, human-centered approach to safety, encouraging organizations to move beyond a rules-based, compliance-driven mindset to one that values learning, trust, and adaptability in achieving safer workplaces.
              </p>
            </div>
  
            <div className="text-start">
              <Link to="/contact">
                <button className="ml-5 font-serif text-20 mt-3 mb-3 py-1 px-4 font-extrabold bg-teal-500 rounded-[14px] hover:bg-teal-400">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-96">
            <img
              src="images/workplace.png"
              alt="workplace"
              className="w-full md:w-96"
            />
          </div>
        </div>
      </>
    );
}

export default AboutUs;
