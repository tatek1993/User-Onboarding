import React, { useState, uesEffect, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardingForm = ({values, errors, touched, status}) => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log('status has changed', status);
        status && setUsers( users => [...users, status])
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
                    type="text"
                    name="password"
                />

                <label className="checkboxContainer" htmlFor="terms">
                    I have read and understand the Terms of Service.
                </label>
                <Field 
                    id="terms"
                    type="checkbox"
                    name="terms"
                />

                <button className="button" type="submit">
                    Submit
                </button>

                
            </Form>
        </div>
    )
}