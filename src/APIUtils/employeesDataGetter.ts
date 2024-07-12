import axios from "axios";

interface Employee {
  employee_id: number;
  full_name: string;
  phone_no: string;
  address: string;
  designation: string;
  description: string;
}

interface EmployeeInput {
  full_name: string;
  phone_no: string;
  address: string;
  designation: string;
  description: string;
}

async function getAllEmployees(): Promise<Employee[] | undefined> {
  const apiUrl = "http://127.0.0.1:8001/get_all_employees?key=null&token=null";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // No need for body since it's a GET request with no data
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    return data.employees as Employee[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
}

async function addEmployee(employeeData: EmployeeInput): Promise<boolean> {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8001/add_employee",
      {
        data: employeeData,
      },
      {
        params: {
          key: "null",
          token: "null",
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Employee added successfully:", response.data);
    return !response.data.has_error;
  } catch (error) {
    console.error("There was an error adding the employee:", error);
    return false;
  }
}

async function getEmployeeSalaryEntries(
  key: string,
  token: string,
  employeeId: number
) {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8001/get_employee_salary_entries",
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key,
          token,
          employee_id: employeeId,
        },
      }
    );
    return response.data.salary_entries;
  } catch (error) {
    console.error("Error fetching employee salary entries:", error);
    throw error;
  }
}

// Example usage:
async function main() {
  const employees = await getAllEmployees();
  if (employees) {
    console.log("Fetched employees:", employees);
  } else {
    console.log("Failed to fetch employees.");
  }
}

export { getAllEmployees, addEmployee, getEmployeeSalaryEntries };
export type { Employee, EmployeeInput };
