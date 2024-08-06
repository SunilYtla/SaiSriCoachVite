import React, { useState } from "react";
import Dropdown from "./DropDown";
import axios from "axios";

interface Option3FormProps {
  onClose: () => void;
}

const Option3Form: React.FC<Option3FormProps> = ({ onClose }) => {
  const ownCompanies = ["Company 1", "Company 2", "Company 3"];
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    company_name: "",
    address: "",
    phone_no: "",
    alternate_phone_no: "",
    mail_id: "",
    type_of_company: "",
    gst_no: "",
    pan_no: "",
    date_of_establishment: "",
    description: "",
    bank_name: [""],
    bank_branch: [""],
    bank_ifsc_code: [""],
    account_no: [""],
    account_owner_name: [""],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "employee_id" || name === "payment" ? Number(value) : value,
    });
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field:
      | "bank_name"
      | "bank_branch"
      | "bank_ifsc_code"
      | "account_no"
      | "account_owner_name"
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const addArrayField = () => {
    setFormData({
      ...formData,
      bank_name: [...formData.bank_name, ""],
      bank_branch: [...formData.bank_branch, ""],
      bank_ifsc_code: [...formData.bank_ifsc_code, ""],
      account_no: [...formData.account_no, ""],
      account_owner_name: [...formData.account_owner_name, ""],
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/create_own_company?key&token",
        {
          data: formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Successfully submitted data for option3");
    } catch (error) {
      console.error("Error submitting data for option3:", error);
    }

    console.log(formData);
    onClose();
    // Submit formData to the server or process it as needed
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("https://api.example.com/option3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Successfully submitted data for option3");
    } catch (error) {
      console.error("Error submitting data for option3:", error);
    }
    onClose();
  };

  return (
    <form className="" onSubmit={handleFormSubmit}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 h-3/4 overflow-auto rounded shadow-lg p-6">
          <h2 className="text-lg font-medium mb-4">Submit Data</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="mb-4">
              <label className="block mb-2" htmlFor="company_name">
                Comapny Name
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded"
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="address">
                Address
              </label>
              <input
                className="w-full p-2  border-2 border-gray-300 rounded"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="phone_no">
                Phone Number
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded"
                type="text"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="alternate_phone_no">
                Alternate Phone Number
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded"
                type="text"
                name="alternate_phone_no"
                value={formData.alternate_phone_no}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="mail_id">
                Mail ID
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded"
                type="text"
                name="mail_id"
                value={formData.mail_id}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="type_of_company">
                Type of Company
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded"
                type="text"
                name="type_of_company"
                value={formData.type_of_company}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="gst_no">
                GST Number
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded"
                type="text"
                name="gst_no"
                value={formData.gst_no}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="pan_no">
                PAN Number
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded"
                type="text"
                name="pan_no"
                value={formData.pan_no}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="date_of_establishment">
                Date of Establishment
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded"
                type="date"
                name="date_of_establishment"
                value={formData.date_of_establishment}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="description">
                Description
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Bank Name</label>
              {formData.bank_name.map((bn, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    className="w-full p-2 border-2 border-gray-300 rounded mr-2"
                    type="text"
                    value={bn}
                    onChange={(e) => handleArrayChange(e, index, "bank_name")}
                  />
                  {index === formData.bank_name.length - 1 && (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      type="button"
                      onClick={() => addArrayField("bank_name")}
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Bank Branch</label>
              {formData.bank_branch.map((bb, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    className="w-full p-2 border-2 border-gray-300 rounded mr-2"
                    type="text"
                    value={bb}
                    onChange={(e) => handleArrayChange(e, index, "bank_branch")}
                  />
                  {index === formData.bank_branch.length - 1 && (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      type="button"
                      onClick={() => addArrayField("bank_branch")}
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Bank IFSC Code</label>
              {formData.bank_ifsc_code.map((bic, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    className="w-full p-2 border-2 border-gray-300 rounded mr-2"
                    type="text"
                    value={bic}
                    onChange={(e) =>
                      handleArrayChange(e, index, "bank_ifsc_code")
                    }
                  />
                  {index === formData.bank_ifsc_code.length - 1 && (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      type="button"
                      onClick={() => addArrayField("bank_ifsc_code")}
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Account Number</label>
              {formData.account_no.map((an, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    className="w-full p-2 border-2 border-gray-300 rounded mr-2"
                    type="text"
                    value={an}
                    onChange={(e) => handleArrayChange(e, index, "account_no")}
                  />
                  {index === formData.account_no.length - 1 && (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      type="button"
                      onClick={() => addArrayField("account_no")}
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Account Owner Name</label>
              {formData.account_owner_name.map((aon, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    className="w-full p-2 border-2 border-gray-300 rounded mr-2"
                    type="text"
                    value={aon}
                    onChange={(e) =>
                      handleArrayChange(e, index, "account_owner_name")
                    }
                  />
                  {index === formData.account_owner_name.length - 1 && (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      type="button"
                      onClick={() => addArrayField("account_owner_name")}
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded ml-4"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default Option3Form;
