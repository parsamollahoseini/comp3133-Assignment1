const User = require('../models/User');
const Employee = require('../models/Employee');
const { validateSignup, validateLogin, validateEmployee } = require('../utils/validation');
const cloudinary = require('../config/cloudinary');

const resolvers = {
  Query: {
    // Login Query - Allow user to access the system (5 points)
    login: async (_, { input }) => {
      try {
        // Validate input
        const errors = validateLogin(input);
        if (errors.length > 0) {
          return {
            success: false,
            message: errors.join(', '),
            user: null,
            token: null
          };
        }

        const { usernameOrEmail, password } = input;

        // Find user by username or email
        const user = await User.findOne({
          $or: [
            { username: usernameOrEmail },
            { email: usernameOrEmail }
          ]
        });

        if (!user) {
          return {
            success: false,
            message: 'Invalid credentials',
            user: null,
            token: null
          };
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
          return {
            success: false,
            message: 'Invalid credentials',
            user: null,
            token: null
          };
        }

        return {
          success: true,
          message: 'Login successful',
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
          },
          token: 'sample-jwt-token' // In production, use actual JWT
        };
      } catch (error) {
        return {
          success: false,
          message: `Error: ${error.message}`,
          user: null,
          token: null
        };
      }
    },

    // Get all employees Query - User can get all employee list (10 points)
    getAllEmployees: async () => {
      try {
        const employees = await Employee.find().sort({ created_at: -1 });

        return {
          success: true,
          message: `Successfully retrieved ${employees.length} employees`,
          employees: employees.map(emp => ({
            id: emp._id,
            first_name: emp.first_name,
            last_name: emp.last_name,
            email: emp.email,
            gender: emp.gender,
            designation: emp.designation,
            salary: emp.salary,
            date_of_joining: emp.date_of_joining.toISOString(),
            department: emp.department,
            employee_photo: emp.employee_photo,
            created_at: emp.created_at,
            updated_at: emp.updated_at
          }))
        };
      } catch (error) {
        return {
          success: false,
          message: `Error: ${error.message}`,
          employees: []
        };
      }
    },

    // Search employee by eid Query - User can get employee details by employee id (10 points)
    getEmployeeById: async (_, { eid }) => {
      try {
        const employee = await Employee.findById(eid);

        if (!employee) {
          return {
            success: false,
            message: 'Employee not found',
            employee: null
          };
        }

        return {
          success: true,
          message: 'Employee found successfully',
          employee: {
            id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            gender: employee.gender,
            designation: employee.designation,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining.toISOString(),
            department: employee.department,
            employee_photo: employee.employee_photo,
            created_at: employee.created_at,
            updated_at: employee.updated_at
          }
        };
      } catch (error) {
        return {
          success: false,
          message: `Error: ${error.message}`,
          employee: null
        };
      }
    },

    // Search Employee by designation or department Query (5 points)
    searchEmployees: async (_, { designation, department }) => {
      try {
        if (!designation && !department) {
          return {
            success: false,
            message: 'Please provide either designation or department',
            employees: []
          };
        }

        const query = {};
        if (designation) query.designation = new RegExp(designation, 'i');
        if (department) query.department = new RegExp(department, 'i');

        const employees = await Employee.find(query).sort({ created_at: -1 });

        return {
          success: true,
          message: `Found ${employees.length} employees`,
          employees: employees.map(emp => ({
            id: emp._id,
            first_name: emp.first_name,
            last_name: emp.last_name,
            email: emp.email,
            gender: emp.gender,
            designation: emp.designation,
            salary: emp.salary,
            date_of_joining: emp.date_of_joining.toISOString(),
            department: emp.department,
            employee_photo: emp.employee_photo,
            created_at: emp.created_at,
            updated_at: emp.updated_at
          }))
        };
      } catch (error) {
        return {
          success: false,
          message: `Error: ${error.message}`,
          employees: []
        };
      }
    }
  },

  Mutation: {
    // Signup Mutation - Allow user to create new account (5 points)
    signup: async (_, { input }) => {
      try {
        // Validate input
        const errors = validateSignup(input);
        if (errors.length > 0) {
          return {
            success: false,
            message: errors.join(', '),
            user: null,
            token: null
          };
        }

        const { username, email, password } = input;

        // Check if user already exists
        const existingUser = await User.findOne({
          $or: [{ username }, { email }]
        });

        if (existingUser) {
          return {
            success: false,
            message: 'Username or email already exists',
            user: null,
            token: null
          };
        }

        // Create new user
        const user = new User({
          username,
          email,
          password
        });

        await user.save();

        return {
          success: true,
          message: 'User created successfully',
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
          },
          token: 'sample-jwt-token' // In production, use actual JWT
        };
      } catch (error) {
        return {
          success: false,
          message: `Error: ${error.message}`,
          user: null,
          token: null
        };
      }
    },

    // Add New employee Mutation - User can create new employee (10 points)
    // Store employee profile picture on https://cloudinary.com/
    addEmployee: async (_, { input }) => {
      try {
        // Validate input
        const errors = validateEmployee(input);
        if (errors.length > 0) {
          return {
            success: false,
            message: errors.join(', '),
            employee: null
          };
        }

        // Check if email already exists
        const existingEmployee = await Employee.findOne({ email: input.email });
        if (existingEmployee) {
          return {
            success: false,
            message: 'Employee with this email already exists',
            employee: null
          };
        }

        // Handle Cloudinary upload if employee_photo is provided
        let photoUrl = input.employee_photo || '';

        // If employee_photo is a base64 string or URL, upload to Cloudinary
        if (input.employee_photo && input.employee_photo.startsWith('data:image')) {
          try {
            const uploadResult = await cloudinary.uploader.upload(input.employee_photo, {
              folder: 'employees',
              resource_type: 'image'
            });
            photoUrl = uploadResult.secure_url;
          } catch (uploadError) {
            console.log('Cloudinary upload error:', uploadError.message);
            // Continue with provided URL if Cloudinary upload fails
          }
        }

        // Create new employee
        const employee = new Employee({
          ...input,
          employee_photo: photoUrl
        });

        await employee.save();

        return {
          success: true,
          message: 'Employee created successfully',
          employee: {
            id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            gender: employee.gender,
            designation: employee.designation,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining.toISOString(),
            department: employee.department,
            employee_photo: employee.employee_photo,
            created_at: employee.created_at,
            updated_at: employee.updated_at
          }
        };
      } catch (error) {
        return {
          success: false,
          message: `Error: ${error.message}`,
          employee: null
        };
      }
    },

    // Update employee by eid Mutation - User can update employee details (10 points)
    updateEmployee: async (_, { eid, input }) => {
      try {
        // Validate salary if provided
        if (input.salary !== undefined && input.salary < 1000) {
          return {
            success: false,
            message: 'Salary must be at least 1000',
            employee: null
          };
        }

        // Validate gender if provided
        if (input.gender && !['Male', 'Female', 'Other'].includes(input.gender)) {
          return {
            success: false,
            message: 'Gender must be Male, Female, or Other',
            employee: null
          };
        }

        // Handle Cloudinary upload if employee_photo is provided
        if (input.employee_photo && input.employee_photo.startsWith('data:image')) {
          try {
            const uploadResult = await cloudinary.uploader.upload(input.employee_photo, {
              folder: 'employees',
              resource_type: 'image'
            });
            input.employee_photo = uploadResult.secure_url;
          } catch (uploadError) {
            console.log('Cloudinary upload error:', uploadError.message);
          }
        }

        const employee = await Employee.findByIdAndUpdate(
          eid,
          { $set: input },
          { new: true, runValidators: true }
        );

        if (!employee) {
          return {
            success: false,
            message: 'Employee not found',
            employee: null
          };
        }

        return {
          success: true,
          message: 'Employee updated successfully',
          employee: {
            id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            gender: employee.gender,
            designation: employee.designation,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining.toISOString(),
            department: employee.department,
            employee_photo: employee.employee_photo,
            created_at: employee.created_at,
            updated_at: employee.updated_at
          }
        };
      } catch (error) {
        return {
          success: false,
          message: `Error: ${error.message}`,
          employee: null
        };
      }
    },

    // Delete employee by eid Mutation - User can delete employee (5 points)
    deleteEmployee: async (_, { eid }) => {
      try {
        const employee = await Employee.findByIdAndDelete(eid);

        if (!employee) {
          return {
            success: false,
            message: 'Employee not found'
          };
        }

        // Optionally delete photo from Cloudinary
        if (employee.employee_photo && employee.employee_photo.includes('cloudinary')) {
          try {
            const publicId = employee.employee_photo.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicId);
          } catch (deleteError) {
            console.log('Cloudinary delete error:', deleteError.message);
          }
        }

        return {
          success: true,
          message: 'Employee deleted successfully'
        };
      } catch (error) {
        return {
          success: false,
          message: `Error: ${error.message}`
        };
      }
    }
  }
};

module.exports = resolvers;
