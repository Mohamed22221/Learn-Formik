import logo from "./logo.svg";
import "./App.css";
import { useFormik } from "formik";

function App() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit : (data) =>{
      console.log(data)
    }
  });

  console.log(formik);
  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit}>
        <label>Name</label>
        <input
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
