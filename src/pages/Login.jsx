import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PatternLock from "react-pattern-lock";
import UAParser from "ua-parser-js";
import { useAdminLoggedInMutation } from "../redux/features/admin/adminApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login = () => {
  const [adminLoggedIn, { isSuccess, isError, error, data }] =
    useAdminLoggedInMutation();
  const [path, setPath] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [newPath, setNewPath] = useState("");

  const navigate = useNavigate();

  const fetchIP = async () => {
    const res = await fetch("https://api.ipify.org");
    const data = await res.text();
    return data;
  };

  function getpath() {
    let newPathString = "";
    for (let x of path) {
      newPathString += x;
    }
    setNewPath(newPathString);
    if(path.length < 3){
      toast.error("This pattern is too short, Please try again!")
      setNewPath("")
      setPath([])
    }
  }

  const getDeviceInfo = () => {
    const parser = new UAParser();
    const result = parser.getResult();

    return {
      userAgent: navigator.userAgent,
      os: result.os.name,
      browser: result.browser.name,
      device: result.device.model || "unknown",
      os_version: result.os.version,
      browser_version: result.browser.version,
    };
  };
  const reset = () => {
    setDisabled(false);
    setPath([]);
  };

  useEffect(() => {
    localStorage.clear();
    if (isSuccess && data?.status === true) {
      localStorage.setItem("token", data.token);
     
      toast.success(data.message);
      navigate("/");
    } else if (isSuccess && data?.status !== true) {
      toast.error(data.message);
    }
  }, [isSuccess, isError, data, error
    ,navigate

  ]);


  console.log('HOST:', import.meta.env.PUBLIC_SERVER_URI)
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (data) => {
      const mydata = {
        deviceInfo: getDeviceInfo(),
        ipaddress: {
          ip: fetchIP(),
        },
        username: data.email,
        password: data.password,
        pattern: newPath,
      };

      // console.log(`datanow ${JSON.stringify(mydata)}`);

      await adminLoggedIn(mydata);
      reset();
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;
  return (
    <div className="mt-10 ">
      <div className="max-w-sm mx-auto  bg-white rounded-md shadow-md overflow-hidden text-[#010101]">
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col p-4 pb-6 gap-4"
        >
          <h2 className="text-3xl font-bold leading-tight text-blue-500 sm:text-xl lg:text-2xl ">Login to K19 Panel</h2>

          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={values.email}
            placeholder="Enter your email"
           
             className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
          />
          {errors.email && touched.email && (
            <span className="text-red-500 font-medium">{errors.email}</span>
          )}

          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={values.password}
            placeholder="Enter your password"
           className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
          />
          {errors.password && touched.password && (
            <span className="text-red-500 font-medium">{errors.password}</span>
          )}

          <PatternLock
            path={path}
            width={300}
            size={3}
            disabled={disabled}
            // onRelease={()=>setPath([])}
            onChange={(path) => {
              setPath(path)
            }}
            onFinish={() => {
              getpath();
              setDisabled(false);
            }}
            className="bg-gradient-to-r from-[#0066ff] mx-auto to-[#3a63a1]"
          />

          {/* </div> */}
          <button
            type="submit"
            className="flex items-center justify-center w-full px-4 py-3 text-xl font-semibold text-white transition-all  duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
            onClick={reset}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
