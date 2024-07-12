import React, { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { useEmployeeStore } from "../store/useForm";
import Link from "../components/Link";
import axios from "axios";
import Employee from "./EmployeePage";
import {
  addEmployee,
  EmployeeInput,
  getAllEmployees,
} from "../APIUtils/employeesDataGetter";

const EmployeesPage: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(undefined);

  const [employees_, setEmployees_] = useState<Employee[]>([]);

  const [addEmployeeForm, setAddEmployeeForm] = useState<EmployeeInput>({
    full_name: "",
    phone_no: "",
    address: "",
    designation: "",
    description: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const fetchedEmployees = await getAllEmployees();
      if (fetchedEmployees) {
        setEmployees_(fetchedEmployees);
        console.log("Fetched employees:", fetchedEmployees);
      } else {
        // Handle error or set default state
      }
    };

    fetchEmployees();
  }, []);

  const employees: Employee[] = [
    { id: 1, name: "John Doe", position: "Manager" },
    { id: 2, name: "Jane Smith", position: "Developer" },
    { id: 3, name: "Mike Johnson", position: "Designer" },
    { id: 4, name: "Sarah Brown", position: "Tester" },
    { id: 5, name: "Tom White", position: "Support" },
    { id: 6, name: "Alice Green", position: "HR" },
    { id: 7, name: "Bob Black", position: "Accountant" },
    { id: 8, name: "Emily Davis", position: "Manager" },
    { id: 9, name: "Michael Lee", position: "Developer" },
    { id: 10, name: "Jessica Wilson", position: "Designer" },
    { id: 11, name: "David Martinez", position: "Tester" },
    { id: 12, name: "Linda Rodriguez", position: "Support" },
    { id: 13, name: "Kevin Miller", position: "HR" },
    { id: 14, name: "Amanda Harris", position: "Accountant" },
    { id: 15, name: "Jason Thompson", position: "Manager" },
    { id: 16, name: "Rachel Moore", position: "Developer" },
    { id: 17, name: "Justin Clark", position: "Designer" },
    { id: 18, name: "Samantha Young", position: "Tester" },
    { id: 19, name: "Patrick Hall", position: "Support" },
    { id: 20, name: "Stephanie King", position: "HR" },
    { id: 21, name: "Andrew Lewis", position: "Accountant" },
    { id: 22, name: "Heather Walker", position: "Manager" },
    { id: 23, name: "Brian Allen", position: "Developer" },
    { id: 24, name: "Michelle Scott", position: "Designer" },
    { id: 25, name: "Timothy Carter", position: "Tester" },
    { id: 26, name: "Kimberly Hill", position: "Support" },
    { id: 27, name: "Brandon Ward", position: "HR" },
    { id: 28, name: "Melissa Flores", position: "Accountant" },
    { id: 29, name: "Jeffrey Nelson", position: "Manager" },
    { id: 30, name: "Angela Baker", position: "Developer" },
    { id: 31, name: "Ethan Perez", position: "Designer" },
    { id: 32, name: "Amanda Sanchez", position: "Tester" },
    { id: 33, name: "Jose Rivera", position: "Support" },
    { id: 34, name: "Christina Ross", position: "HR" },
    { id: 35, name: "Mark Morris", position: "Accountant" },
    { id: 36, name: "Catherine Barnes", position: "Manager" },
    { id: 37, name: "Joshua Cox", position: "Developer" },
    { id: 38, name: "Julia Price", position: "Designer" },
    { id: 39, name: "Daniel Ward", position: "Tester" },
    { id: 40, name: "Ashley Murphy", position: "Support" },
    { id: 41, name: "Kyle Peterson", position: "HR" },
    { id: 42, name: "Laura Bell", position: "Accountant" },
    { id: 43, name: "Ryan Richardson", position: "Manager" },
    { id: 44, name: "Nicole Turner", position: "Developer" },
    { id: 45, name: "Gregory Cook", position: "Designer" },
    { id: 46, name: "Megan Bailey", position: "Tester" },
    { id: 47, name: "Jacob Murphy", position: "Support" },
    { id: 48, name: "Erica Cooper", position: "HR" },
    { id: 49, name: "Jonathan Reed", position: "Accountant" },
    { id: 50, name: "Tiffany Parker", position: "Manager" },
    { id: 51, name: "Jordan Gonzales", position: "Developer" },
    { id: 52, name: "Victoria Stewart", position: "Designer" },
    { id: 53, name: "Dylan Morris", position: "Tester" },
    { id: 54, name: "Christine Mitchell", position: "Support" },
    { id: 55, name: "Nathan Hayes", position: "HR" },
    { id: 56, name: "Monica Long", position: "Accountant" },
    { id: 57, name: "Henry Hughes", position: "Manager" },
    { id: 58, name: "Katherine Cox", position: "Developer" },
    { id: 59, name: "Phillip Coleman", position: "Designer" },
    { id: 60, name: "Lori Bell", position: "Tester" },
    { id: 61, name: "Alexis Wright", position: "Support" },
    { id: 62, name: "Gabriel Richardson", position: "HR" },
    { id: 63, name: "Pamela Ross", position: "Accountant" },
    { id: 64, name: "Franklin Price", position: "Manager" },
    { id: 65, name: "Cassandra Wood", position: "Developer" },
    { id: 66, name: "Jimmy Foster", position: "Designer" },
    { id: 67, name: "Brianna Brooks", position: "Tester" },
    { id: 68, name: "Walter Ramirez", position: "Support" },
    { id: 69, name: "Donna Ward", position: "HR" },
    { id: 70, name: "Billy Mitchell", position: "Accountant" },
    { id: 71, name: "Martha Coleman", position: "Manager" },
    { id: 72, name: "Peter Stewart", position: "Developer" },
    { id: 73, name: "Rose Reed", position: "Designer" },
    { id: 74, name: "Jerry Jenkins", position: "Tester" },
    { id: 75, name: "Sandra Flores", position: "Support" },
    { id: 76, name: "Randy Bennett", position: "HR" },
    { id: 77, name: "Cynthia Gonzalez", position: "Accountant" },
    { id: 78, name: "Lawrence Hughes", position: "Manager" },
    { id: 79, name: "Deborah Powell", position: "Developer" },
    { id: 80, name: "Patrick Long", position: "Designer" },
    { id: 81, name: "Beverly Butler", position: "Tester" },
    { id: 82, name: "Roy Henderson", position: "Support" },
    { id: 83, name: "Sharon Bryant", position: "HR" },
    { id: 84, name: "Keith Foster", position: "Accountant" },
    { id: 85, name: "Theresa Carter", position: "Manager" },
    { id: 86, name: "Martin Martinez", position: "Developer" },
    { id: 87, name: "Judith Simmons", position: "Designer" },
    { id: 88, name: "Harry Collins", position: "Tester" },
    { id: 89, name: "Janice Turner", position: "Support" },
    { id: 90, name: "Eugene Baker", position: "HR" },
    { id: 91, name: "Joan Sanchez", position: "Accountant" },
    { id: 92, name: "Jimmy Hughes", position: "Manager" },
    { id: 93, name: "Margaret Jenkins", position: "Developer" },
    { id: 94, name: "Bruce Cox", position: "Designer" },
    { id: 95, name: "Teresa Russell", position: "Tester" },
    { id: 96, name: "Ralph Henderson", position: "Support" },
    { id: 97, name: "Gloria Ward", position: "HR" },
    { id: 98, name: "Samuel Richardson", position: "Accountant" },
    { id: 99, name: "Norma Flores", position: "Manager" },
    { id: 100, name: "Carl Young", position: "Developer" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  console.log("employees now we have:", employees_);

  // Filter employees based on search query
  const filteredEmployees = employees_.filter((employee) =>
    employee.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("filteredEmployees:", filteredEmployees);

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleEmployeeClick = (id: number) => {
    setSelectedEmployee(id);
  };
  const handleBackClick = () => {
    setSelectedEmployee(undefined);
    console.log("Back clicked");
    console.log(selectedEmployee);
  };
  // Use useEffect to log the updated selectedEmployee value
  useEffect(() => {
    console.log("selectedEmployee updated:", selectedEmployee);
  }, [selectedEmployee]);

  if (selectedEmployee === undefined) {
    return (
      <div className="min-h-screen min-w-full bg-gray-100 px-8">
        <div className="sticky top-0 bg-gray-100 flex justify-between rounded-md items-center mb-6 p-4 shadow-md">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            onClick={() => console.log("Back clicked")}
          >
            Back
          </button>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="border border-gray-300 p-2 rounded mr-4"
            />
            <AddEmployeeModal />
          </div>
        </div>

        <div className="max-h-[calc(100vh-112px)] overflow-y-auto mt-6">
          <div className=" grid grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.employee_id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                onClick={() => handleEmployeeClick(employee.employee_id)}
              >
                <h3 className="text-2xl font-semibold mb-2">
                  {employee.full_name}
                </h3>
                <p className="text-gray-600">{employee.designation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Employee
        handleBackClick={handleBackClick}
        employee_id={selectedEmployee}
      />
    );
  }
};

export default EmployeesPage;

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
