import axios from 'axios';

// Utility function to handle API errors
export const handleApiError = (error: unknown, defaultMessage = 'An unexpected error occurred.') => {
  // Check if the error is an instance of AxiosError
  if (axios.isAxiosError(error)) {
    // If the error contains a message in the response (e.g., backend error message)
    if (error.response?.data?.message) {
      // Throw a new error with the specific message from the response
      throw new Error(error.response.data.message);
    }

    // If the error contains a validation "errors" field (e.g., specific field errors)
    else if (error.response?.data?.errors) {
      // Throw a custom error with both the message and validation errors
      throw {
        message: error.response.data.message || defaultMessage, // Use backend message or fallback to default message
        errors: error.response.data.errors, // Attach the field-specific errors (if any)
      };
    }
  }

  // If the error is not an Axios error or doesn’t fit the above conditions, throw a generic error
  throw new Error(defaultMessage);
};
