import React, { useEffect, useState } from "react";
import { fetchBusTypes } from "../APIUtils/employeesDataGetter";
import useBusTypeStore from "../store/useBusType";
import axios from "axios";

interface Option2FormProps {
  onClose: () => void;
}

const AddWorkType: React.FC<Option2FormProps> = ({ onClose }) => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState<number | "">("");
  const { data } = useBusTypeStore();

  const busData = data.bus_types;

  const [formState, setFormState] = useState({
    cost: 0,
    busType: "",
    workName: "",
    description: "",
  });

  const options: DropdownOption[] = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === "integerField" ? parseInt(value, 10) : value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", formState);
    const correspondingBusType = busData.find(
      (entry) => entry.bus_type === formState.busType
    );
    if (correspondingBusType) {
      let formData = formState;
      formData.bus_type_id = correspondingBusType.bus_type_id;
      console.log("Form data with bus_type_id:", { data: formData });
      // Call the API to submit the form data
      try {
        const response = await axios.post(
          "http://127.0.0.1:8001/create_work?key=&token=",
          {
            data: formData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Successfully submitted data for option2");
      } catch (error) {
        console.error("Error submitting data for option2:", error);
      }
    }
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { input1, input2, input3: Number(input3) };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/create_wobrk?key=&token=",
        {
          data,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Successfully submitted data for option2");
    } catch (error) {
      console.error("Error submitting data for option2:", error);
    }
    onClose();
  };

  useEffect(() => {
    fetchBusTypes();
  }, []);

  return (
    <form onSubmit={handleFormSubmit}>
      <h2 className="text-2xl mb-4">Work Type Form</h2>

      <div>
        <label
          htmlFor="textField"
          className="block text-sm font-medium text-gray-700"
        >
          Work Name
        </label>
        <input
          type="text"
          id="workName"
          name="workName"
          value={formState.workName}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Integer Field */}
      <div>
        <label
          htmlFor="integerField"
          className="block text-sm font-medium text-gray-700"
        >
          Cost
        </label>
        <input
          type="number"
          id="cost"
          name="cost"
          value={formState.cost}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Dropdown Selector */}
      <div className="mb-4">
        <label
          htmlFor="dropdownField"
          className="block text-sm font-medium text-gray-700"
        >
          Dropdown Selector
        </label>
        <select
          id="busType"
          name="busType"
          value={formState.busType}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Select an option
          </option>
          {busData && busData.length > 0 ? (
            busData.map((option) => (
              <option key={option.bus_type_id} value={option.bus_type}>
                {option.bus_type}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No options available
            </option>
          )}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Submit Button */}

      {/* <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Work Name</label>
        <input
          type="text"
          name="work_name"
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => setInput1(e.target.value)}
          required
        />
      </div> */}
      {/* <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <input
          type="text"
          name="description"
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => setInput2(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">cost (Number)</label>
        <input
          type="number"
          name="cost"
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => setInput3(e.target.valueAsNumber)}
          required
        />
      </div> */}
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

export default AddWorkType;
