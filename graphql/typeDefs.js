const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
    created_at: String!
    updated_at: String!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
    created_at: String!
    updated_at: String!
  }

  type AuthPayload {
    success: Boolean!
    message: String!
    user: User
    token: String
  }

  type EmployeeResponse {
    success: Boolean!
    message: String!
    employee: Employee
  }

  type EmployeesResponse {
    success: Boolean!
    message: String!
    employees: [Employee]
  }

  type DeleteResponse {
    success: Boolean!
    message: String!
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    usernameOrEmail: String!
    password: String!
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
  }

  input UpdateEmployeeInput {
    first_name: String
    last_name: String
    email: String
    gender: String
    designation: String
    salary: Float
    date_of_joining: String
    department: String
    employee_photo: String
  }

  type Query {
    login(input: LoginInput!): AuthPayload!
    getAllEmployees: EmployeesResponse!
    getEmployeeById(eid: ID!): EmployeeResponse!
    searchEmployees(designation: String, department: String): EmployeesResponse!
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload!
    addEmployee(input: EmployeeInput!): EmployeeResponse!
    updateEmployee(eid: ID!, input: UpdateEmployeeInput!): EmployeeResponse!
    deleteEmployee(eid: ID!): DeleteResponse!
  }
`;

module.exports = typeDefs;
