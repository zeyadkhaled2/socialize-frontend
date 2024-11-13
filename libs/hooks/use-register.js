import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Define initial form values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "", // Set default value as null for file input
};

// Define validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  occupation: Yup.string().required("Required"),
  picture: Yup.string().required("Required"), // For file input validation
});

// Function to handle form data
const handleFormData = (values) => {
  const formData = new FormData();
  formData.append("firstName", values.firstName);
  formData.append("lastName", values.lastName);
  formData.append("email", values.email);
  formData.append("password", values.password);
  formData.append("location", values.location);
  formData.append("occupation", values.occupation);
  formData.append("picture", values.picture);
  // Ensure picture is a file if available
  if (values.picture instanceof File) {
    formData.append("picture", values.picture);
  }

  return formData;
};

// Component function
const useRegister = () => {
  // Form submission function
  const registerUser = async (values, actions) => {
    const formData = handleFormData(values);

    try {
      await axios.post("http://localhost:3001/auth/register", formData);
    } catch (error) {
      console.error("Registration error:", error);
      actions.setSubmitting(false);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
    isSubmitting,
    setErrors,
    resetForm,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: registerUser,
  });

  return {
    values,
    handleSubmit,
    handleChange,
    setFieldValue,
    setValues,
    errors,
    isSubmitting,
  };
};

export default useRegister;
