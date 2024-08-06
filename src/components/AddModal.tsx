import React, { useState } from "react";
import BusTypeForm from "./AddBusTypeForm";
import AddWorkType from "./AddWorkTypeForm";
import Option3Form from "./AddOwnCompanyForm";
import AddPaymentTypeForm from "./AddPaymentTypeForm";

type ModalType = "none" | "bustype" | "worktype" | "owncompany" | "paymenttype";

const AddModalComponent: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>("none");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value as ModalType;
    setActiveModal(selectedOption);
  };

  const closeModal = () => {
    setActiveModal("none");
  };

  return (
    <div className="p-4">
      <div className="mb">
        <select
          id="modal-select"
          className="p-2 border border-gray-300 rounded w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={handleSelectChange}
          value={activeModal}
        >
          <option value="none" className="text-gray-500">
            Select an option
          </option>
          <option value="bustype" className="text-black">
            Add Bus Type
          </option>
          <option value="worktype" className="text-black">
            Add Work Type
          </option>
          <option value="owncompany" className="text-black">
            Add Own Company
          </option>
            <option value="paymenttype" className="text-black">
                Add Payment Type
            </option>
        </select>
      </div>

      {activeModal !== "none" && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded shadow-lg">
            {activeModal === "bustype" && <BusTypeForm onClose={closeModal} />}
            {activeModal === "worktype" && <AddWorkType onClose={closeModal} />}
            {activeModal === "owncompany" && <Option3Form onClose={closeModal} />}
            {activeModal === "paymenttype" && <AddPaymentTypeForm onClose={closeModal} />}

          </div>
        </div>
      )}
    </div>
  );
};

export default AddModalComponent;
