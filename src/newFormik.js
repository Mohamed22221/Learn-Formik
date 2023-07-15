import "./App.css";
import { Form, Formik, Field, ErrorMessage, FieldArray } from "formik";
import { object, string } from "yup";
import TextError from "./components/TextError";
function NewFormik() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    comments: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    numbers: ["", ""],
    phNumbers: [""],
  };

  const onSubmit = (data, actions) => {
    console.log(data);
    actions.resetForm({ data: "" });
  };
  const validationSchema = object().shape({
    name: string()
      .required("required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    email: string().email("Invalid email").required("required"),
    password: string().required("required"),

    phoneNumber: string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required")
      .optional(),
    comments: string().required("required"),
    address: string().required("required"),
    social: object({
      facebook: string().required("required"),
      twitter: string().required("required"),
    }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty }) => (
        <Form className="wrapper-style">
          <h2>Create Form (docs) </h2>
          <div className="form-control">
            <label>Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component={TextError} />
          </div>
          <div className="form-control">
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email">
              {(error) => {
                return <TextError>{error}</TextError>;
              }}
            </ErrorMessage>
          </div>
          <div className="form-control">
            <label>phone</label>
            <Field type="number" name="phoneNumber" />
            <ErrorMessage name="phoneNumber" component={TextError} />
          </div>
          <div className="form-control">
            <label>number one</label>
            <Field type="number" name="numbers[0]" />
            <ErrorMessage name="numbers[0]" component={TextError} />
          </div>
          <div className="form-control">
            <label>number two</label>
            <Field type="number" name="numbers[1]" />
            <ErrorMessage name="numbers[1]" component={TextError} />
          </div>
          <div className="form-control">
            <label>List of phone numbers</label>
            <FieldArray name="phNumbers">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { phNumbers } = values;
                // console.log('fieldArrayProps', fieldArrayProps)
                // console.log('Form errors', form.errors)
                return (
                  <div>
                    {phNumbers.map((_, index) => (
                      <div key={index}>
                        <Field name={`phNumbers[${index}]`} />
                        <ErrorMessage
                          name={`phNumbers[${index}]`}
                          component={TextError}
                        />
                        {index > 0 && (
                          <button type="button" onClick={() => remove(index)}>
                            -
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => push("")}>
                      +
                    </button>
                  </div>
                );
              }}
            </FieldArray>
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component={TextError} />
          </div>
          <div className="form-control">
            <label htmlFor="comments">comments</label>
            <Field as="textarea" name="comments" />
            <ErrorMessage name="comments" component={TextError} />
          </div>
          <div className="form-control">
            <label htmlFor="address">address</label>
            <Field type="text" name="address">
              {(props) => {
                console.log(props);
                const { field, form, meta } = props;
                return (
                  <div>
                    <input type="text" id="address" {...field} />
                    {meta.error && meta.touched ? (
                      <TextError>{meta.error}</TextError>
                    ) : null}
                  </div>
                );
              }}
            </Field>
          </div>
          <div className="form-control">
            <label htmlFor="facebook">facebook</label>
            <Field as="textarea" name="social.facebook" />
            <ErrorMessage name="social.facebook" component={TextError} />
          </div>
          <div className="form-control">
            <label htmlFor="twitter">twitter</label>
            <Field as="textarea" name="social.twitter" />
            <ErrorMessage name="social.twitter" component={TextError} />
          </div>
          <button type="submit" disabled={!(dirty && isValid)}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default NewFormik;
