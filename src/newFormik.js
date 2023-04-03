import "./App.css";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
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

  });

  return (
    <Formik
      className="App"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty }) => (
        <Form>
          <div className="form-control">
            <label>Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" />
          </div>
          <div className="form-control">
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" />
          </div>
          <div className="form-control">
            <label>phone</label>
            <Field type="number" name="phoneNumber" />
            <ErrorMessage name="phoneNumber" />
          </div>
          <div className="form-control">
            <label>Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" />
          </div>
          <div className="form-control">
            <label>comments</label>
            <Field as="textarea" name="comments" />
            <ErrorMessage name="comments" />
          </div>
          <div className="form-control">
            <label>address</label>
            <Field type="text" name="address">
              {(props) => {
                console.log(props);
                const { field, form, meta } = props;
                return (
                  <div>
                    <input type="text" id="address" {...field} />
                    {meta.error && meta.touched ? (
                      <div>{meta.touched}</div>
                    ) : null}
                  </div>
                );
              }}
            </Field>
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
