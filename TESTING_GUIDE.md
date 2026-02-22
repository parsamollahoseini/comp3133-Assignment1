# Testing Guide - Employee Management System

Use these GraphQL queries and mutations to test all API endpoints in GraphiQL or Postman.

## 1. Signup Mutation (5 points)

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
      created_at
    }
    token
  }
}
```

## 2. Login Query (5 points)

```graphql
query {
  login(input: {
    usernameOrEmail: "test_user"
    password: "test123456"
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

## 3. Get All Employees Query (10 points)

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

## 4. Add New Employee Mutation (10 points)

**Example 1: With photo URL**
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
    employee_photo: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
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

**Example 2: Multiple employees to add**
```graphql
mutation {
  addEmployee(input: {
    first_name: "John"
    last_name: "Doe"
    email: "john.doe@company.com"
    gender: "Male"
    designation: "Senior Developer"
    salary: 95000
    date_of_joining: "2023-06-01"
    department: "Engineering"
    employee_photo: "https://randomuser.me/api/portraits/men/1.jpg"
  }) {
    success
    message
    employee {
      id
      first_name
      last_name
    }
  }
}
```

```graphql
mutation {
  addEmployee(input: {
    first_name: "Sarah"
    last_name: "Johnson"
    email: "sarah.j@company.com"
    gender: "Female"
    designation: "Product Manager"
    salary: 85000
    date_of_joining: "2024-02-01"
    department: "Product"
  }) {
    success
    message
    employee {
      id
      first_name
      last_name
    }
  }
}
```

## 5. Search Employee by ID Query (10 points)

**Note:** Replace `EMPLOYEE_ID_HERE` with actual ID from step 4

```graphql
query {
  getEmployeeById(eid: "EMPLOYEE_ID_HERE") {
    success
    message
    employee {
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

## 6. Update Employee Mutation (10 points)

**Note:** Replace `EMPLOYEE_ID_HERE` with actual ID

```graphql
mutation {
  updateEmployee(
    eid: "EMPLOYEE_ID_HERE"
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
      department
      updated_at
    }
  }
}
```

## 7. Delete Employee Mutation (5 points)

**Note:** Replace `EMPLOYEE_ID_HERE` with actual ID

```graphql
mutation {
  deleteEmployee(eid: "EMPLOYEE_ID_HERE") {
    success
    message
  }
}
```

## 8. Search by Designation Query (5 points)

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
      salary
    }
  }
}
```

**Search by Department:**
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
      salary
    }
  }
}
```

## Testing Order

1. **Create User** - Run Signup mutation
2. **Login** - Run Login query to verify authentication
3. **Add Employees** - Create 3-5 employees with different departments and designations
4. **Get All Employees** - Verify all employees are created
5. **Get Employee by ID** - Test with one of the employee IDs
6. **Search by Designation** - Test searching for "Software Engineer"
7. **Search by Department** - Test searching for "Engineering"
8. **Update Employee** - Update one employee's details
9. **Delete Employee** - Delete one employee
10. **Get All Employees Again** - Verify the employee was deleted

## Error Testing

Test these scenarios to verify error handling:

### Invalid Signup
```graphql
mutation {
  signup(input: {
    username: "test"
    email: "invalid-email"
    password: "123"
  }) {
    success
    message
  }
}
```

### Invalid Login
```graphql
query {
  login(input: {
    usernameOrEmail: "wronguser"
    password: "wrongpass"
  }) {
    success
    message
  }
}
```

### Invalid Employee Data
```graphql
mutation {
  addEmployee(input: {
    first_name: "Test"
    last_name: "User"
    email: "test@test.com"
    gender: "Male"
    designation: "Developer"
    salary: 500
    date_of_joining: "2024-01-01"
    department: "IT"
  }) {
    success
    message
  }
}
```
Expected: Error because salary is less than 1000

## Screenshots to Capture

For your submission, capture screenshots of:
1. ✅ Signup mutation success
2. ✅ Login query success
3. ✅ Get all employees
4. ✅ Add employee success
5. ✅ Get employee by ID
6. ✅ Update employee
7. ✅ Delete employee
8. ✅ Search by designation
9. ✅ Search by department
10. ✅ MongoDB Atlas showing collections and data

## Sample User Credentials

**Username:** test_user
**Email:** test@example.com
**Password:** test123456
