import { request } from './api';

// Verified default portfolio data from Sanjay Ashwin's Resume
export const defaultPortfolioData = {
  profile: {
    name: "Sanjay Ashwin",
    title: "Java & Full-Stack Developer",
    bio: "Computer Science and Engineering undergraduate with strong knowledge in Java, Spring Boot, Spring Security, and full-stack web development. Passionate about backend development, REST API design, and building scalable applications through practical project experience.",
    email: "sanjayashwin502@gmail.com",
    phone: "+91-8870794020",
    location: "Chennai, India",
    githubUrl: "https://github.com/sanjayashwinP",
    linkedinUrl: "https://www.linkedin.com/in/sanjay-ashwin-62b566376",
    resumeUrl: "/Sanjay_Ashwin_Resume.pdf",
    cgpa: "8.4",
    avatarUrl: "",
    educationSummary: "B.E. Computer Science and Engineering, Saveetha Engineering College (2023 - 2027)"
  },
  skillsByCategory: {
    "Languages": [
      { id: 1, name: "Java", category: "Languages", proficiencyLevel: "Proficient" },
      { id: 2, name: "JavaScript", category: "Languages", proficiencyLevel: "Proficient" },
      { id: 3, name: "SQL", category: "Languages", proficiencyLevel: "Proficient" },
      { id: 4, name: "Python", category: "Languages", proficiencyLevel: "Basics" },
      { id: 5, name: "C", category: "Languages", proficiencyLevel: "Basics" }
    ],
    "Frontend": [
      { id: 6, name: "HTML5", category: "Frontend", proficiencyLevel: "Proficient" },
      { id: 7, name: "CSS3", category: "Frontend", proficiencyLevel: "Proficient" },
      { id: 8, name: "ReactJS", category: "Frontend", proficiencyLevel: "Proficient" }
    ],
    "Backend": [
      { id: 9, name: "Spring Boot", category: "Backend", proficiencyLevel: "Proficient" },
      { id: 10, name: "Spring Security", category: "Backend", proficiencyLevel: "Proficient" },
      { id: 11, name: "REST APIs", category: "Backend", proficiencyLevel: "Proficient" }
    ],
    "Database": [
      { id: 12, name: "MySQL", category: "Database", proficiencyLevel: "Proficient" }
    ],
    "Tools": [
      { id: 13, name: "Git", category: "Tools", proficiencyLevel: "Proficient" },
      { id: 14, name: "GitHub", category: "Tools", proficiencyLevel: "Proficient" },
      { id: 15, name: "Maven", category: "Tools", proficiencyLevel: "Proficient" },
      { id: 16, name: "Postman", category: "Tools", proficiencyLevel: "Proficient" },
      { id: 17, name: "IntelliJ IDEA", category: "Tools", proficiencyLevel: "Proficient" },
      { id: 18, name: "VS Code", category: "Tools", proficiencyLevel: "Proficient" }
    ],
    "Cloud": [
      { id: 19, name: "AWS Basics", category: "Cloud", proficiencyLevel: "Foundational" }
    ],
    "Concepts": [
      { id: 20, name: "Backend Development", category: "Concepts", proficiencyLevel: "Proficient" },
      { id: 21, name: "Problem Solving", category: "Concepts", proficiencyLevel: "Proficient" },
      { id: 22, name: "OOP & Collections", category: "Concepts", proficiencyLevel: "Proficient" },
      { id: 23, name: "JWT Authentication", category: "Concepts", proficiencyLevel: "Proficient" },
      { id: 24, name: "Team Collaboration", category: "Concepts", proficiencyLevel: "Proficient" }
    ]
  },
  projects: [
    {
      id: 1,
      title: "AI Integrated Online Coding Platform",
      year: "2025",
      tagline: "Full-stack online coding platform with Judge0 code execution and Gemini AI error explanation",
      description: "Developed a full-stack online coding platform using ReactJS and Spring Boot. Integrated Judge0 API for real-time code compilation and execution across programming languages. Implemented AI-powered error explanation and context-aware hint generation using Google Gemini API. Built backend REST APIs and integrated Monaco Editor for IDE-like coding support with a responsive interface.",
      technologies: "ReactJS, Spring Boot, Judge0 API, Gemini API, Monaco Editor, REST APIs, Git, GitHub",
      features: "Real-time remote code compilation via Judge0 API;AI error explanations and hint generation via Gemini API;Monaco Editor integration with syntax highlighting;Spring Boot backend REST APIs for submission handling;Responsive developer UI",
      githubUrl: "https://github.com/sanjayashwinP",
      liveDemoUrl: "",
      featured: true,
      problemStatement: "Students and beginner programmers often encounter cryptic compiler and runtime errors while coding online, leading to frustration when self-diagnosing bugs.",
      solutionStatement: "Engineered an AI-assisted IDE environment integrating Judge0 for secure code compilation and Google's Gemini API to translate obscure stack traces into intuitive hints.",
      architectureNotes: "React frontend hosts Monaco Editor and communicates with Spring Boot REST endpoints. The backend coordinates compilation tasks with Judge0 and prompts Gemini API for targeted diagnostic insights.",
      contributions: "Architected the full-stack architecture, developed Spring Boot REST APIs, integrated Judge0 execution engine, built the prompt engineering pipeline for Gemini, and created the responsive React interface.",
      futureImprovements: "Add multi-language file structure support, automated test suite evaluation with test cases, and live multiplayer coding rooms."
    }
  ],
  experience: [
    {
      id: 1,
      company: "Codveda Technologies",
      role: "Java Development Intern",
      location: "Chennai, India",
      startDate: "June 2026",
      endDate: "July 2026",
      isCurrent: false,
      description: "Worked on Java and Spring Boot technologies for backend application development. Developed RESTful APIs using Spring Boot and implemented CRUD operations for data management. Applied Object-Oriented Programming principles and Java Collections Framework for modular, maintainable code. Performed API testing and debugging using Postman. Gained practical experience with Maven, Git, and MySQL database integration in Spring Boot applications.",
      technologies: "Java, Spring Boot, REST APIs, CRUD, OOP, Java Collections Framework, Maven, Git, MySQL, Postman"
    }
  ],
  education: [
    {
      id: 1,
      institution: "Saveetha Engineering College",
      degree: "B.E. Computer Science and Engineering",
      fieldOfStudy: "Computer Science and Engineering",
      startDate: "September 2023",
      endDate: "May 2027",
      cgpa: "8.4",
      location: "Chennai, India"
    }
  ],
  certifications: [
    {
      id: 1,
      name: "AWS Academy Cloud Foundations",
      issuer: "AWS Academy",
      issueDate: "2024",
      credentialUrl: "",
      credentialId: ""
    },
    {
      id: 2,
      name: "Prompt Engineering",
      issuer: "Simplilearn",
      issueDate: "2024",
      credentialUrl: "",
      credentialId: ""
    },
    {
      id: 3,
      name: "Spring Boot",
      issuer: "Coursera",
      issueDate: "2024",
      credentialUrl: "",
      credentialId: ""
    }
  ]
};

export const portfolioService = {
  async getPortfolioData() {
    try {
      const res = await request('/portfolio');
      return res?.data || defaultPortfolioData;
    } catch (err) {
      console.warn("Using verified fallback resume data:", err.message);
      return defaultPortfolioData;
    }
  },

  async getProjectById(id) {
    const res = await request(`/projects/${id}`);
    return res.data;
  },

  async submitContact(formData) {
    const res = await request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    return res;
  }
};
