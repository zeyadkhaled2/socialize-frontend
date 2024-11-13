
import { useFormik } from 'formik'
import * as yup from 'yup'
// import useGlobalContext from '@/store'

const initialValues = {
    email: "",
    password: "",
};
const validationSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});


const useLogin = () => {

    const {
        values,
        handleChange,
        setFieldValue,
        errors,
        isSubmitting,
        setValues,
    } = useFormik({
        initialValues,
        validationSchema,
    });

    return {
        values,
        handleChange,
        setFieldValue,
        setValues,
        errors,
        isSubmitting,
    }

}

export default useLogin