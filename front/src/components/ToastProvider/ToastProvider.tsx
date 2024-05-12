import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';


export default function ToastProvider() {
  return <ToastContainer autoClose={2000} />;
}
