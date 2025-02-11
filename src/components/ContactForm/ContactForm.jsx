import { useState } from "react";

// material-ui
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";

// third party
import { Formik } from "formik";
import * as Yup from "yup";

import useSendContact from "../../hooks/useSendContact";

import { stylesMui } from "./styles";
import { toast } from "react-toastify";

const CustomUncheckedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="14"
    viewBox="0 0 13 14"
    fill="none"
  >
    <g clipPath="url(#clip0_307_25063)">
      <path
        d="M0.5 7.37037C0.5 5.74422 1.13433 4.18647 2.26059 3.03936C3.38654 1.89255 4.91169 1.25 6.5 1.25C8.08831 1.25 9.61346 1.89255 10.7394 3.03936C11.8657 4.18647 12.5 5.74422 12.5 7.37037C12.5 8.99652 11.8657 10.5543 10.7394 11.7014C9.61346 12.8482 8.08831 13.4907 6.5 13.4907C4.91169 13.4907 3.38654 12.8482 2.26059 11.7014C1.13433 10.5543 0.5 8.99652 0.5 7.37037Z"
        stroke="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_307_25063">
        <rect
          width="13"
          height="13.2407"
          fill="white"
          transform="translate(0 0.75)"
        />
      </clipPath>
    </defs>
  </svg>
);

const CustomCheckedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="14"
    viewBox="0 0 13 14"
    fill="none"
  >
    <g clipPath="url(#clip0_307_25059)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 7.37037C0 5.61454 0.684819 3.93062 1.90381 2.68906C3.12279 1.4475 4.77609 0.75 6.5 0.75C8.22391 0.75 9.87721 1.4475 11.0962 2.68906C12.3152 3.93062 13 5.61454 13 7.37037C13 9.1262 12.3152 10.8101 11.0962 12.0517C9.87721 13.2932 8.22391 13.9907 6.5 13.9907C4.77609 13.9907 3.12279 13.2932 1.90381 12.0517C0.684819 10.8101 0 9.1262 0 7.37037H0ZM6.12907 10.2039L9.87133 5.43899L9.19533 4.88817L6.00427 8.94955L3.744 7.03141L3.18933 7.70933L6.12907 10.2048V10.2039Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_307_25059">
        <rect
          width="13"
          height="13.2407"
          fill="white"
          transform="translate(0 0.75)"
        />
      </clipPath>
    </defs>
  </svg>
);

const ContactForm = () => {
  const [checkedSubject, setCheckedSubject] = useState();
  const { mutate: sendMessage, isLoading } = useSendContact();

  return (
    <>
      <section className="w-full">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            message: null,
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            phoneNumber: Yup.string().required("phoneNumber is required"),
            message: Yup.string().required("Message is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            values.subject = checkedSubject;
            try {
              await sendMessage(values, {
                onSuccess: (res) => {
                  toast.success("Message sent successfully");
                },
                onError: (error) => {
                  setStatus({ success: false });
                  setErrors({
                    submit: error.response?.data?.message || "Login failed",
                  });
                },
                onSettled: () => {
                  setSubmitting(false);
                },
              });
            } catch (err) {
              console.error(err);
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <div className="flex flex-col w-full" id="form">
                <div className="gap-4 flex flex-col" id="input-fields">
                  <div className="flex flex-col md:flex-row gap-[2.44rem] md:gap-8 items-end">
                    <FormControl
                      fullWidth
                      error={Boolean(touched.firstName && errors.firstName)}
                    >
                      <Typography sx={stylesMui.inputLabel}>
                        First Name
                      </Typography>
                      <TextField
                        id="outlined-adornment-firstName-register"
                        value={values.firstName}
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Enter Your First Name"
                        inputProps={{
                          style: {
                            height: "1rem",
                          },
                        }}
                        sx={stylesMui.inputTextField}
                      />
                      {touched.firstName && errors.firstName && (
                        <FormHelperText
                          error
                          id="outlined-weight-helper-text--register"
                        >
                          {errors.firstName}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl
                      fullWidth
                      error={Boolean(touched.lastName && errors.lastName)}
                    >
                      <Typography sx={stylesMui.inputLabel}>
                        Last Name
                      </Typography>
                      <TextField
                        id="outlined-adornment-lastName-register"
                        value={values.lastName}
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Enter Your Last Name"
                        inputProps={{
                          style: {
                            height: "1rem",
                          },
                        }}
                        sx={stylesMui.inputTextField}
                      />
                      {touched.lastName && errors.lastName && (
                        <FormHelperText
                          error
                          id="outlined-weight-helper-text--register"
                        >
                          {errors.lastName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>

                  <div className="flex flex-col md:flex-row gap-[2.44rem] md:gap-8 items-end mt-4 xl:mt-6">
                    <FormControl
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                    >
                      <Typography sx={stylesMui.inputLabel}>Email</Typography>
                      <TextField
                        id="outlined-adornment-email-register"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Enter Your Email"
                        inputProps={{
                          style: {
                            height: "1rem",
                          },
                        }}
                        sx={stylesMui.inputTextField}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText
                          error
                          id="outlined-weight-helper-text--register"
                        >
                          {errors.email}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl
                      fullWidth
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    >
                      <Typography sx={stylesMui.inputLabel}>
                        phoneNumber Number
                      </Typography>
                      <TextField
                        id="outlined-adornment-phoneNumber-register"
                        value={values.phoneNumber}
                        name="phoneNumber"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Enter Your Number with country code"
                        inputProps={{
                          style: {
                            height: "1rem",
                          },
                        }}
                        sx={stylesMui.inputTextField}
                      />
                      {touched.phoneNumber && errors.phoneNumber && (
                        <FormHelperText
                          error
                          id="outlined-weight-helper-text--register"
                        >
                          {errors.phoneNumber}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                </div>
                <div className="mb-1 mt-4 xl:mt-6 gap-4" id="checkboxes">
                  <Typography sx={stylesMui.checkboxHeading}>
                    Select Subject?
                  </Typography>
                  <div className="mt-4 flex flex-wrap lg:flex-nowrap justify-between">
                    {[
                      "Demo/Live Account",
                      "Problem with my order",
                      "Withdrawals",
                      "Others",
                    ].map((subject) => (
                      <FormControlLabel
                        key={subject}
                        control={
                          <Checkbox
                            checked={checkedSubject === subject} // Défini comme contrôlé
                            onChange={() => setCheckedSubject(subject)} // Met à jour l'état
                            name="checkedSubject"
                            icon={<CustomUncheckedIcon />}
                            checkedIcon={<CustomCheckedIcon />}
                          />
                        }
                        label={
                          <Typography sx={stylesMui.checkboxText}>
                            {subject}
                          </Typography>
                        }
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-4 xl:mt-6" id="message">
                  <FormControl
                    fullWidth
                    error={Boolean(touched.message && errors.message)}
                  >
                    <Typography sx={stylesMui.inputLabel}>Message</Typography>
                    <TextField
                      id="outlined-adornment-message-register"
                      value={values.message}
                      name="message"
                      multiline={true}
                      minRows={5}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      variant="outlined"
                      placeholder="Write Your Message"
                    />
                    {touched.message && errors.message && (
                      <FormHelperText
                        error
                        id="outlined-weight-helper-text--register"
                      >
                        {errors.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className="flex w-full justify-end mt-4 md:mt-6">
                  <Button type="submit" sx={stylesMui.sendButton}>
                    <Typography sx={stylesMui.sendButtonText}>
                      Send Message
                    </Typography>
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default ContactForm;
