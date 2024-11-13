import { useFormik } from "formik"
import * as Yup from "yup"

const initialValues = {
    description: "",
    picturePath: "",
}
const validationSchema = Yup.object().shape({ 
    description: Yup.string().required("Required"),
    picturePath: Yup.string().required("Required"),
})



const useAddPost = () => {

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

export default useAddPost;