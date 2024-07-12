// src/App.tsx
import React, { useState } from "react";
import "./App.css";

type FormData = {
  employee_id: number;
  payment: number;
  record_date: string;
  type_of_work: string;
  type_of_payment: string;
  mode_of_payment: string;
  company: string;
  works: string[];
  costs: number[];
  quantities: number[];
};

const SalaryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    employee_id: 0,
    payment: 0,
    record_date: "",
    type_of_work: "",
    type_of_payment: "",
    mode_of_payment: "",
    company: "",
    works: [""],
    costs: [0],
    quantities: [0],
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
    field: "works" | "costs" | "quantities"
  ) => {
    const newArray = [...formData[field]];
    newArray[index] =
      field === "costs" || field === "quantities" ? Number(value) : value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const addArrayField = (field: "works" | "costs" | "quantities") => {
    setFormData({
      ...formData,
      [field]: [
        ...formData[field],
        field === "costs" || field === "quantities" ? 0 : "",
      ],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // Submit formData to the server or process it as needed
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-lg font-medium mb-4">Submit Data</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="employee_id">
            Employee ID
          </label>
          <input
            className="w-full p-2 border rounded"
            type="number"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="payment">
            Payment
          </label>
          <input
            className="w-full p-2 border rounded"
            type="number"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="record_date">
            Record Date
          </label>
          <input
            className="w-full p-2 border rounded"
            type="date"
            name="record_date"
            value={formData.record_date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="type_of_work">
            Type of Work
          </label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="type_of_work"
            value={formData.type_of_work}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="type_of_payment">
            Type of Payment
          </label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="type_of_payment"
            value={formData.type_of_payment}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="mode_of_payment">
            Mode of Payment
          </label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="mode_of_payment"
            value={formData.mode_of_payment}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="company">
            Company
          </label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Works</label>
          {formData.works.map((work, index) => (
            <div key={index} className="flex mb-2">
              <input
                className="w-full p-2 border rounded mr-2"
                type="text"
                value={work}
                onChange={(e) => handleArrayChange(e, index, "works")}
              />
              {index === formData.works.length - 1 && (
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  type="button"
                  onClick={() => addArrayField("works")}
                >
                  Add
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Costs</label>
          {formData.costs.map((cost, index) => (
            <div key={index} className="flex mb-2">
              <input
                className="w-full p-2 border rounded mr-2"
                type="number"
                value={cost}
                onChange={(e) => handleArrayChange(e, index, "costs")}
              />
              {index === formData.costs.length - 1 && (
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  type="button"
                  onClick={() => addArrayField("costs")}
                >
                  Add
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Quantities</label>
          {formData.quantities.map((quantity, index) => (
            <div key={index} className="flex mb-2">
              <input
                className="w-full p-2 border rounded mr-2"
                type="number"
                value={quantity}
                onChange={(e) => handleArrayChange(e, index, "quantities")}
              />
              {index === formData.quantities.length - 1 && (
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  type="button"
                  onClick={() => addArrayField("quantities")}
                >
                  Add
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SalaryForm;
