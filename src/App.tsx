import "./index.css";
import SampleLetter from "./components/letterGenerator";
import DownloadButton from "./components/PDFDownloaderExtension";
import Link from "./components/Link";
import Route from "./components/Route";
import Form from "./components/Form";
import { useState } from "react";
import { FormData, SampleLetterProps } from "./components/letterGenerator";
import YourComponent from "./testfolder/formDataTest";
import { Modal } from "./components/Modal";
import EmployeesPage from "./pages/EmployeesPage";
// import { PDFViewer } from "@react-pdf/renderer";
// import MyDocument from "./components/MyDocument";

function App() {
  const pages = [
    {
      path: "/about",
      text: "About",
    },
    {
      path: "/contact",
      text: "Contact",
    },
    {
      path: "/download",
      text: "Download",
    },
    {
      path: "/Form",
      text: "Form",
    },
    {
      path: "/employees",
      text: "Employees",
    },
  ];

  return (
    <>
      <div className=" flex justify-center items-center h-screen dark:bg-gray-500 ">
        <Route path="/about">
          <Modal />
          <h1>About Page</h1>
        </Route>
        <Route path="/contact">
          <h1>Contact page</h1>
        </Route>
        <Route path="/download">
          <h1>Download page</h1>
        </Route>
        <Route path="/Form">
          <Form onSubmit={() => {}} />
        </Route>
        <Route path="/employees">
          <EmployeesPage />
        </Route>
        <Route path="/">{<Home pages={pages} />}</Route>

        {/* <PDFFile /> */}
      </div>
    </>
  );
}

interface Page {
  path: string;
  text: string;
}

interface HomeProps {
  pages: Page[];
}

const Home: React.FC<HomeProps> = ({ pages }) => {
  return (
    <div className="flex flex-wrap  gap-4 py-4 ">
      {pages.map((page) => (
        <Link
          key={page.path}
          className="flex-1 bg-gray-50 px-2 pb-6 pt-4 shrink-0 min-w-[50%] text-center p-2 border rounded shadow-md"
          to={page.path}
        >
          {page.text}
        </Link>
      ))}
    </div>
  );
};

export default App;
