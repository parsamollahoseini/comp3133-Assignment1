// Validation helper functions

const validateEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

const validateSignup = (input) => {
  const errors = [];

  if (!input.username || input.username.trim().length === 0) {
    errors.push('Username is required');
  }

  if (!input.email || input.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!validateEmail(input.email)) {
    errors.push('Invalid email format');
  }

  if (!input.password || input.password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  return errors;
};

const validateLogin = (input) => {
  const errors = [];

  if (!input.usernameOrEmail || input.usernameOrEmail.trim().length === 0) {
    errors.push('Username or email is required');
  }

  if (!input.password || input.password.trim().length === 0) {
    errors.push('Password is required');
  }

  return errors;
};

const validateEmployee = (input) => {
  const errors = [];

  if (!input.first_name || input.first_name.trim().length === 0) {
    errors.push('First name is required');
  }

  if (!input.last_name || input.last_name.trim().length === 0) {
    errors.push('Last name is required');
  }

  if (!input.email || input.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!validateEmail(input.email)) {
    errors.push('Invalid email format');
  }

  if (!input.gender) {
    errors.push('Gender is required');
  } else if (!['Male', 'Female', 'Other'].includes(input.gender)) {
    errors.push('Gender must be Male, Female, or Other');
  }

  if (!input.designation || input.designation.trim().length === 0) {
    errors.push('Designation is required');
  }

  if (input.salary === undefined || input.salary === null) {
    errors.push('Salary is required');
  } else if (input.salary < 1000) {
    errors.push('Salary must be at least 1000');
  }

  if (!input.date_of_joining) {
    errors.push('Date of joining is required');
  }

  if (!input.department || input.department.trim().length === 0) {
    errors.push('Department is required');
  }

  return errors;
};

module.exports = {
  validateSignup,
  validateLogin,
  validateEmployee
};
