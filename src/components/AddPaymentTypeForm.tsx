import axios from "axios";
import React, { useState } from "react";

interface Option1FormProps {
  onClose: () => void;
}

const AddPaymentTypeForm: React.FC<Option1FormProps> = ({ onClose }) => {
  const [input1, setInput1] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      payment_type: input1,
    };
    console.log("Submitting data for payment type", { data });
    try {
      await axios.post(
        "http://127.0.0.1:8001/create_payment_type?key=&token=",
        {
          data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Successfully submitted data for bustype", data);
    } catch (error) {
      console.error("Error submitting data for bustype:", error);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4">Payment Type Form</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Enter Payment Type
        </label>
        <input
          type="text"
          name="input1"
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => setInput1(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddPaymentTypeForm;
