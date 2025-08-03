import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";


// Add global styles for extra small text
const globalStyles = `
  .text-xxs {
    font-size: 0.625rem;
    line-height: 0.75rem;
  }
  .text-3xs {
    font-size: 0.5rem;
    line-height: 0.625rem;
  }
`;

// const Sidebar = React.memo(
//   ({
//     setActiveSection,
//     handleAIEnhancement,
//     handleDownload,
//     handleShare,
//     branding,
//     handleBrandingToggle,
//     handleUploadResume,
//     handleColorPicker,
//     handleSaveResume,
//   }) => {
//     return (
//       <div className="lg:w-72 bg-white text-gray-800 p-2 lg:p-6 shadow-2xl border-b lg:border-r lg:border-b-0 border-gray-200 flex lg:flex-col items-center lg:items-start lg:rounded-r-3xl">
//         <div className="w-full flex lg:flex-col items-center lg:items-start space-x-2 lg:space-x-0 lg:space-y-6 z-10 overflow-x-auto lg:overflow-x-visible">
//           <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 hidden lg:block">
//             Resume Tools
//           </h3>

//           <button
//             className="w-12 h-12 lg:w-full lg:h-auto bg-blue-500 text-white rounded-full lg:rounded-lg p-2 lg:p-3 shadow-lg flex items-center justify-center lg:flex-row lg:justify-start lg:space-x-2 flex-shrink-0"
//             onClick={() => setActiveSection("rearrange")}
//           >
//             <span className="text-lg lg:text-base">↕️</span>
//             <span className="hidden lg:inline">Rearrange</span>
//           </button>

//           <button
//             className="w-12 h-12 lg:w-full lg:h-auto bg-red-500 text-white rounded-full lg:rounded-lg p-2 lg:p-3 shadow-lg flex items-center justify-center lg:flex-row lg:justify-start lg:space-x-2 flex-shrink-0"
//             onClick={handleAIEnhancement}
//             data-ai-button="true"
//           >
//             <span className="text-lg lg:text-base">🤖</span>
//             <span className="hidden lg:inline">AI Assistant</span>
//           </button>

//           <button
//             className="w-12 h-12 lg:w-full lg:h-auto bg-purple-500 text-white rounded-full lg:rounded-lg p-2 lg:p-3 shadow-lg flex items-center justify-center lg:flex-row lg:justify-start lg:space-x-2 flex-shrink-0"
//             onClick={handleColorPicker}
//           >
//             <span className="text-lg lg:text-base">🎨</span>
//             <span className="hidden lg:inline">Color</span>
//           </button>

//           <button
//             className="w-12 h-12 lg:w-full lg:h-auto bg-indigo-500 text-white rounded-full lg:rounded-lg p-2 lg:p-3 shadow-lg flex items-center justify-center lg:flex-row lg:justify-start lg:space-x-2 flex-shrink-0"
//             onClick={handleSaveResume}
//           >
//             <span className="text-lg lg:text-base">💾</span>
//             <span className="hidden lg:inline">Save Resume</span>
//           </button>

//           <hr className="border-gray-300 my-2 w-full hidden lg:block" />

//           <button
//             className="w-12 h-12 lg:w-full lg:h-auto bg-yellow-500 text-white rounded-full lg:rounded-lg p-2 lg:p-3 shadow-lg flex items-center justify-center lg:flex-row lg:justify-start lg:space-x-2 flex-shrink-0"
//             onClick={handleDownload}
//           >
//             <span className="text-lg lg:text-base">⬇️</span>
//             <span className="hidden lg:inline">Download</span>
//           </button>

//           <button
//             className="w-12 h-12 lg:w-full lg:h-auto bg-green-500 text-white rounded-full lg:rounded-lg p-2 lg:p-3 shadow-lg flex items-center justify-center lg:flex-row lg:justify-start lg:space-x-2 flex-shrink-0"
//             onClick={handleShare}
//           >
//             <span className="text-lg lg:text-base">🔗</span>
//             <span className="hidden lg:inline">Share</span>
//           </button>

//           <button
//             className="w-12 h-12 lg:w-full lg:h-auto bg-purple-500 text-white rounded-full lg:rounded-lg p-2 lg:p-3 shadow-lg flex items-center justify-center lg:flex-row lg:justify-start lg:space-x-2 flex-shrink-0"
//             onClick={handleUploadResume}
//           >
//             <span className="text-lg lg:text-base">⬆️</span>
//             <span className="hidden lg:inline">Upload Resume</span>
//           </button>

