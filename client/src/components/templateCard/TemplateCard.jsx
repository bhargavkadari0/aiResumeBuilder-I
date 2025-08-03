import React, { useState } from 'react';
import { motion } from 'framer-motion';
import temp1 from '../../assets/images/temp1.png';
import temp2 from '../../assets/images/temp2.png';
import Temp3 from '../../assets/images/Temp3.jpg';
import temp4 from '../../assets/images/temp4.png';
import temp5 from '../../assets/images/temp5.jpg';
import temp6 from '../../assets/images/temp6.png';
import temp7 from '../../assets/images/temp7.png';
import temp8 from '../../assets/images/temp8.jpg';
import temp9 from '../../assets/images/temp9.jpg';


import { useNavigate } from 'react-router-dom';
const WithoutAiTemp = ({ setActiveStep }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      name: 'Radiant Edge',
      preview: temp1, // Use imported image
      description: 'Perfect for modern professionals in tech, analytics, and innovation-driven roles.',
      url: '/template1'
    },
    {
      id: 2,
      name: 'CodeCraft Classic',
      preview: temp2,
      description: 'Ideal for developers and tech professionals seeking a structured and professional format.',
      url: '/template2'
    },
    {
      id: 3,
      name: 'TechSlate Pro',
      preview: Temp3,
      description: 'Tailored for engineers and developers to highlight projects, certifications, and skills with clarity and precision.',
      url: '/resume-template3'
    },
    {
      id: 4,
      name: 'Creative Spark' ,
      preview: temp4,
      description: 'Best suited for designers, marketers, and creative professionals who want to showcase flair and structure together.',
      url: '/resume-template4'
    },
    {
      id: 5,
      name: 'Structured Precision',
      preview: temp5,
      description: 'Ideal for developers, engineers, and technical experts who value clarity, order, and professional presentation.',
      url: '/resume-template5'
    },
    {
      id: 6,
      name: 'Modern Momentum',
      preview: temp6,
      description: 'Perfect for tech professionals seeking a sleek, impactful, and well-structured presentation of their experience and skills.',
      url: '/resume-template6'
    },
    {
      id: 7,
      name: 'Creative Spectrum',
      preview: temp7,
      description: 'perfect for a graphic designers resume template.',
      url: '/resume-template7'
    },
    {
      id: 8,
      name: 'Executive Edge',
      preview: temp8,
      description: 'Professional two-column layout perfect for management and leadership roles.',
      url: '/resume-template8'
    },
    {
      id: 9,
      name: 'Tech Forward',
      preview: temp9,
      description: 'Modern single-column design with skill tags for tech professionals.',
      url: '/resume-template9'
    },
    {
      id: 10,
      name: 'Classic Professional',
      preview: temp8,
      description: 'Clean traditional layout ideal for corporate and technical roles.',
      url: '/resume-template10'
    },
    {
      id: 11,
      name: 'Professional Executive',
      preview: temp8,
      description: 'Clean, professional layout showcasing marketing expertise and career achievements effectively.',
      url: '/resume-template11'
    },
    {
      id: 12,
      name: 'Strategic Technology Leader',
      preview: temp8,
      description: 'Clean, impactful layout ideal for IT and cybersecurity roles',
      url: '/resume-template12'
    },
    {
      id: 13,
      name: 'Clinical Practice Professional',
      preview: temp8,
      description: 'Detailed, structured layout designed for doctors and medical field experts.',
      url: '/resume-template13'
    },
    {
      id: 14,
      name: 'Laboratory Specialist Resume',
      preview: temp8,
      description: 'Precise, results-driven layout crafted for lab and clinical professionals.',
      url: '/resume-template14'
    },
    {
      id: 15,
      name: 'Finance Analyst Resume',
      preview: temp8,
      description: 'Crisp, professional format tailored for finance, budgeting, and analysis roles',
      url: '/resume-template15'
    },
    {
      id: 16,
      name: 'Fiscal Visionary & Strategic Performance Architect',
      preview: temp8,
      description: 'Crafting financial clarity, accelerating growth, and engineering operational excellence',
      url: '/resume-template16'
    },
    {
      id: 17,
      name: 'Modern Web Developer Resume Template',
      preview: temp8,
      description: 'Interactive resume template with vibrant design and essential developer details.',
      url: '/resume-template17'
    },
    {
      id: 18,
      name: 'Resume Preview',
      preview: temp8,
      description: 'Clean and modern layout tailored for retail sales job seekers.',
      url: '/resume-template18'
    },
    {
      id: 19,
      name: 'Experience Highlight',
      preview: temp8,
      description: 'Showcases impactful achievements in retail sales with measurable success.',
      url: '/resume-template19'
    },
    {
      id: 20,
      name: 'Retail Expert',
      preview: temp8,
      description: 'Dynamic sales professional excelling in service, merchandising, and customer engagement.',
      url: '/resume-template20'
    },
    {
      id: 21,
      name: 'Sales Specialist',
      preview: temp8,
      description: 'Driven retail expert excelling in sales, service, and visual merchandising.',
      url: '/resume-template21'
    },
    {
      id: 22,
      name: 'Legal Intern',
      preview: temp8,
      description: 'Motivated legal intern with strong research, writing, and analytical skills.',
      url: '/resume-template22'
    },
    {
      id: 23,
      name: 'Creative Visionary',
      preview: temp8,
      description: 'Delivers compelling freelance design solutions with innovation, strategy, and style.',
      url: '/resume-template23'
    },
    {
      id: 24,
      name: 'Tech Enthusiast',
      preview: temp8,
      description: 'Innovative computer science graduate passionate about coding and future technologies.',
      url: '/resume-template24'
    },
    {
      id: 25,
      name: 'Code Innovator',
      preview: temp8,
      description: 'Creative software developer specializing in scalable, user-friendly web solutions',
      url: '/resume-template25'
    },
     {
      id: 26,
      name: 'Code Crafter',
      preview: temp8,
      description: 'Dedicated developer skilled in React, CSS, and problem solving.',
      url: '/resume-template26'
    },
     {
      id: 27,
      name: 'Design Visionary',
      preview: temp8,
      description: 'Creative graphic designer with a passion for clean visual storytelling.',
      url: '/resume-template27'
    },
     {
      id: 28,
      name: 'Code Architect',
      preview: temp8,
      description: 'Versatile fullstack developer crafting efficient, scalable, and modern applications.',
      url: '/resume-template28'
    },
     {
      id: 29,
      name: 'UI Crafter',
      preview: temp8,
      description: 'Designs seamless user experiences with clean, responsive, modern web interfaces.',
      url: '/resume-template29'
    },
     {
      id: 30,
      name: ' Career Snapshot',
      preview: temp8,
      description: ' Showcasing skills, projects, and achievements in full stack development.',
      url: '/resume-template30'
    },
     {
      id: 31,
      name: 'Experience Highlights',
      preview: temp8,
      description: ' Demonstrated success in leading teams and optimizing software performance.',
      url: '/resume-template31'
    },
     {
      id: 32,
      name: 'Professional Overview',
      preview: temp8,
      description: 'Showcases expertise in software engineering and impactful development roles',
      url: '/resume-template32'
    },
     {
      id: 33,
      name: '',
      preview: temp8,
      description: '',
      url: '/resume-template33'
    },
     {
      id: 34,
      name: '',
      preview: temp8,
      description: '',
      url: '/resume-template34'
    },
     {
      id: 35,
      name: '',
      preview: temp8,
      description: '',
      url: '/resume-template35'
    },
     {
      id: 36,
      name: '',
      preview: temp8,
      description: '',
      url: '/resume-template36'
    },
     {
      id: 37,
      name: '',
      preview: temp8,
      description: '',
      url: '/resume-template37'
    },
     {
      id: 38,
      name: '',
      preview: temp8,
      description: '',
      url: '/resume-template38'
    },
     {
      id: 39,
      name: '',
      preview: temp8,
      description: '',
      url: '/resume-template39'
    },
    {
      id: 40,
      name: 'Design Innovator',
      preview: temp8,
      description: 'Vibrant layout for graphic designers showcasing creative excellence',
      url: '/try'
    },
    {
      id: 41,
      name: 'Design Innovator',
      preview: temp8,
      description: 'Vibrant layout for graphic designers showcasing creative excellence',
      url: '/try'
    },
  ];

  // const handleSelectTemplate = (template) => {
  //   setSelectedTemplate(template.id);
  //   window.location.href = template.url; // Navigate to the template URL
  // };
  const navigate = useNavigate();  // 
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template.id);
    navigate(template.url); // 
  };

  return (
    <div className="mt-16">
      <motion.h3 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold mb-3 text-center tracking-wide bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent"
      >
        Choose Your Perfect Template
      </motion.h3>
      <p className="text-lg text-center text-indigo-200 mb-12 max-w-2xl mx-auto">
        Select a design that showcases your professional identity and captures attention
      </p>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {templates.map((template) => (
          // Fixed Height Template Card Code:

<motion.div
  key={template.id}
  className="relative group cursor-pointer overflow-hidden rounded-xl border ring-2 ring-indigo-300/30 shadow-lg h-96" // Fixed height 384px
  onMouseEnter={() => setHoveredTemplate(template.id)}
  onMouseLeave={() => setHoveredTemplate(null)}
  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
>
  <div className="relative overflow-hidden rounded-xl h-full">
    <motion.img
      src={template.preview}
      alt={template.name}
      className="w-full h-full object-cover transition-transform duration-700 transform"
      animate={hoveredTemplate === template.id ? { scale: 1.1 } : { scale: 1 }}
    />
  </div>
  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <h4 className="text-xl font-bold text-white">{template.name}</h4>
    <p className="text-white/80 text-sm mb-3">{template.description}</p>
    <motion.button
      onClick={() => handleSelectTemplate(template)}
      className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
    </motion.button>
  </div>
  {selectedTemplate === template.id && (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -top-3 -right-3 bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-10"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </motion.div>
  )}
</motion.div>

// Height Options:
// h-64  = 256px (shorter cards)
// h-72  = 288px (medium-short)
// h-80  = 320px (recommended for resumes)
// h-96  = 384px (taller cards)
// h-[400px] = custom 400px height
        ))}
      </motion.div>
    </div>
  );
};

export default WithoutAiTemp;
