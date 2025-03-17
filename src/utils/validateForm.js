export const validateForm = (data) => {
  const errors = [];

  // First Name validation
  if (!data.first_name.trim()) {
    errors.push({ field: 'first_name', message: 'First name is required' });
  } else if (data.first_name.length < 2) {
    errors.push({ field: 'first_name', message: 'First name must be at least 2 characters' });
  }

  // Last Name validation
  if (!data.last_name.trim()) {
    errors.push({ field: 'last_name', message: 'Last name is required' });
  } else if (data.last_name.length < 2) {
    errors.push({ field: 'last_name', message: 'Last name must be at least 2 characters' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.user_email.trim()) {
    errors.push({ field: 'user_email', message: 'Email is required' });
  } else if (!emailRegex.test(data.user_email)) {
    errors.push({ field: 'user_email', message: 'Please enter a valid email address' });
  }

  // Message validation
  if (!data.message.trim()) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (data.message.length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  }

  return errors;
};
