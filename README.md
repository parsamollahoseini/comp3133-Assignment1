# Employee Management System - COMP3133 Assignment 1

Backend Employee Management System built with Node.js, Express, GraphQL, and MongoDB with Cloudinary integration for photo uploads.

## Technologies Used

- Node.js, Express.js
- GraphQL with Apollo Server
- MongoDB with Mongoose
- bcryptjs for password hashing
- Cloudinary for image hosting
- dotenv for environment variables

## Installation

```bash
git clone https://github.com/parsamollahoseini/comp3133-Assignment1.git
cd COMP3133_Assignment1
npm install
```

## Configuration

Create a `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/comp3133_assignment1
PORT=4000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Running the Application

```bash
npm start
```

Server will be available at: `http://localhost:4000/`

## Database Schema

### Users Collection
- username (String, Primary Key, Required)
- email (String, Unique, Required)
- password (String, Encrypted, Required)
- created_at, updated_at (Date)

### Employee Collection
- first_name, last_name (String, Required)
- email (String, Unique, Required)
- gender (Male/Female/Other, Required)
- designation (String, Required)
- salary (Float, Required, >= 1000)
- date_of_joining (Date, Required)
- department (String, Required)
- employee_photo (String, Cloudinary URL)
- created_at, updated_at (Date)

## GraphQL Operations

### 1. Signup Mutation
```graphql
mutation {
  signup(input: {
    username: "john_doe"
    email: "john@example.com"
    password: "password123"
  }) {
    success
    message
    user { id username email }
  }
}
```

### 2. Login Query
```graphql
query {
  login(input: {
    usernameOrEmail: "john_doe"
    password: "password123"
  }) {
    success
    message
    user { id username email }
  }
}
```

### 3. Get All Employees
```graphql
query {
  getAllEmployees {
    success
    message
    employees {
      id first_name last_name email designation salary department
    }
  }
}
```

### 4. Add Employee
```graphql
mutation {
  addEmployee(input: {
    first_name: "Jane"
    last_name: "Smith"
    email: "jane@company.com"
    gender: "Female"
    designation: "Software Engineer"
    salary: 75000
    date_of_joining: "2024-01-15"
    department: "Engineering"
    employee_photo: "https://cloudinary.com/image.jpg"
  }) {
    success
    message
    employee { id first_name last_name }
  }
}
```

### 5. Get Employee by ID
```graphql
query {
  getEmployeeById(eid: "EMPLOYEE_ID") {
    success
    message
    employee { id first_name last_name designation salary }
  }
}
```

### 6. Update Employee
```graphql
mutation {
  updateEmployee(eid: "EMPLOYEE_ID", input: {
    designation: "Senior Engineer"
    salary: 95000
  }) {
    success
    message
    employee { id first_name last_name designation salary }
  }
}
```

### 7. Delete Employee
```graphql
mutation {
  deleteEmployee(eid: "EMPLOYEE_ID") {
    success
    message
  }
}
```

### 8. Search by Designation/Department
```graphql
query {
  searchEmployees(designation: "Software Engineer") {
    success
    message
    employees { id first_name last_name designation department }
  }
}
```

## Testing

Use GraphiQL at `http://localhost:4000/` or import the Postman collection included in the project.

## Author

George Brown College - COMP3133 Full Stack Development II
