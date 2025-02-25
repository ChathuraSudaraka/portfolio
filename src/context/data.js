export const blogs = [
  {
    id: 1,
    title: "Getting Started with React: A Beginner's Guide",
    description: `
Learn the basics of React and build your first web application. This guide covers the fundamentals of React—including components, props, state, and more—so that by the end you'll have a solid understanding of how to create your own projects.

Prerequisites: Basic knowledge of HTML, CSS, and JavaScript.
    `,
    category: "React",
    image:
      "",
    author: {
      name: "John Doe",
      avatar: "/assets/avatars/author-avatar.jpg",
      role: "Senior React Developer",
      bio: "10+ years of experience in frontend development. Passionate about teaching and web technologies.",
    },
    date: "2024-01-15",
    tags: ["React", "JavaScript", "Web Development", "Frontend"],
    readTime: 8,
    sections: [
      { title: "Introduction", id: "intro" },
      { title: "What is React?", id: "what-is-react" },
      { title: "Getting Started", id: "getting-started" },
      { title: "Components", id: "components" },
      { title: "State Management", id: "state" },
      { title: "Best Practices", id: "best-practices" },
      { title: "Conclusion", id: "conclusion" },
    ],
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns for React Applications",
    description:
      "Discover advanced TypeScript patterns that will help you write more maintainable React applications. This guide covers generic types, utility types, and best practices for type-safe React components. Learn how to leverage TypeScript's powerful type system to catch errors before they reach production.",
    category: "TypeScript",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3",
    author: {
      name: "Jane Smith",
      avatar: "/assets/avatars/jane-avatar.jpg",
      role: "TypeScript Expert",
    },
    date: "2024-01-20",
    tags: ["TypeScript", "React", "JavaScript", "Web Development"],
    readTime: 12,
    sections: [
      {
        title: "TypeScript Fundamentals",
        id: "fundamentals",
      },
      {
        title: "Generic Types in React",
        id: "generics",
      },
      {
        title: "Advanced Type Safety",
        id: "type-safety",
      },
    ],
  },
  {
    id: 3,
    title: "Building Scalable APIs with Node.js and Express",
    description:
      "Learn how to build robust and scalable APIs using Node.js and Express. This tutorial covers RESTful API design, middleware implementation, authentication, and database integration. Discover best practices for error handling, validation, and API documentation.",
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3",
    author: {
      name: "Mike Johnson",
      avatar: "/assets/avatars/mike-avatar.jpg",
      role: "Backend Developer",
    },
    date: "2024-01-25",
    tags: ["Node.js", "Express", "API", "Backend"],
    readTime: 15,
    sections: [
      {
        title: "API Design Principles",
        id: "api-design",
      },
      {
        title: "Middleware and Authentication",
        id: "middleware",
      },
      {
        title: "Database Integration",
        id: "database",
      },
    ],
  },
  {
    id: 4,
    title: "Mastering CSS Grid and Flexbox",
    description:
      "Master modern CSS layout techniques with this comprehensive guide to CSS Grid and Flexbox. Learn how to create responsive layouts, handle complex alignment scenarios, and build modern user interfaces. Includes practical examples and common layout patterns.",
    category: "CSS",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3",
    author: {
      name: "Sarah Wilson",
      avatar: "/assets/avatars/sarah-avatar.jpg",
      role: "Frontend Designer",
    },
    date: "2024-01-30",
    tags: ["CSS", "Web Design", "Frontend", "Responsive Design"],
    readTime: 10,
    sections: [
      {
        title: "CSS Grid Basics",
        id: "grid-basics",
      },
      {
        title: "Flexbox Fundamentals",
        id: "flexbox",
      },
      {
        title: "Responsive Layouts",
        id: "responsive",
      },
    ],
  },
  {
    id: 5,
    title: "GraphQL in React: A Comprehensive Guide",
    description: `
Explore the power of GraphQL and how it integrates with React to build efficient and flexible APIs. This guide covers the basics of GraphQL, setting up a GraphQL server, and consuming GraphQL APIs within your React applications.

Key Topics:
- What is GraphQL?
- Setting up Apollo Client
- Building dynamic queries and mutations
- Best practices for error handling and caching
    `,
    category: "React",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3",
    author: {
      name: "Alice Brown",
      avatar: "/assets/avatars/sarah-avatar.jpg",
      role: "Full-Stack Developer",
      bio: "Expert in building scalable web applications with a passion for GraphQL and modern JavaScript.",
    },
    date: "2024-02-10",
    tags: ["GraphQL", "React", "API", "Web Development"],
    readTime: 10,
    sections: [
      { title: "Introduction to GraphQL", id: "intro-graphql" },
      { title: "Benefits over REST", id: "benefits" },
      { title: "Setting Up Apollo Client", id: "apollo-client" },
      { title: "Building Queries and Mutations", id: "queries-mutations" },
      { title: "Error Handling & Caching", id: "error-caching" },
      { title: "Conclusion", id: "conclusion" },
    ],
  },
  {
    id: 6,
    title: "Understanding React Hooks: useState and useEffect",
    description:
      "Dive deep into React's most commonly used hooks. This comprehensive guide explains how useState and useEffect work under the hood, with practical examples and performance considerations. Learn best practices for managing component state and side effects in your React applications.",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "Frontend Developer",
    },
    date: "March 15, 2024",
    tags: ["React", "Hooks", "Frontend", "JavaScript"],
    readTime: 12,
    sections: [
      { title: "Introduction to Hooks", id: "intro" },
      { title: "useState Deep Dive", id: "use-state" },
      { title: "useEffect Patterns", id: "use-effect" },
      { title: "Custom Hooks", id: "custom-hooks" },
    ],
  },
  {
    id: 7,
    title: "Building Microservices with Docker and Kubernetes",
    description:
      "Learn how to design, deploy, and scale microservices using Docker containers and Kubernetes orchestration. This tutorial walks through creating a resilient microservice architecture, setting up CI/CD pipelines, and implementing service discovery, load balancing, and fault tolerance.",
    category: "DevOps",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "DevOps Engineer",
    },
    date: "February 28, 2024",
    tags: ["Docker", "Kubernetes", "Microservices", "DevOps"],
    readTime: 15,
    sections: [
      { title: "Microservice Architecture", id: "architecture" },
      { title: "Docker Containerization", id: "docker" },
      { title: "Kubernetes Orchestration", id: "kubernetes" },
      { title: "CI/CD Implementation", id: "cicd" },
    ],
  },
  {
    id: 8,
    title: "Next.js 14: The Future of React Applications",
    description:
      "Explore the latest features in Next.js 14 including Server Components, Streaming, and the new App Router. Learn how these features can significantly improve your application's performance and developer experience. This guide includes migration strategies and real-world examples.",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1614064642618-85c2ada3b833?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "Full Stack Developer",
    },
    date: "April 5, 2024",
    tags: ["Next.js", "React", "Server Components", "Performance"],
    readTime: 10,
    sections: [
      { title: "Introduction to Next.js 14", id: "intro" },
      { title: "Server Components", id: "server-components" },
      { title: "App Router", id: "app-router" },
      { title: "Migration Guide", id: "migration" },
    ],
  },
  {
    id: 9,
    title: "Modern CSS Techniques and Best Practices",
    description:
      "Discover the latest CSS techniques that are transforming web design in 2024. From container queries and subgrid to scroll-driven animations and :has() selectors, this article covers cutting-edge features and how to use them responsibly with progressive enhancement.",
    category: "CSS",
    image:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "UI Developer",
    },
    date: "January 22, 2024",
    tags: ["CSS", "Web Design", "Frontend", "UI"],
    readTime: 8,
    sections: [
      { title: "Modern CSS Features", id: "modern-features" },
      { title: "Container Queries", id: "container-queries" },
      { title: "CSS Custom Properties", id: "custom-properties" },
      { title: "Animation Techniques", id: "animations" },
    ],
  },
  {
    id: 10,
    title: "Securing Your Node.js Applications",
    description:
      "Learn essential security practices for Node.js applications to protect against common vulnerabilities like XSS, CSRF, injection attacks, and more. This guide covers authentication, authorization, data validation, dependency management, and secure coding patterns to keep your applications safe.",
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "Security Specialist",
    },
    date: "March 10, 2024",
    tags: ["Node.js", "Security", "Backend", "JavaScript"],
    readTime: 14,
    sections: [
      { title: "Common Vulnerabilities", id: "vulnerabilities" },
      { title: "Authentication & Authorization", id: "auth" },
      { title: "Data Validation", id: "validation" },
      { title: "Dependency Management", id: "dependencies" },
    ],
  },
  {
    id: 11,
    title: "State Management in React: Beyond Redux",
    description:
      "Explore modern state management solutions for React applications and alternatives to Redux. This article compares Context API, Zustand, Recoil, Jotai, and other libraries to help you choose the right tool for your specific use cases and project requirements.",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "Frontend Developer",
    },
    date: "February 15, 2024",
    tags: ["React", "State Management", "Frontend", "JavaScript"],
    readTime: 11,
    sections: [
      { title: "The State Management Landscape", id: "landscape" },
      { title: "Context API Deep Dive", id: "context-api" },
      { title: "Modern State Libraries", id: "libraries" },
      { title: "Making the Right Choice", id: "decision-making" },
    ],
  },
  {
    id: 12,
    title: "Building Progressive Web Apps in 2024",
    description:
      "Learn how to create modern Progressive Web Apps (PWAs) that deliver native-like experiences on the web. This guide covers service workers, web app manifests, offline capabilities, push notifications, and testing strategies to ensure your PWA performs well across devices and networks.",
    category: "Web Development",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "Mobile Web Specialist",
    },
    date: "April 2, 2024",
    tags: ["PWA", "Web Development", "Mobile", "Performance"],
    readTime: 13,
    sections: [
      { title: "PWA Fundamentals", id: "fundamentals" },
      { title: "Service Workers", id: "service-workers" },
      { title: "Offline Capabilities", id: "offline" },
      { title: "Push Notifications", id: "notifications" },
    ],
  },
  {
    id: 13,
    title: "Introduction to Web3 Development with Ethereum",
    description:
      "Start your journey into Web3 development with this beginner-friendly guide to Ethereum and decentralized applications. Learn about smart contracts, blockchain fundamentals, and how to build your first dApp using Solidity, Ethers.js, and React.",
    category: "Blockchain",
    image:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "Blockchain Developer",
    },
    date: "March 20, 2024",
    tags: ["Blockchain", "Web3", "Ethereum", "Smart Contracts"],
    readTime: 16,
    sections: [
      { title: "Web3 Fundamentals", id: "fundamentals" },
      { title: "Smart Contract Basics", id: "smart-contracts" },
      { title: "Building a Simple dApp", id: "dapp" },
      { title: "Testing and Deployment", id: "deployment" },
    ],
  },
  {
    id: 14,
    title: "Machine Learning for JavaScript Developers",
    description:
      "Explore machine learning concepts and applications using JavaScript and browser-based ML frameworks. This tutorial demonstrates how to implement classification, regression, neural networks, and natural language processing directly in the browser using TensorFlow.js and other libraries.",
    category: "Machine Learning",
    image:
      "https://images.unsplash.com/photo-1515879128891-3b5e36a85492?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "AI Engineer",
    },
    date: "January 30, 2024",
    tags: ["Machine Learning", "JavaScript", "TensorFlow.js", "AI"],
    readTime: 18,
    sections: [
      { title: "ML in the Browser", id: "browser-ml" },
      { title: "TensorFlow.js Basics", id: "tensorflow" },
      { title: "Building a Classifier", id: "classifier" },
      { title: "Natural Language Processing", id: "nlp" },
    ],
  },
  {
    id: 15,
    title: "Optimizing React Application Performance",
    description:
      "Master techniques for optimizing your React application's performance. This in-depth guide covers profiling, memoization, code splitting, virtualizing long lists, lazy loading, and other strategies to create lightning-fast React applications that provide excellent user experiences.",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "Performance Engineer",
    },
    date: "February 10, 2024",
    tags: ["React", "Performance", "Optimization", "Frontend"],
    readTime: 12,
    sections: [
      { title: "Performance Metrics", id: "metrics" },
      { title: "Profiling React Apps", id: "profiling" },
      { title: "Memoization Techniques", id: "memoization" },
      { title: "Code Splitting Strategies", id: "code-splitting" },
    ],
  },
  {
    id: 16,
    title: "Cloud-Native Application Development with AWS",
    description:
      "Learn how to architect and build cloud-native applications using AWS services. This comprehensive guide covers serverless computing with Lambda, container orchestration with ECS/EKS, database options, event-driven architectures, and best practices for scalable and resilient cloud applications.",
    category: "Cloud Computing",
    image:
      "https://images.unsplash.com/photo-1603695762547-fba8b88ac8ad?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "Cloud Architect",
    },
    date: "March 5, 2024",
    tags: ["AWS", "Cloud", "Serverless", "Microservices"],
    readTime: 17,
    sections: [
      { title: "Cloud-Native Principles", id: "principles" },
      { title: "Serverless with Lambda", id: "lambda" },
      { title: "Container Orchestration", id: "containers" },
      { title: "Event-Driven Architecture", id: "event-driven" },
    ],
  },
  {
    id: 17,
    title: "Accessible Web Design: WCAG 2.2 Compliance",
    description:
      "Ensure your web applications are accessible to everyone by implementing WCAG 2.2 guidelines. This practical guide covers semantic HTML, keyboard navigation, ARIA attributes, color contrast, focus management, and testing tools to create inclusive user experiences and meet legal requirements.",
    category: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1586776977607-310e9c725c37?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "Accessibility Specialist",
    },
    date: "January 15, 2024",
    tags: ["Accessibility", "WCAG", "UI/UX", "HTML"],
    readTime: 10,
    sections: [
      { title: "WCAG 2.2 Overview", id: "wcag" },
      { title: "Semantic HTML", id: "semantic" },
      { title: "Keyboard Navigation", id: "keyboard" },
      { title: "Testing Accessibility", id: "testing" },
    ],
  },
  {
    id: 18,
    title: "Modern Authentication with OAuth 2.0 and OIDC",
    description:
      "Implement secure authentication and authorization in your web applications using OAuth 2.0 and OpenID Connect. This tutorial explains different grant types, token handling, securing SPAs, mobile apps, and backend services, as well as common security pitfalls to avoid.",
    category: "Security",
    image:
      "https://images.unsplash.com/photo-1562813733-b31f1996b1f5?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "Security Engineer",
    },
    date: "February 20, 2024",
    tags: ["Authentication", "OAuth", "OIDC", "Security"],
    readTime: 14,
    sections: [
      { title: "OAuth 2.0 Fundamentals", id: "oauth" },
      { title: "OpenID Connect", id: "oidc" },
      { title: "Implementation Strategies", id: "implementation" },
      { title: "Security Best Practices", id: "best-practices" },
    ],
  },
  {
    id: 19,
    title: "Building Mobile Apps with React Native in 2024",
    description:
      "Discover the latest best practices for developing cross-platform mobile applications with React Native. This guide covers the new architecture, Fabric renderer, TurboModules, project setup, navigation patterns, state management, and optimizing performance across iOS and Android platforms.",
    category: "Mobile Development",
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "Mobile Developer",
    },
    date: "March 25, 2024",
    tags: ["React Native", "Mobile", "iOS", "Android"],
    readTime: 15,
    sections: [
      { title: "React Native in 2024", id: "rn-2024" },
      { title: "Project Architecture", id: "architecture" },
      { title: "Navigation Patterns", id: "navigation" },
      { title: "Performance Optimization", id: "performance" },
    ],
  },
  {
    id: 20,
    title: "Functional Programming Patterns in JavaScript",
    description:
      "Master functional programming concepts and patterns to write cleaner, more maintainable JavaScript code. This in-depth guide covers pure functions, immutability, function composition, higher-order functions, currying, and practical applications of functional techniques in modern JavaScript development.",
    category: "JavaScript",
    image:
      "https://images.unsplash.com/photo-1555066931-bf19f8fd1085?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "JavaScript Developer",
    },
    date: "April 10, 2024",
    tags: ["JavaScript", "Functional Programming", "Web Development"],
    readTime: 13,
    sections: [
      { title: "Functional Principles", id: "principles" },
      { title: "Pure Functions", id: "pure-functions" },
      { title: "Function Composition", id: "composition" },
      { title: "Practical Applications", id: "applications" },
    ],
  },
  {
    id: 21,
    title: "Testing React Applications: A Comprehensive Guide",
    description:
      "Learn how to implement a robust testing strategy for your React applications using Jest, React Testing Library, and Cypress. This guide covers unit testing, component testing, integration testing, end-to-end testing, and setting up continuous integration for your test suite.",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "QA Engineer",
    },
    date: "March 15, 2024",
    tags: ["Testing", "React", "Jest", "Cypress"],
    readTime: 16,
    sections: [
      { title: "Testing Strategy", id: "strategy" },
      { title: "Component Testing", id: "component-testing" },
      { title: "Integration Tests", id: "integration" },
      { title: "End-to-End Testing", id: "e2e" },
    ],
  },
  {
    id: 22,
    title: "Introduction to TypeScript Generics",
    description:
      "Master TypeScript generics to write more flexible and reusable code. This tutorial explains how generics work, common patterns and use cases, constraints, utility types, and advanced techniques that will help you leverage the full power of TypeScript's type system in your applications.",
    category: "TypeScript",
    image:
      "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3",
    author: {
      name: "Chathura Sudaraka",
      avatar: "/assets/icon.png",
      role: "TypeScript Developer",
    },
    date: "February 5, 2024",
    tags: ["TypeScript", "Generics", "Programming", "Web Development"],
    readTime: 12,
    sections: [
      { title: "Understanding Generics", id: "basics" },
      { title: "Generic Constraints", id: "constraints" },
      { title: "Utility Types", id: "utility-types" },
      { title: "Real-World Examples", id: "examples" },
    ],
  },
];

