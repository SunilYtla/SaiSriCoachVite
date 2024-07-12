import React, { useState, useEffect } from "react";
import DownloadButton from "./PDFDownloaderExtension";
import SampleLetter from "./letterGenerator";
import { FormData } from "../store/useForm";
import { useFormStore } from "../store/useForm";
import { Modal } from "./Modal";

interface FormProps {
  onSubmit: (formData: FormData) => void;
}

type fieldId = "recipientAddress" | "subject" | "bodytext";

const useAutoResize = (fieldId: fieldId, formData: FormData) => {
  useEffect(() => {
    const textarea = document.getElementById(fieldId);
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formData[fieldId]]);
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  // const setFormDatainStore = useFormStore((state) => state.setFormData);
  const { formData, setFormData } = useFormStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  // const [formData, setFormData] = useState<FormData>({
  //   date: null,
  //   quotationnumber: null,
  //   totalamount: null,
  //   subject: null,
  //   recipientAddress: null,
  //   bodytext: null,
  //   recipientName: null,
  //   sender: null,
  // });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useAutoResize("recipientAddress", formData);
  useAutoResize("bodytext", formData);
  useAutoResize("subject", formData);

  const handleSubmit = () => {
    setFormSubmitted(true);
    onSubmit(formData);
  };

  const mapper: FormData = {
    date: "date",
    quotationnumber: "number",
    totalamount: "number",
    subject: "string",
    recipientAddress: "string",
    bodytext: "string",
    recipientName: "string",
    sender: "string",
    letterhead: "string",
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md h-screen w-full">
        {Object.entries(formData).map(([key, value]) =>
          value !== null ? (
            <div key={key} className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="date">
                {key}:
              </label>
              <input
                type={mapper[key] ?? "string"}
                id={key}
                name={key}
                value={value ?? ""}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
              {key === "totalamount" && (
                <p className="text-2xl font-bold">
                  Total Price in Rupees:{" "}
                  {formatAsRupees(formData.totalamount ?? "")}
                </p>
              )}
            </div>
          ) : null
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
        {formSubmitted ? (
          <DownloadButton document={<SampleLetter data={formData} />} />
        ) : null}
        <Modal />
      </div>
    </div>
  );
};

function formatAsRupees(input: string): string {
  if (input != null && input != undefined && input != "") {
    const currencySymbol = "₹";
    //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!
    const result = input.split(".");

    let lastThree = result[0].substring(result[0].length - 3);
    const otherNumbers = result[0].substring(0, result[0].length - 3);
    if (otherNumbers != "") lastThree = "," + lastThree;
    let output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    if (result.length > 1) {
      output += "." + result[1];
    }

    return currencySymbol + output;
  }
  return "";

  // Return an empty string or handle the case when input is not a valid number
}

export default Form;
export type { FormData };
