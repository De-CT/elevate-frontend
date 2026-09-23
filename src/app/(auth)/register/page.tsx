"use client"
import { createAccount } from "@/backend/auth"
import { CustomButton, CustomInput } from "@/components"
import { Form, Formik } from "formik"
import * as Yup from 'yup'

const registerValidationSchema = Yup.object({
    firstName: Yup.string().required('Enter your full name'),
    lastName: Yup.string().required('Enter your full name'),
    email: Yup.string().required('Enter your full name'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Enter your full name'),
    confirmPassword: Yup.string().required('Enter your full name'),
})

const Register = () => {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: "",
        confirmPassword: ""
    }

    const handleSubmit = async (data: typeof initialValues) => {
        try {
            const rest = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                password: data.password,
            }
            await createAccount(rest)
        } catch {
        }
    }
    return (
        <div className="">
            <div className="">
                <h1>Create Your Account</h1>
                <p>Enter your details to join Elevate Heart Foundation</p>
                <Formik initialValues={initialValues} validationSchema={registerValidationSchema} onSubmit={handleSubmit}>
                    {({ handleSubmit, handleChange, values }) => (

                        <Form>
                            <CustomInput label="First Name" placeholder="e.g Jane Doe" required onChange={handleChange("firstName")} value={values.firstName} />
                            <CustomInput label="Last Name" placeholder="e.g Jane Doe" required onChange={handleChange("lastName")} value={values.lastName} />
                            <CustomInput label="Email" placeholder="e.g Jane Doe" required onChange={handleChange("email")} value={values.email} />
                            <CustomInput label="Phone Number" placeholder="e.g Jane Doe" required onChange={handleChange("phone")} value={values.phone} />
                            <CustomInput label="Create a PIN" placeholder="******" required type="password" onChange={handleChange("password")} value={values.password} />
                            <CustomInput label="Enter PIN again " placeholder="******" required type="password" onChange={handleChange("confirmPassword")} value={values.confirmPassword} />
                            <CustomButton text="Sign Up" onClick={handleSubmit} />
                        </Form>
                    )}


                </Formik>

            </div>
        </div>
    )
}

export default Register