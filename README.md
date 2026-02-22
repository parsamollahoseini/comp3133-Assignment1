# Employee Management System - COMP3133 Assignment 1

A full-stack Employee Management System backend built with Node.js, Express, GraphQL, and MongoDB, featuring Cloudinary integration for employee photo uploads.

## 📋 Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [GraphQL API Documentation](#graphql-api-documentation)
- [Testing](#testing)
- [Sample User Details](#sample-user-details)

## ✨ Features

- **User Management**
  - User signup with password encryption
  - User login with authentication

- **Employee Management**
  - Create, read, update, and delete employee records
  - Search employees by ID, designation, or department
  - Upload employee photos to Cloudinary
  - Input validation and error handling

## 🚀 Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **GraphQL** - API query language
- **Apollo Server** - GraphQL server
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **Cloudinary** - Image hosting service
- **express-validator** - Input validation
- **dotenv** - Environment variable management

## 📁 Project Structure

```
COMP3133_Assignment1/
├── config/
│   ├── database.js          # MongoDB connection configuration
│   └── cloudinary.js        # Cloudinary configuration
├── graphql/
│   ├── typeDefs.js          # GraphQL type definitions
│   └── resolvers.js         # GraphQL resolvers
├── models/
│   ├── User.js              # User model schema
│   └── Employee.js          # Employee model schema
├── utils/
│   └── validation.js        # Input validation functions
├── .env                     # Environment variables
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore file
├── server.js               # Main application file
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/COMP3133_StudentID_Assignment1.git
cd COMP3133_Assignment1
```

2. Install dependencies:
```bash
npm install
```

3. Set up MongoDB:
   - Make sure MongoDB is installed and running locally
   - Or use MongoDB Atlas for cloud database

## ⚙️ Configuration

1. Create a `.env` file in the root directory (use `.env.example` as template):

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/comp3133_assignment1

# Server Configuration
PORT=4000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Configuration (Optional)
JWT_SECRET=your_jwt_secret_key
```

2. Sign up for a free Cloudinary account at https://cloudinary.com/ and get your credentials

## 🏃 Running the Application

Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The server will start at: `http://localhost:4000/graphql`

## 📖 GraphQL API Documentation

### Database Schema

#### Users Collection
| Field | Type | Constraint |
|-------|------|-----------|
| _id | ObjectID | Auto-generated |
| username | String | Primary Key, Required |
| email | String | Unique, Required |
| password | String | Encrypted, Required |
| created_at | Date | Auto-generated |
| updated_at | Date | Auto-updated |

#### Employee Collection
| Field | Type | Constraint |
|-------|------|-----------|
| _id | ObjectID | Auto-generated |
| first_name | String | Required |
| last_name | String | Required |
| email | String | Unique, Required |
| gender | String | Male/Female/Other, Required |
| designation | String | Required |
| salary | Float | Required, >= 1000 |
| date_of_joining | Date | Required |
| department | String | Required |
| employee_photo | String | Cloudinary URL |
| created_at | Date | Auto-generated |
| updated_at | Date | Auto-updated |

### GraphQL Operations

#### 1. Signup Mutation (5 points)
Create a new user account.

```graphql
mutation {
  signup(input: {
    username: "john_doe"
    email: "john@example.com"
    password: "password123"
  }) {
    success
    message
    user {
      id
      username
      email
      created_at
    }
    token
  }
}
```

#### 2. Login Query (5 points)
Authenticate user login.

```graphql
query {
  login(input: {
    usernameOrEmail: "john_doe"
    password: "password123"
  }) {
    success
    message
    user {
      id
      username
      email
    }
    token
  }
}
```

#### 3. Get All Employees Query (10 points)
Retrieve list of all employees.

```graphql
query {
  getAllEmployees {
    success
    message
    employees {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
}
```

#### 4. Add New Employee Mutation (10 points)
Create a new employee with Cloudinary photo upload.

```graphql
mutation {
  addEmployee(input: {
    first_name: "Jane"
    last_name: "Smith"
    email: "jane.smith@company.com"
    gender: "Female"
    designation: "Software Engineer"
    salary: 75000
    date_of_joining: "2024-01-15"
    department: "Engineering"
    employee_photo: "data:image/jpeg;base64,/9j/4AAQ..."
  }) {
    success
    message
    employee {
      id
      first_name
      last_name
      email
      employee_photo
    }
  }
}
```

#### 5. Search Employee by ID Query (10 points)
Get employee details by employee ID.

```graphql
query {
  getEmployeeById(eid: "65abc123def456...") {
    success
    message
    employee {
      id
      first_name
      last_name
      email
      designation
      department
      salary
    }
  }
}
```

#### 6. Update Employee Mutation (10 points)
Update employee details by ID.

```graphql
mutation {
  updateEmployee(
    eid: "65abc123def456..."
    input: {
      designation: "Senior Software Engineer"
      salary: 95000
      department: "Engineering"
    }
  ) {
    success
    message
    employee {
      id
      first_name
      last_name
      designation
      salary
    }
  }
}
```

#### 7. Delete Employee Mutation (5 points)
Delete employee by ID.

```graphql
mutation {
  deleteEmployee(eid: "65abc123def456...") {
    success
    message
  }
}
```

#### 8. Search Employees by Designation/Department Query (5 points)
Search employees by designation or department.

```graphql
query {
  searchEmployees(designation: "Software Engineer") {
    success
    message
    employees {
      id
      first_name
      last_name
      designation
      department
    }
  }
}
```

Or search by department:

```graphql
query {
  searchEmployees(department: "Engineering") {
    success
    message
    employees {
      id
      first_name
      last_name
      designation
      department
    }
  }
}
```

## 🧪 Testing

### Testing with GraphiQL
1. Navigate to `http://localhost:4000/graphql`
2. Use the GraphiQL interface to test queries and mutations
3. Copy and paste the queries from the documentation above

### Testing with Postman
1. Open Postman
2. Create a new POST request to `http://localhost:4000/graphql`
3. Set the body to GraphQL
4. Enter your queries and mutations
5. Export the collection for submission

## 👤 Sample User Details

For testing the login functionality:

**Username:** test_user
**Email:** test@example.com
**Password:** test123456

To create this test user, run the signup mutation:
```graphql
mutation {
  signup(input: {
    username: "test_user"
    email: "test@example.com"
    password: "test123456"
  }) {
    success
    message
    user {
      id
      username
      email
    }
  }
}
```

## 📝 Notes

- All passwords are encrypted using bcryptjs before storing in the database
- Employee photos are uploaded to Cloudinary and the secure URL is stored in the database
- Input validation is performed on all mutations and queries
- Error messages are returned in a user-friendly format
- The database name is `comp3133_assignment1`

## 🔒 Security Features

- Password hashing with bcrypt
- Input validation and sanitization
- Error handling and meaningful error messages
- CORS enabled for cross-origin requests
- Environment variables for sensitive data

## 📚 References

- [GraphQL Documentation](https://graphql.org/learn/)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [MongoDB Mongoose Documentation](https://mongoosejs.com/docs/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## 👨‍💻 Author

Student - George Brown College
Course: COMP3133 - Full Stack Development II
Assignment: Assignment 1 (12%)

## 📅 Submission Date

Sunday, February 22nd, 2026

---

**Note:** Replace `your_cloud_name`, `your_api_key`, and `your_api_secret` with your actual Cloudinary credentials in the `.env` file before running the application.
