import React from "react";
import Doctor from "./doctor-group.png";
import SolutionStep from "./SolutionStep";
import "./About.css";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
        The University has a Health Centre managed by a team of doctors, nurses and paramedical staff catering
to basic medical treatment. Primary care and outpatient-services to all the students & staff of MANUU
from9.00 AM to 8.00 PM on all working days are available. University has male and female wards
separate for patients, in case of emergencies, for observation and intra-venous fluids, medication and nursing care.

<p className="about-description"> 
All the Emergency cases are attended by the doctors and supporting staff at the Health
Centre and are treated either in the Health Centre or referred to other super specialty Hospitals
depending on the condition of the patients. The Health Centre has an X-Ray Unit, Pathology Lab,
Pharmacy and counseling services are also provided. Medical care is provided to all the patients free of
cost. 
</p>  

The University will assist wards in getting medical insurance coverage from standard insurance
companies, which they may use in case of hospitalization. Other activities like Health camps, Blood
donation camps, screening camps for cardiology and alternative medicines like Homeopathy Camp are
also organized in Health Centre.
        </p>

        <h4 className="about-text-title">Your Solutions</h4>

        <SolutionStep
          title="Choose a Specialist"
          description="Find your perfect specialist and book with ease at IBN-E-SINA. Expert doctors prioritize your health, offering tailored care."
        />

        <SolutionStep
          title="Make a Schedule"
          description="Choose the date and time that suits you best, and let our dedicated team of medical professionals ensure your well-being with personalized care."
        />

        <SolutionStep
          title="Get Your Solutions"
          description="Our experienced doctors and specialists are here to provide expert advice and personalized treatment plans, helping you achieve your best possible health."
        />
      </div>
    </div>
  );
}

export default About;