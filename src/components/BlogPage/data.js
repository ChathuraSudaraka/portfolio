export const blogs = [
  {
    id: 1,
    title: "Getting Started with React: A Beginner's Guide",
    description: `
Learn the basics of React and build your first web application. This guide covers the fundamentals of React—including components, props, state, and more—so that by the end you'll have a solid understanding of how to create your own projects.

Prerequisites: Basic knowledge of HTML, CSS, and JavaScript.
    `,
    category: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3",
    author: {
      name: "John Doe",
      avatar: "/author-avatar.jpg",
      role: "Senior React Developer",
      bio: "10+ years of experience in frontend development. Passionate about teaching and web technologies."
    },
    publishDate: "2024-01-15",
    tags: ["React", "JavaScript", "Web Development", "Frontend"],
    readTime: 8,
    sections: [
      { title: "Introduction", id: "intro" },
      { title: "What is React?", id: "what-is-react" },
      { title: "Getting Started", id: "getting-started" },
      { title: "Components", id: "components" },
      { title: "State Management", id: "state" },
      { title: "Best Practices", id: "best-practices" },
      { title: "Conclusion", id: "conclusion" }
    ]
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns for React Applications",
    description: "Discover advanced TypeScript patterns that will help you write more maintainable React applications. This guide covers generic types, utility types, and best practices for type-safe React components. Learn how to leverage TypeScript's powerful type system to catch errors before they reach production.",
    category: "TypeScript",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3",
    author: {
      name: "Jane Smith",
      avatar: "/jane-avatar.jpg",
      role: "TypeScript Expert"
    },
    publishDate: "2024-01-20",
    tags: ["TypeScript", "React", "JavaScript", "Web Development"],
    readTime: 12,
    sections: [
      {
        title: "TypeScript Fundamentals",
        id: "fundamentals"
      },
      {
        title: "Generic Types in React",
        id: "generics"
      },
      {
        title: "Advanced Type Safety",
        id: "type-safety"
      }
    ]
  },
  {
    id: 3,
    title: "Building Scalable APIs with Node.js and Express",
    description: "Learn how to build robust and scalable APIs using Node.js and Express. This tutorial covers RESTful API design, middleware implementation, authentication, and database integration. Discover best practices for error handling, validation, and API documentation.",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3",
    author: {
      name: "Mike Johnson",
      avatar: "/mike-avatar.jpg",
      role: "Backend Developer"
    },
    publishDate: "2024-01-25",
    tags: ["Node.js", "Express", "API", "Backend"],
    readTime: 15,
    sections: [
      {
        title: "API Design Principles",
        id: "api-design"
      },
      {
        title: "Middleware and Authentication",
        id: "middleware"
      },
      {
        title: "Database Integration",
        id: "database"
      }
    ]
  },
  {
    id: 4,
    title: "Mastering CSS Grid and Flexbox",
    description: "Master modern CSS layout techniques with this comprehensive guide to CSS Grid and Flexbox. Learn how to create responsive layouts, handle complex alignment scenarios, and build modern user interfaces. Includes practical examples and common layout patterns.",
    category: "CSS",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3",
    author: {
      name: "Sarah Wilson",
      avatar: "/sarah-avatar.jpg",
      role: "Frontend Designer"
    },
    publishDate: "2024-01-30",
    tags: ["CSS", "Web Design", "Frontend", "Responsive Design"],
    readTime: 10,
    sections: [
      {
        title: "CSS Grid Basics",
        id: "grid-basics"
      },
      {
        title: "Flexbox Fundamentals",
        id: "flexbox"
      },
      {
        title: "Responsive Layouts",
        id: "responsive"
      }
    ]
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
    image: "https://images.unsplash.com/photo-1593642634311-18fda28b0bdf?ixlib=rb-4.0.3",
    author: {
      name: "Alice Brown",
      avatar: "/alice-avatar.jpg",
      role: "Full-Stack Developer",
      bio: "Expert in building scalable web applications with a passion for GraphQL and modern JavaScript."
    },
    publishDate: "2024-02-10",
    tags: ["GraphQL", "React", "API", "Web Development"],
    readTime: 10,
    sections: [
      { title: "Introduction to GraphQL", id: "intro-graphql" },
      { title: "Benefits over REST", id: "benefits" },
      { title: "Setting Up Apollo Client", id: "apollo-client" },
      { title: "Building Queries and Mutations", id: "queries-mutations" },
      { title: "Error Handling & Caching", id: "error-caching" },
      { title: "Conclusion", id: "conclusion" }
    ]
  }
];

export const comments = [
  {
    id: 1,
    blogId: 1,
    username: "Sarah Miller",
    userAvatar: "/avatars/sarah.jpg",
    content: "This is exactly what I needed! The explanation of components is very clear. Would love to see more about hooks in the future.",
    createdAt: "2024-01-16T10:30:00",
    likes: 15,
    replies: [
      {
        id: 101,
        username: "John Doe",
        userAvatar: "/author-avatar.jpg",
        content: "Thanks Sarah! I'm planning a detailed article about hooks next week.",
        createdAt: "2024-01-16T11:00:00",
        likes: 5
      }
    ]
  },
  {
    id: 2,
    blogId: 1,
    username: "Mike Chen",
    userAvatar: "/avatars/mike.jpg",
    content: "Great introduction to React! The code examples are particularly helpful. One question: what are your thoughts on using class components vs. functional components?",
    createdAt: "2024-01-16T15:45:00",
    likes: 8,
    replies: []
  },
  {
    id: 3,
    blogId: 5,
    username: "Tom Parker",
    userAvatar: "/avatars/tom.jpg",
    content: "Great read! The section on Apollo Client setup was particularly insightful.",
    createdAt: "2024-02-11T09:15:00",
    likes: 5,
    replies: []
  }
];

export const categories = [
  "All",
  "React",
  "TypeScript",
  "Backend",
  "CSS",
  "JavaScript",
  "Web Development",
  "GraphQL"
];
