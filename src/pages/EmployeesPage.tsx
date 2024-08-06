import React, { ChangeEvent, useState, useEffect } from "react";

import Employee from "./EmployeePage";
import { getAllEmployees } from "../APIUtils/employeesDataGetter";
import AddEmployeeModal from "../components/AddEmployeeModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/Menu";
import AddModalComponent from "../components/AddModal";

const EmployeesPage: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(undefined);

  const [employees_, setEmployees_] = useState<Employee[]>([]);

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

          <AddModalComponent />

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
