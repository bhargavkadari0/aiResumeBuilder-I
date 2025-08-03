import React, { useState } from 'react';

const StandardTemplate = () => {
  const [resumeData, setResumeData] = useState({
    name: "John Doe",
    role: "Full Stack Developer | JavaScript | React | Node.js",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    linkedin: "linkedin.com/in/johndoe",
    location: "Pune, Maharashtra",

    summary:
      "Results-driven Full Stack Developer with 3+ years of experience in building scalable web applications using React, Node.js, and MongoDB.",

    experience: [
      {
        title: "Full Stack Developer",
        companyName: "Tech Solutions Pvt Ltd",
        date: "Jan 2022 – Present",
        companyLocation: "Mumbai",
        accomplishment: [
          "Developed scalable web apps using MERN stack.",
          "Improved API response time by 25%.",
          "Collaborated with UI/UX team to implement responsive designs."
        ]
      },
      {
        title: "Frontend Developer Intern",
        companyName: "Web Creators",
        date: "Jun 2021 – Dec 2021",
        companyLocation: "Pune",
        accomplishment: [
          "Built reusable components using React.js.",
          "Integrated third-party APIs.",
          "Worked in Agile sprints with backend team."
        ]
      }
    ],

    education: [
      {
        degree: "Bachelor of Engineering in Computer Science",
        institution: "Savitribai Phule Pune University",
        duration: "2017 – 2021",
        location: "Pune"
      }
    ],

    achievements: [
      {
        keyAchievements: "Best Project Award",
        describe:
          "Won the Best Final Year Project Award for developing an AI-powered Resume Builder."
      },
      {
        keyAchievements: "Hackathon Winner",
        describe:
          "Secured 1st place in a 48-hour hackathon for building a scalable e-commerce platform."
      }
    ],

    skills: [
      "React.js",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "Git",
      "RESTful APIs"
    ],

    languages: ["English", "Hindi"],

    projects: [
      {
        title: "AI Resume Builder",
        description: "Built full-stack resume builder with Gemini API and PDF export.",
        duration: "6 months"
      },
      {
        title: "E-Commerce Platform",
        description: "Developed scalable e-commerce platform with product search and payments.",
        duration: "4 months"
      }
    ],

    courses: [
      {
        title: "MERN Stack Development",
        description: "Completed hands-on MERN stack course with multiple projects."
      },
      {
        title: "AWS Cloud Practitioner",
        description: "Learned AWS cloud deployment and serverless architecture."
      }
    ],

    certifications: [
      {
        title: "AWS Certified Developer",
        issuedBy: "Amazon Web Services",
        year: "2024"
      },
      {
        title: "React Advanced Certification",
        issuedBy: "Coursera",
        year: "2023"
      }
    ],

    hobbies: ["Reading Tech Blogs", "Photography", "Cycling"]
  });

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center">{resumeData.name}</h1>
      <h2 className="text-xl text-center text-gray-600">{resumeData.role}</h2>
      <p className="text-center">📍 {resumeData.location} | 📞 {resumeData.phone} | ✉️ {resumeData.email}</p>
      <p className="text-center">🔗 <a href={`https://${resumeData.linkedin}`} className="text-blue-600 underline">{resumeData.linkedin}</a></p>

      <section>
        <h3 className="text-xl font-semibold">Summary</h3>
        <p>{resumeData.summary}</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold">Experience</h3>
        {resumeData.experience.map((exp, idx) => (
          <div key={idx} className="mb-2">
            <h4 className="font-bold">{exp.title} at {exp.companyName} ({exp.date})</h4>
            <p className="italic">{exp.companyLocation}</p>
            <ul className="list-disc ml-6">
              {exp.accomplishment.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        ))}
      </section>

      {/* Repeat for education, achievements, skills, etc. */}

    </div>
  );
};

export default StandardTemplate;
