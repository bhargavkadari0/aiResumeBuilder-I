import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    name: "John Doe",
    role: "Full Stack Developer",
    phone: "123-456-7890",
    email: "john@example.com",
    linkedin: "linkedin.com/in/john",
    location: "Pune",
    summary: "Passionate developer...",
    skills: ["React", "Node.js", "MongoDB"],
    experience: [
      {
        title: "Developer",
        companyName: "ABC Pvt Ltd",
        date: "2020 - Present",
        companyLocation: "Mumbai",
        accomplishment: ["Built scalable apps", "Improved API response"],
      },
    ],
    education: [
      {
        degree: "B.Tech CSE",
        institution: "XYZ University",
        duration: "2016 - 2020",
        location: "Pune",
      },
    ],
  });

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