//           <div className="flex items-center justify-between mt-2 w-full lg:w-auto">
//             <span className="text-gray-800 font-medium hidden lg:block">
//               Branding
//             </span>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={branding}
//                 onChange={handleBrandingToggle}
//                 className="sr-only"
//               />
//               <div className="w-8 h-4 lg:w-12 lg:h-6 bg-gray-300 rounded-full relative transition-all duration-300">
//                 <div
//                   className="absolute w-3 h-3 lg:w-5 lg:h-5 bg-gray-600 rounded-full left-0.5 top-0.5 transition-transform duration-300"
//                   style={{
//                     transform: branding ? "translateX(16px)" : "translateX(0)",
//                   }}
//                 />
//               </div>
//             </label>
//           </div>
//         </div>
//       </div>
//     );
//   },
// );

const Template3 = () => {
  const [resumeData, setResumeData] = useState({
    name: "Aditya Tiwary",
    role: "Financial Analyst | Data Analysis | Budgeting",
    phone: "+1-541-754-3010",
    email: "aditya@gmail.com",
    linkedin: "linkedin.com",
    location: "New York",
    summary:
      "Enthusiastic Financial Analyst with over 9 years of experience in data analysis, budgeting, and project management. Skilled in developing financial models and improving forecast processes. Proud of increasing the project completion rate by 25% at J.P. Morgan. Looking forward to applying my skills and experience to contribute to the financial success of the company.",
    experience: [
      {
        title: "Financial Analyst",
        companyName: "Wells Fargo",
        date: "2020 - 2023",
        companyLocation: "New York",
        accomplishment:
          "• Provided advanced financial management support with minimal supervision.\n" +
          "• Developed & implemented financial models, improving financial performance by 10%.\n" +
          "• Monitored progress of system projects, providing financial statuses and advice to management.\n" +
          "• Developed reporting tools and key performance metrics, providing insight into trends and potential risks/opportunities.",
      },
      {
        title: "Financial Analyst",
        companyName: "Bank of America",
        date: "2017 - 2020",
        companyLocation: "New York",
        accomplishment:
          "• Managed financial plans and goals for the division.\n" +
          "• Developed and executed monthly forecast processes, reducing variance by 15%.\n" +
          "• Participated in District / System work groups related to financial plans and goals.\n" +
          "• Supported management in the development of budgets, forecasts, and analysis summaries.",
      },
      {
        title: "Financial Analyst",
        companyName: "J.P. Morgan",
        date: "2014 - 2017",
        companyLocation: "New York",
        accomplishment:
          "• Provided financial management support and developed financial models.\n" +
          "• Improved efficiency and cost effectiveness of operations by initiating and managing financial systems.\n" +
          "• Worked on problems of diverse scope where analysis of data required evaluation of identifiable factors.\n" +
          "• Led forecasting efforts and analysis of potential responses to Senior Leadership.",
      },
    ],
    education: [
      {
        degree: "Master's Degree in Finance",
        institution: "University of California, Berkeley",
        duration: "2012 - 2014",
        location: "Berkeley, California",
      },
      {
        degree: "Bachelor's Degree in Economics",
        institution: "University of California, Los Angeles",
        duration: "2008 - 2012",
        location: "Los Angeles, CA",
      },
    ],
    achievements: [
      {
        title: "Financial Model Development",
        description:
          "Developed a financial model that improved the financial performance of the division by 10%.",
      },
      {
        title: "Forecast Process Improvement",
        description:
          "Improved the monthly forecast process, reducing variance by 15%.",
      },
      {
        title: "Project Completion Rate Increase",
        description:
          "Increased the project completion rate by 25% through effective project management.",
      },
    ],
    // Removed languages section as it's not in the target template
    skills: [
      // Storing as individual categories for easier editing, will be joined for display
      { category: "Financial Modeling", items: [] },
      { category: "Data Analysis", items: [] },
      { category: "Budgeting", items: [] },
      { category: "Forecasting", items: [] },
      { category: "Project Management", items: [] },
      { category: "Microsoft Office", items: [] },
      { category: "Accounting", items: [] },
      { category: "Python", items: [] },
      { category: "Excel & VBA", items: [] },
    ],
    strengths: [
      {
        title: "Data Analysis",
        description:
          "Leverages strong analytical skills to identify potential risks and opportunities, leading to a 15% increase in efficiency.",
      },
      {
        title: "Budgeting",
        description:
          "Managed the development and execution of monthly forecast processes, reducing variance by 20%.",
      },
      {
        title: "Project Management",
        description:
          "Successfully led multiple concurrent projects, improving overall project completion rate by 25%.",
      },
    ],
  });

  const [showButtons, setShowButtons] = useState(true);
  // const [photo, setPhoto] = useState(null); // Photo not in target template
  const [branding, setBranding] = useState(true);
  const [sectionSettings, setSectionSettings] = useState({
    header: {
      showTitle: true,
      showPhone: true,
      showLink: true,
      showEmail: true,
      showLocation: true,
      uppercaseName: true, // Set to true to match target
      showPhoto: false,
    },
    summary: { showSummary: true },
    experience: { showExperience: true },
    education: { showEducation: true },
    strengths: { showStrengths: true },
    skills: { showSkills: true },
    achievements: { showAchievements: true },
  });

  const [activeSection, setActiveSection] = useState(null);
  const [sectionsOrder, setSectionsOrder] = useState([
    "summary",
    "experience",
    "education",
    "skills",
    "strengths",
    "achievements",
  ]);
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showAIErrorPopup, setShowAIErrorPopup] = useState(false);
  const [showUploadErrorPopup, setShowUploadErrorPopup] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeColor, setActiveColor] = useState("#00576c"); // Default to right sidebar color
  const [aiMenuPosition, setAiMenuPosition] = useState(null);
  const [showAIMenu, setShowAIMenu] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const resumeRef = useRef(null);

  const colors = [
    { name: "Teal", value: "#006666" },
    { name: "Dark Teal", value: "#00576c" },
    { name: "Black", value: "#000000" },
    { name: "Gray", value: "#666666" },
    { name: "Blue", value: "#2563EB" },
    { name: "Red", value: "#DC2626" },
    { name: "Green", value: "#16A34A" },
    { name: "Purple", value: "#9333EA" },
  ];

  useEffect(() => {
    const savedResume = localStorage.getItem("resumeData");
    if (savedResume) setResumeData(JSON.parse(savedResume));

    const savedSettings = localStorage.getItem("sectionSettings");
    if (savedSettings) setSectionSettings(JSON.parse(savedSettings));

    const savedBranding = localStorage.getItem("branding");
    if (savedBranding) setBranding(JSON.parse(savedBranding));
  }, []);

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    localStorage.setItem("sectionSettings", JSON.stringify(sectionSettings));
    localStorage.setItem("branding", JSON.stringify(branding));
  }, [resumeData, sectionSettings, branding]);

  // Close AI menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showAIMenu &&
        !event.target.closest(".ai-menu") &&
        !event.target.closest('[data-ai-button="true"]')
      ) {
        setShowAIMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAIMenu]);



  // Add global style for text-xxs class
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = globalStyles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const handleInputChange = useCallback(
    (section, field, value, index = null) => {
      try {
        if (index !== null) {
          const updatedSection = [...(resumeData[section] || [])];
          updatedSection[index][field] = value;
          setResumeData((prev) => ({ ...prev, [section]: updatedSection }));
        } else {
          setResumeData((prev) => ({ ...prev, [field]: value }));
        }
      } catch (error) {
        // Suppress content editable errors
        console.debug("Suppressed content editable error:", error);
      }
    },
    [resumeData],
  );

  const handleAddSection = useCallback((section) => {
    const newItem =
      {
        experience: {
          title: "New Position",
          companyName: "Company Name",
          date: "2023 - Present",
          companyLocation: "City, State, Country",
          accomplishment:
            "• Add your accomplishments here\n• Second achievement",
        },
        education: {
          degree: "Degree Name",
          institution: "Institution Name",
          duration: "Year - Year",
          location: "City, State, Country",
        },
        achievements: {
          title: "New Achievement",
          description: "Describe your achievement here",
        },
        strengths: {
          title: "New Strength",
          description: "Describe your strength here",
        },
        skills: {
          // Keep items array for potential future use, though not rendered in this style
          category: "New Skill Category",
          items: [],
        },
      }[section] || {};

    setResumeData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), newItem],
    }));
  }, []);

  const handleRemoveSection = useCallback(
    (section, index) => {
      console.log(`Removing item from ${section} at index ${index}`);
      if (index === null || index === undefined) {
        console.error("Cannot remove item: index is null or undefined");
        return;
      }

      const updatedSection = [...(resumeData[section] || [])];
      if (index >= 0 && index < updatedSection.length) {
        updatedSection.splice(index, 1);
        setResumeData((prev) => ({ ...prev, [section]: updatedSection }));
        console.log(
          `Item removed successfully. New length: ${updatedSection.length}`,
        );
      } else {
        console.error(
          `Invalid index: ${index}. Array length: ${updatedSection.length}`,
        );
      }
    },
    [resumeData],
  );

  // handleSkillItemChange and handleAddSkillItem might not be directly used if skills are simple categories
  // but kept for editor flexibility if skill structure changes.
  const handleSkillItemChange = useCallback(
    (skillIndex, itemIndex, value) => {
      const updatedSkills = [...resumeData.skills];
      updatedSkills[skillIndex].items[itemIndex] = value;
      setResumeData((prev) => ({ ...prev, skills: updatedSkills }));
    },
    [resumeData],
  );

  const handleAddSkillItem = useCallback(
    (skillIndex) => {
      const updatedSkills = [...resumeData.skills];
      updatedSkills[skillIndex].items.push("New Skill Item");
      setResumeData((prev) => ({ ...prev, skills: updatedSkills }));
    },
    [resumeData],
  );

  const handleDownload = useCallback(async () => {
    setShowButtons(false);
    setActiveSection(null);
    setIsDownloading(true);

    try {
      const resumeElement = resumeRef.current;
      if (!resumeElement) {
        console.error("Resume element not found");
        setShowButtons(true);
        setIsDownloading(false);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get the exact dimensions of the resume for better accuracy
      const width = resumeElement.offsetWidth;
      const height = resumeElement.offsetHeight;

      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollX: 0,
        scrollY: 0,
        width: width,
        height: height,
      });

      const imgData = canvas.toDataURL("image/png");

      // Use mm units for better sizing
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();

      // Calculate height to maintain aspect ratio
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the image as a single page
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setShowButtons(true);
      setIsDownloading(false);
    }
  }, []);

  const handleShare = useCallback(() => {
    const resumeLink = window.location.href;
    navigator.clipboard
      .writeText(resumeLink)
      .then(() => {
        setShowShareNotification(true);
        setTimeout(() => setShowShareNotification(false), 3000);
      })
      .catch(() => alert("Failed to copy link to clipboard."));
  }, []);

  const handleUploadResume = useCallback(() => {
    setShowUploadErrorPopup(true);
    setTimeout(() => setShowUploadErrorPopup(false), 3000);
  }, []);

  const handleSettingChange = useCallback((section, setting) => {
    setSectionSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [setting]: !prev[section][setting] },
    }));
  }, []);

  const handleBrandingToggle = useCallback(
    () => setBranding((prev) => !prev),
    [],
  );

  const handleSettingsClick = useCallback((section) => {
    setActiveSection((prev) => (prev === section ? null : section));
  }, []);

  const handleMoveSectionUp = useCallback(
    (index) => {
      if (index > 0) {
        const newOrder = [...sectionsOrder];
        [newOrder[index - 1], newOrder[index]] = [
          newOrder[index],
          newOrder[index - 1],
        ];
        setSectionsOrder(newOrder);
      }
    },
    [sectionsOrder],
  );

  const handleMoveSectionDown = useCallback(
    (index) => {
      if (index < sectionsOrder.length - 1) {
        const newOrder = [...sectionsOrder];
        [newOrder[index + 1], newOrder[index]] = [
          newOrder[index],
          newOrder[index + 1],
        ];
        setSectionsOrder(newOrder);
      }
    },
    [sectionsOrder],
  );

  const handleAIEnhancement = useCallback(
    (e) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();

      if (showAIMenu) {
        setShowAIMenu(false);
      } else {
        setAiMenuPosition({
          top: rect.bottom,
          left: rect.left,
        });
        setShowAIMenu(true);
      }
    },
    [showAIMenu],
  );

  const handleAIMenuClose = useCallback(() => {
    setShowAIMenu(false);
  }, []);

  const handleEnhanceSection = useCallback((section) => {
    setShowAIMenu(false);
    setShowAIErrorPopup(true);
    setTimeout(() => setShowAIErrorPopup(false), 3000);
  }, []);



  const handleSaveResume = useCallback(() => {
    try {
      const dataToSave = {
        resumeData,
        sectionSettings,
        branding,
        sectionsOrder,
      };

      const dataStr = JSON.stringify(dataToSave);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

      const exportFileDefaultName = "resume-data.json";

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();

      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 3000);
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Failed to save resume. Please try again.");
    }
  }, [resumeData, sectionSettings, branding, sectionsOrder]);

  const handleColorPicker = useCallback(() => {
    setShowColorPicker(true);
  }, []);

  const applyColorToSelection = useCallback((color) => {
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.color = color;
      range.surroundContents(span);
    }
    setShowColorPicker(false);
    setActiveColor(color);
  }, []);

  const LoadingScreen = useMemo(
    () => (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-white text-xl font-semibold">
            Enhancing your resume...
          </p>
        </div>
      </div>
    ),
    [],
  );

  const DownloadPreloader = () => (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
        <p className="text-gray-800 text-lg font-semibold">Generating PDF...</p>
      </div>
    </motion.div>
  );

  const ShareNotification = () => (
    <motion.div
      className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      Link copied to clipboard!
    </motion.div>
  );

  const SaveNotification = () => (
    <motion.div
      className="fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
    >
      Resume data saved!
    </motion.div>
  );

  const AIErrorPopup = () => (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto text-center">
        <p className="text-lg font-semibold text-red-600 mb-4">
          AI Assistant unavailable <br />
          Try again later
        </p>
        <button
          onClick={() => setShowAIErrorPopup(false)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
    </motion.div>
  );

  const UploadErrorPopup = () => (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto text-center">
        <p className="text-lg font-semibold text-red-600 mb-4">
          Upload feature unavailable <br />
          Try again later
        </p>
        <button
          onClick={() => setShowUploadErrorPopup(false)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
    </motion.div>
  );

  const ColorPickerPopup = () => (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Select Color</h3>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-500 transition-colors"
              style={{ backgroundColor: color.value }}
              onClick={() => applyColorToSelection(color.value)}
              title={color.name}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setShowColorPicker(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
    <Navbar/>
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      
      <Sidebar/>
      {/* <Sidebar
        setActiveSection={setActiveSection}
        handleAIEnhancement={handleAIEnhancement}
        handleDownload={handleDownload}
        handleShare={handleShare}
        branding={branding}
        handleBrandingToggle={handleBrandingToggle}
        handleUploadResume={handleUploadResume}
        handleColorPicker={handleColorPicker}
        handleSaveResume={handleSaveResume}
      /> */}

      <div className="flex-1 p-2 md:p-6 overflow-auto flex justify-center">
        <div
          className="bg-white shadow-md w-full max-w-4xl"
          style={{
            minHeight: "297mm",
            boxSizing: "border-box",
          }}
        >
          <div
            ref={resumeRef}
            className="flex flex-col w-full"
            style={{
              minHeight: "297mm",
              boxSizing: "border-box",
            }}
          >
            {/* MAIN CONTENT */}
            <div
              className="flex flex-col lg:flex-row"
              style={{ minHeight: "297mm" }}
            >
              {/* LEFT COLUMN - 70% on desktop, full width on mobile */}
              <div className="w-full lg:w-[70%] p-4 md:p-6 lg:p-8">
                {/* HEADER SECTION */}
                <div className="mb-6">
                  <h1
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleInputChange(null, "name", e.target.innerText)
                    }
                    className={`text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 ${
                      sectionSettings.header.uppercaseName ? "uppercase" : ""
                    }`}
                  >
                    {resumeData.name}
                  </h1>
                  {sectionSettings.header.showTitle && (
                    <h2
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleInputChange(null, "role", e.target.textContent)
                      }
                      className="text-xs md:text-sm font-medium mt-1 uppercase" // Added uppercase to match target
                      style={{ color: "#17a2b8" }}
                    >
                      {resumeData.role}
                    </h2>
                  )}
                  <div className="flex flex-wrap gap-x-2 md:gap-x-4 mt-2 text-xs md:text-sm text-gray-600">
                    {sectionSettings.header.showPhone && (
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleInputChange(
                              null,
                              "phone",
                              e.target.textContent,
                            )
                          }
                        >
                          {resumeData.phone}
                        </span>
                      </div>
                    )}
                    {sectionSettings.header.showEmail && (
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleInputChange(
                              null,
                              "email",
                              e.target.textContent,
                            )
                          }
                        >
                          {resumeData.email}
                        </span>
                      </div>
                    )}
                    {sectionSettings.header.showLink && (
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleInputChange(
                              null,
                              "linkedin",
                              e.target.textContent,
                            )
                          }
                        >
                          {resumeData.linkedin}
                        </span>
                      </div>
                    )}
                    {sectionSettings.header.showLocation && (
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleInputChange(
                              null,
                              "location",
                              e.target.textContent,
                            )
                          }
                        >
                          {resumeData.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* SUMMARY SECTION */}
                {sectionSettings.summary.showSummary && (
                  <div className="mb-6">
                    <h2 className="text-sm md:text-md font-bold text-gray-800 mb-3 pb-1 border-b border-gray-200">
                      SUMMARY
                    </h2>
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleInputChange(null, "summary", e.target.textContent)
                      }
                      className="text-xs md:text-sm text-gray-700 leading-relaxed"
                    >
                      {resumeData.summary}
                    </p>
                  </div>
                )}

                {/* EXPERIENCE SECTION */}
                {sectionSettings.experience.showExperience && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-sm md:text-md font-bold text-gray-800 pb-1 border-b border-gray-200 flex-grow">
                        EXPERIENCE
                      </h2>
                      <button
                        onClick={() => handleAddSection("experience")}
                        className="ml-4 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                    {resumeData.experience.map((exp, idx) => (
                      <div key={idx} className="mb-6 relative group">
                        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleRemoveSection("experience", idx)}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mb-1">
                          <div className="flex justify-between items-center">
                            <h3
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                handleInputChange(
                                  "experience",
                                  "title",
                                  e.target.textContent,
                                  idx,
                                )
                              }
                              className="text-sm md:text-base font-bold text-gray-800"
                            >
                              {exp.title}
                            </h3>
                            <span
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                handleInputChange(
                                  "experience",
                                  "date",
                                  e.target.textContent,
                                  idx,
                                )
                              }
                              className="text-xs md:text-sm text-gray-600"
                            >
                              {exp.date}
                            </span>
                          </div>
                          <div className="flex justify-between items-start">
                            <p
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                handleInputChange(
                                  "experience",
                                  "companyName",
                                  e.target.textContent,
                                  idx,
                                )
                              }
                              className="text-xs md:text-sm font-medium"
                              style={{ color: "#17a2b8" }}
                            >
                              {exp.companyName}
                            </p>
                            <span
                              contentEditable
                              suppressContentEditableWarning
                              onBlur={(e) =>
                                handleInputChange(
                                  "experience",
                                  "companyLocation",
                                  e.target.textContent,
                                  idx,
                                )
                              }
                              className="text-xs md:text-sm text-gray-600"
                            >
                              {exp.companyLocation}
                            </span>
                          </div>
                        </div>
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleInputChange(
                              "experience",
                              "accomplishment",
                              e.target.innerHTML, // Use innerHTML to preserve bullets if they are HTML
                              idx,
                            )
                          }
                          className="text-xs md:text-sm text-gray-700 whitespace-pre-line"
                          dangerouslySetInnerHTML={{
                            __html: exp.accomplishment.replace(/\n/g, "<br />"),
                          }} // Render newlines as <br>
                        >
                          {/* {exp.accomplishment} */}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* EDUCATION SECTION */}
                {sectionSettings.education.showEducation && (
                  <div className="mb-6 relative">
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-sm md:text-md font-bold text-gray-800 pb-1 border-b border-gray-200 flex-grow">
                        EDUCATION
                      </h2>
                      <button
                        onClick={() => handleAddSection("education")}
                        className="ml-4 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx} className="mb-3 relative group">
                        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleRemoveSection("education", idx)}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <h3
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) =>
                              handleInputChange(
                                "education",
                                "degree",
                                e.target.textContent,
                                idx,
                              )
                            }
                            className="text-sm md:text-base font-bold text-gray-800"
                          >
                            {edu.degree}
                          </h3>
                          <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) =>
                              handleInputChange(
                                "education",
                                "duration",
                                e.target.textContent,
                                idx,
                              )
                            }
                            className="text-xs md:text-sm text-gray-600"
                          >
                            {edu.duration}
                          </span>
                        </div>
                        <div className="flex justify-between items-start">
                          <p
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) =>
                              handleInputChange(
                                "education",
                                "institution",
                                e.target.textContent,
                                idx,
                              )
                            }
                            className="text-xs md:text-sm font-medium"
                            style={{ color: "#17a2b8" }}
                          >
                            {edu.institution}
                          </p>
                          <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) =>
                              handleInputChange(
                                "education",
                                "location",
                                e.target.textContent,
                                idx,
                              )
                            }
                            className="text-xs md:text-sm text-gray-600"
                          >
                            {edu.location}
                          </span>
                        </div>
                      </div>
                    ))}

                    {branding && (
                      <div className="text-[8px] text-gray-400 text-left mt-4">
                        <span className="text-gray-400">Made by</span>{" "}
                        <span className="text-gray-400 font-semibold">
                          Aditya Tiwary
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN - 30% on desktop, full width on mobile */}
              <div
                className="w-full lg:w-[30%] text-white p-4 md:p-6 lg:p-8"
                style={{ backgroundColor: "#006666" }}
              >
                {/* SKILLS SECTION */}
                {sectionSettings.skills.showSkills && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm md:text-md font-bold border-b border-white pb-1 pt-1 flex-grow">
                        SKILLS
                      </h2>
                      <button
                        onClick={() => handleAddSection("skills")}
                        className="ml-4 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="text-xs md:text-sm leading-relaxed">
                      {resumeData.skills.map((skill, idx) => (
                        <span key={idx} className="inline-block group relative">
                          <div className="absolute -top-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleRemoveSection("skills", idx)}
                              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                            >
                              ×
                            </button>
                          </div>
                          <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) =>
                              handleInputChange(
                                "skills",
                                "category", // Field name is 'category' in data structure
                                e.target.textContent,
                                idx,
                              )
                            }
                          >
                            {skill.category}
                          </span>
                          {idx < resumeData.skills.length - 1 && (
                            <span className="mx-1.5">•</span>
                          )}{" "}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* STRENGTHS SECTION */}
                {sectionSettings.strengths.showStrengths && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm md:text-md font-bold border-b border-white pb-1 pt-1 flex-grow">
                        STRENGTHS
                      </h2>
                      <button
                        onClick={() => handleAddSection("strengths")}
                        className="ml-4 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                    {resumeData.strengths.map((strength, idx) => (
                      <div key={idx} className="mb-5 relative group">
                        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleRemoveSection("strengths", idx)}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex items-center mb-1">
                          <span className="mr-2 text-base">
                            {" "}
                            {/* Reduced icon size */}
                            {idx === 0 && "⭐"} {/* Data Analysis */}
                            {idx === 1 && "⚠️"} {/* Budgeting */}
                            {idx === 2 && "⭐"} {/* Project Management */}
                          </span>
                          <h3
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) =>
                              handleInputChange(
                                "strengths",
                                "title",
                                e.target.textContent,
                                idx,
                              )
                            }
                            className="text-sm md:text-base font-bold"
                          >
                            {strength.title}
                          </h3>
                        </div>
                        <p
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleInputChange(
                              "strengths",
                              "description",
                              e.target.textContent,
                              idx,
                            )
                          }
                          className="text-xs md:text-sm ml-7 text-teal-50" /* Adjusted margin for icon */
                        >
                          {strength.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* ACHIEVEMENTS SECTION */}
                {sectionSettings.achievements.showAchievements && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm md:text-md font-bold border-b border-white pb-1 pt-1 flex-grow">
                        ACHIEVEMENTS
                      </h2>
                      <button
                        onClick={() => handleAddSection("achievements")}
                        className="ml-4 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                    {resumeData.achievements.map((achievement, idx) => (
                      <div key={idx} className="mb-5 relative group">
                        <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleRemoveSection("achievements", idx)}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex items-center mb-1">
                          <span className="mr-2 text-base">
                            {" "}
                            {/* Reduced icon size */}
                            {idx === 0 && "🏆"}{" "}
                            {/* Financial Model Development */}
                            {idx === 1 && "📊"}{" "}
                            {/* Forecast Process Improvement */}
                            {idx === 2 && "📈"}{" "}
                            {/* Project Completion Rate Increase */}
                          </span>
                          <h3
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) =>
                              handleInputChange(
                                "achievements",
                                "title",
                                e.target.textContent,
                                idx,
                              )
                            }
                            className="text-sm md:text-base font-bold"
                          >
                            {achievement.title}
                          </h3>
                        </div>
                        <p
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleInputChange(
                              "achievements",
                              "description",
                              e.target.textContent,
                              idx,
                            )
                          }
                          className="text-xs md:text-sm ml-7 text-teal-50" /* Adjusted margin for icon */
                        >
                          {achievement.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Branding removed */}
          </div>
        </div>
      </div>

      {activeSection === "rearrange" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <motion.div
            className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Rearrange Sections
            </h3>
            {sectionsOrder.map((section, idx) => (
              <div
                key={section}
                className="flex items-center justify-between mb-2 p-2 bg-gray-50 rounded"
              >
                <span className="text-sm font-medium text-gray-800">
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleMoveSectionUp(idx)}
                    className="bg-gray-200 text-gray-700 p-1 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
                    disabled={idx === 0}
                    aria-label={`Move ${section} section up`}
                  >
                    ⬆️
                  </button>
                  <button
                    onClick={() => handleMoveSectionDown(idx)}
                    className="bg-gray-200 text-gray-700 p-1 rounded hover:bg-gray-300 disabled:opacity-50 transition-colors"
                    disabled={idx === sectionsOrder.length - 1}
                    aria-label={`Move ${section} section down`}
                  >
                    ⬇️
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setActiveSection(null)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
                aria-label="Close rearrange sections panel"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {activeSection && activeSection !== "rearrange" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <motion.div
            className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}{" "}
              Settings
            </h3>
            <div className="space-y-3">
              {sectionSettings[activeSection] &&
                Object.keys(sectionSettings[activeSection]).map((key) => (
                  <label
                    key={key}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <span className="text-sm font-medium text-gray-800">
                      {key
                        .replace("show", "")
                        .replace(/([A-Z])/g, " $1")
                        .trim()}
                    </span>
                    <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                      <input
                        type="checkbox"
                        id={"toggle-" + key}
                        className="sr-only"
                        checked={sectionSettings[activeSection][key]}
                        onChange={() => handleSettingChange(activeSection, key)}
                      />
                      <label
                        htmlFor={"toggle-" + key}
                        className={
                          "block h-6 overflow-hidden rounded-full cursor-pointer " +
                          (sectionSettings[activeSection][key]
                            ? "bg-blue-500"
                            : "bg-gray-300")
                        }
                      >
                        <span
                          className={
                            "block h-6 w-6 rounded-full transform transition-transform duration-200 ease-in-out bg-white " +
                            (sectionSettings[activeSection][key]
                              ? "translate-x-4"
                              : "translate-x-0")
                          }
                        />
                      </label>
                    </div>
                  </label>
                ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setActiveSection(null)}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
                aria-label="Close settings panel"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {showShareNotification && <ShareNotification />}
      {showSaveNotification && <SaveNotification />}
      {isLoading && <LoadingScreen />}
      {isDownloading && <DownloadPreloader />}
      {showAIErrorPopup && <AIErrorPopup />}
      {showUploadErrorPopup && <UploadErrorPopup />}
      {showColorPicker && <ColorPickerPopup />}



      {/* AI Assistant dropdown menu */}
      {showAIMenu && (
        <motion.div
          className="absolute bg-white shadow-lg rounded-md p-4 z-50 ai-menu"
          style={{
            top: aiMenuPosition?.top || 0,
            left: aiMenuPosition?.left || 0,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={() => handleEnhanceSection("summary")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Enhance Summary
          </button>
          <button
            onClick={() => handleEnhanceSection("experience")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Enhance Experience
          </button>
          <button
            onClick={() => handleEnhanceSection("education")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Enhance Education
          </button>
          <button
            onClick={() => handleEnhanceSection("achievements")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Enhance Achievements
          </button>
          <button
            onClick={() => handleEnhanceSection("strengths")}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Enhance Strengths
          </button>
        </motion.div>
      )}
    </div>
    </>
  );
};

export default Template3;
