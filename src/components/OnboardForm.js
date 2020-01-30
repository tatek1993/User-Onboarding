import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardingForm = ({values, errors, touched, status}) => {

    const [newUsers, setNewUsers] = useState([]);
    useEffect(() => {
        console.log('status has changed', status);

        status && setNewUsers( nU => [...nU, status])
    }, [status]);

    return (
        <div className="user-form">
            <Form>
                <label htmlFor="name">
                    Name:
                </label>
                <Field 
                    id="name" 
                    type="text"
                    name="name"
                />

                <label htmlFor="email">
                    Email:
                </label>
                <Field
                    id="email"
                    type="text"
                    name="email"
                />

                <label htmlFor="password">
                    Password:
                </label>
                <Field 
                    id="password"
                    type="password"
                    name="password"
                />

                <label className="checkboxContainer" htmlFor="terms">
                    I have read and understand the Terms of Service.
                </label>
                <Field 
                    id="terms"
                    type="checkbox"
                    name="terms"
                    check={values.terms.toString()}
                />

                <button className="button" type="submit">
                    Submit!
                </button>

            </Form>
            
            {newUsers.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikOnboardingForm = withFormik({
    mapPropsToValues({
        name,
        email,
        password,
        terms
    }) 
    {
        return {
            name: "",
            email: "",
            password: "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        species: Yup.string().required("This is a custom error")
      }),
      handleSubmit(values, {setStatus}) {
        console.log("submitting", values);
        axios
        .post(
          "https://reqres.in/api/users/", 
          values
        )
        .then(res => {
          console.log('success', res)
          setStatus(res.data);
        })
        .catch(err => console.log(err.response)
        );
      }
})(OnboardingForm)
export default FormikOnboardingForm;