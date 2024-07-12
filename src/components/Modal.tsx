import React, { useState, ChangeEvent } from "react";
import { useFormStore } from "../store/useForm";

export const Modal: React.FC = () => {
  //   const data = useFormStore((state) => state.formData);
  const { formData, setFormData } = useFormStore();
  const [modalOpen, setModalOpen] = useState(false);

  const ToggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    console.log(name, checked);

    setFormData({
      ...formData,
      [name]: checked ? "" : null,
    });
    console.log(formData[name]);
  };

  return (
    <div>
      <button
        onClick={ToggleModal}
        className="flex-1 bg-gray-500 px-4 pb-4 shrink-0  text-center text-5xl  border rounded-md shadow-md"
      >
        +
      </button>
      {modalOpen && (
        <div className="w-screen h-screen  top-0 left-0 right-0 bottom-0 fixed ">
          <div className="w-screen h-screen bg-slate-300 top-0 left-0 right-0 bottom-0 fixed opacity-50"></div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-50 p-4 ">
            {/* <input
              className="w-6 h-6"
              type="checkbox"
              name="demo"
              id="demo"
              checked={checkbox}
              onChange={handleCheckboxChange}
            /> */}
            <div className="flex flex-col">
              {Object.entries(formData).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between mr-4"
                >
                  <label className="mr-2 p-2">{key}: </label>
                  <input
                    checked={!(value === null)}
                    name={key}
                    onChange={handleCheckboxChange}
                    className="w-6 h-6"
                    type="checkbox"
                  />
                </div>
              ))}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={ToggleModal}
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
