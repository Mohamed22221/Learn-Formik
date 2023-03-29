import logo from "./logo.svg";
import "./App.css";
import { useFormik, yupToFormErrors } from "formik";
import { object, string  } from 'yup';
function App() {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phoneNumber : ""
  };
  const onSubmit = (data) => {
    console.log(data);
  };
  const validationSchema = object().shape({
    name: string().required("required").min(2, 'Too Short!').max(50, "Too Long!"),
    email:string().email("Invalid email").required("required"),
    password: string().required("required"),
    phoneNumber: string().matches(phoneRegExp, 'Phone number is not valid').required("required").optional()
  })

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,

  });
  console.log(formik.isValid, "formik touch");

  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label>Name</label>
          <input
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label>phone</label>
          <input
            name="phoneNumber"
            type="number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="error">{formik.errors.phoneNumber}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit"   disabled={!(formik.dirty && formik.isValid)}>Send</button>
      </form>
    </div>
  );
}

export default App;