export const comments = [
  {
    id: 1,
    blogId: 1,
    username: "Sarah Miller",
    userAvatar: "",
    content:
      "This is exactly what I needed! The explanation of components is very clear. Would love to see more about hooks in the future.",
    createdAt: "2024-01-16T10:30:00",
    likes: 15,
    replies: [
      {
        id: 101,
        username: "John Doe",
        userAvatar: "",
        content:
          "Thanks Sarah! I'm planning a detailed article about hooks next week.",
        createdAt: "2024-01-16T11:00:00",
        likes: 5,
      },
    ],
  },
  {
    id: 2,
    blogId: 1,
    username: "Mike Chen",
    userAvatar: "",
    content:
      "Great introduction to React! The code examples are particularly helpful. One question: what are your thoughts on using class components vs. functional components?",
    createdAt: "2024-01-16T15:45:00",
    likes: 8,
    replies: [],
  },
  {
    id: 3,
    blogId: 5,
    username: "Tom Parker",
    userAvatar: "",
    content:
      "Great read! The section on Apollo Client setup was particularly insightful.",
    createdAt: "2024-02-11T09:15:00",
    likes: 5,
    replies: [],
  },
  {
    id: 4,
    blogId: 6,
    username: "Alex Johnson",
    userAvatar: "",
    content:
      "This hooks explanation finally made useEffect click for me. The dependency array section was particularly helpful.",
    createdAt: "2024-03-16T14:20:00",
    likes: 12,
    replies: [
      {
        id: 102,
        username: "Chathura Sudaraka",
        userAvatar: "/assets/icon.png",
        content:
          "Glad it helped, Alex! Understanding the dependency array is definitely a key part of working with hooks effectively.",
        createdAt: "2024-03-16T15:30:00",
        likes: 3,
      },
    ],
  },
  {
    id: 5,
    blogId: 8,
    username: "Priya Patel",
    userAvatar: "",
    content:
      "Great overview of Next.js 14! I'm excited to try out the new Server Components in my current project. Do you have any tips for migrating from Pages Router?",
    createdAt: "2024-04-06T09:45:00",
    likes: 8,
    replies: [],
  },
  {
    id: 6,
    blogId: 15,
    username: "David Rodriguez",
    userAvatar: "",
    content:
      "The section on React.memo and useMemo was excellent. I implemented these techniques and saw a significant performance improvement in my application with large lists.",
    createdAt: "2024-02-12T11:10:00",
    likes: 15,
    replies: [
      {
        id: 103,
        username: "Chathura Sudaraka",
        userAvatar: "/assets/icon.png",
        content:
          "That's awesome to hear, David! Memoization is indeed a game-changer for performance-critical components.",
        createdAt: "2024-02-12T13:25:00",
        likes: 7,
      },
    ],
  },
];

export const categories = [
  "All",
  "React",
  "TypeScript",
  "Backend",
  "CSS",
  "JavaScript",
  "Web Development",
  "GraphQL",
  "DevOps",
  "Mobile Development",
  "Blockchain",
  "Machine Learning",
  "Cloud Computing",
  "UI/UX Design",
  "Security",
];
