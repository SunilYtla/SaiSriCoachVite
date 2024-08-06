import { ChangeEvent, useState } from "react";
import { addEmployee } from "../APIUtils/employeesDataGetter";

const AddEmployeeModal: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState({
    full_name: "",
    phone_no: "",
    address: "",
    designation: "",
    description: "",
  });

  const ToggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployeeInfo({
      ...employeeInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(employeeInfo); // Handle the form submission logic here
    ToggleModal();
    e.preventDefault();
    const added_sucessfulley = await addEmployee(employeeInfo);
    if (added_sucessfulley) {
      console.log("Employee added successfully!");
    } else {
      console.error("Error adding employee!");
    }
    // set the employeeInfo state back to initial values
    setEmployeeInfo({
      full_name: "",
      phone_no: "",
      address: "",
      designation: "",
      description: "",
    });
  };

  return (
    <div>
      <button
        onClick={ToggleModal}
        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
      >
        Add New Employee
      </button>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Add New Employee</h2>
            <form className="flex flex-col space-y-4">
              <input
                type="text"
                name="full_name"
                placeholder="Name"
                value={employeeInfo.full_name || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="phone_no"
                placeholder="Phone Number"
                value={employeeInfo.phone_no || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="string"
                name="address"
                placeholder="Address"
                value={employeeInfo.address || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                value={employeeInfo.designation || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={employeeInfo.description || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={ToggleModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmployeeModal;
