import React, { useEffect, useState } from "react";
import SortableTable from "../components/SortableTable";
import {
  getEmployeeSalaryEntries,
  createEmployeeSalaryEntry,
  getEmployeeSalaryEntriesOfCompany,
  fetchAllOwnCompanies,
} from "../APIUtils/employeesDataGetter";
import Collapsible from "../components/Collapsible";
import Dropdown from "../components/DropDown";

// Data and Configuration
const Transactions = [
  { id: 1, name: "John Doe", amount: 100, type: "credit" },
  { id: 2, name: "Jane Doe", amount: 200, type: "debit" },
  { id: 3, name: "John Smith", amount: 300, type: "credit" },
  { id: 4, name: "Jane Smith", amount: 400, type: "debit" },
  { id: 5, name: "John Doe", amount: 500, type: "credit" },
  { id: 6, name: "Jane Doe", amount: 600, type: "debit" },
  { id: 7, name: "John Smith", amount: 700, type: "credit" },
  { id: 8, name: "Jane Smith", amount: 800, type: "debit" },
  { id: 9, name: "John Doe", amount: 900, type: "credit" },
  { id: 10, name: "Jane Doe", amount: 1000, type: "debit" },
  { id: 11, name: "John Smith", amount: 1100, type: "credit" },
  { id: 12, name: "Jane Smith", amount: 1200, type: "debit" },
  { id: 13, name: "John Doe", amount: 1300, type: "credit" },
  { id: 14, name: "Jane Doe", amount: 1400, type: "debit" },
  { id: 15, name: "John Smith", amount: 1500, type: "credit" },
  { id: 16, name: "Jane Smith", amount: 1600, type: "debit" },
  { id: 17, name: "John Doe", amount: 1700, type: "credit" },
  { id: 18, name: "Jane Doe", amount: 1800, type: "debit" },
  { id: 19, name: "John Smith", amount: 1900, type: "credit" },
  { id: 20, name: "Jane Smith", amount: 2000, type: "debit" },
  { id: 21, name: "John Doe", amount: 2100, type: "credit" },
  { id: 22, name: "Jane Doe", amount: 2200, type: "debit" },
  { id: 23, name: "John Smith", amount: 2300, type: "credit" },
];

const config = [
  {
    label: "Record Date",
    render: (d: any) => d.record_date,
    sortValue: (d: any) => d.record_date,
  },
  {
    label: "Mode of Payment",
    render: (d: any) => d.mode_of_payment,
    sortValue: (d: any) => d.mode_of_payment,
  },
  {
    label: "Payment",
    render: (d: any) => d.payment,
    sortValue: (d: any) => d.payment,
  },
  {
    label: "Type Of Payment",
    render: (d: any) => d.type_of_payment,
    sortValue: (d: any) => d.type_of_payment,
  },
  {
    label: "Type of Work",
    render: (d: any) => d.type_of_work,
    sortValue: (d: any) => d.type_of_work,
  },
  {
    label: "Works",
    render: (d: any) => (
      <Collapsible
        items1={d.works}
        items2={d.quantities}
        items3={d.costs}
        headings={["works", "quantities", "costs"]}
      />
    ),
  },
  {
    label: "Work Done",
    render: (d: any) => d.work_done,
    sortValue: (d: any) => d.work_done,
  },
  {
    label: "Created At",
    render: (d: any) => d.created_at,
    sortValue: (d: any) => d.created_at,
  },
];
const keyFn = (d: any) => {
  return d.salary_entry_id; // Using ID for key function
};

const Employee: React.FC<{
  handleBackClick: () => void;
  employee_id: number;
}> = ({ handleBackClick, employee_id }) => {
  const [salaryEntries, setSalaryEntries] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(undefined);

  const [allOwnCompanies, setAllOwnCompanies] = useState([]);
  const options = ["saisri", "kethaki"];

  useEffect(() => {
    const fetchSalaryEntries = async () => {
      const companies = await fetchAllOwnCompanies();
      if (companies) {
        setAllOwnCompanies(companies);
        // comp equals companies[0] if selectedCompany is undefined otherwise it equals selectedCompany
        const comp = selectedCompany || companies[0];
        setSelectedCompany(comp);

        console.log("Companies:", comp);
        if (comp) {
          const fetchedEntries = await getEmployeeSalaryEntriesOfCompany(
            "key",
            "token",
            employee_id,
            comp
          );

          if (fetchedEntries) {
            setSalaryEntries(fetchedEntries);
            console.log("Fetched entries:", fetchedEntries);
          } else {
            // Handle error or set default state
          }
        }
      }
    };

    fetchSalaryEntries();
  }, [selectedCompany]);

  return (
    <div className="min-h-screen min-w-full bg-gray-100 p-8">
      <div className=" bg-white shadow-lg rounded-lg p-6 overflow-visible">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handleBackClick}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Go back
          </button>

          <h1 className="text-2xl font-bold">Employee Transactions</h1>
          <Dropdown
            options={allOwnCompanies}
            placeholder={allOwnCompanies[0] || "Select an option"}
            setOptionHandler={setSelectedCompany}
          />
          <button className="bg-purple-500 rounded-md px-4 py-3 -m-8 ">
            Add Company
          </button>
          <AddSalaryEntryModal
            employee_id={employee_id}
            selectedCompany={selectedCompany}
            ownCompanies={allOwnCompanies}
          />
        </div>
        <div className="max-h-[calc(100vh-112px)] overflow-y-auto mt-6">
          <SortableTable data={salaryEntries} config={config} keyFn={keyFn} />
        </div>
      </div>
    </div>
  );
};

export default Employee;
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
const AddSalaryEntryModal: React.FC<{
  employee_id: number;
  selectedCompany: string;
  ownCompanies: string[];
}> = ({ employee_id, selectedCompany, ownCompanies }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    employee_id: employee_id,
    payment: 0,
    record_date: "",
    type_of_work: "",
    type_of_payment: "",
    mode_of_payment: "",
    company: selectedCompany,
    works: [""],
    costs: [0],
    quantities: [0],
  });
  const ToggleModal = () => {
    setModalOpen(!modalOpen);
  };

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
      field === "costs" || field === "quantities"
        ? Number(e.target.value)
        : e.target.value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const addArrayField = () => {
    setFormData({
      ...formData,
      works: [...formData.works, ""],
      costs: [...formData.costs, 0],
      quantities: [...formData.quantities, 0],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    ToggleModal();
    // Submit formData to the server or process it as needed
  };

  return (
    <div>
      <button
        onClick={ToggleModal}
        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
      >
        Add New Transaction
      </button>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 h-3/4 overflow-auto rounded shadow-lg">
            <form
              className="bg-white p-6 rounded shadow-md"
              onSubmit={handleSubmit}
            >
              <h2 className="text-lg font-medium mb-4">Submit Data</h2>
              <div className="grid grid-cols-3 gap-4">
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
                        onChange={(e) =>
                          handleArrayChange(e, index, "quantities")
                        }
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
                {/* <div className="mb-4">
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
                </div> */}
                <div className="mb-4">
                  <label className="block mb-2" htmlFor="company">
                    Company
                  </label>
                  <Dropdown
                    options={ownCompanies}
                    placeholder={selectedCompany || "Select an option"}
                    setOptionHandler={(value) =>
                      setFormData({ ...formData, ["company"]: value })
                    }
                  />
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
                onClick={ToggleModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
