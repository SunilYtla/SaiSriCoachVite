interface FormData {
  employee_id: number;
  // Add other properties as needed
}

const validateSalaryForm = (formData: FormData) => {
  let errors = {};
  if (isNaN(formData.employee_id)) {
    errors.employee_id = "Employee ID is required";
  }
  if (isNaN(formData.payment)) {
    errors.payment = "Payment is required";
  }
  if (formData.mode_of_payment === "") {
    errors.mode_of_payment = "Mode of payment is required";
  }
  if (formData.company === "") {
    errors.company = "Company is required";
  }
  // for loop on formData.works list and check each value if empty string

  for (let i = 0; i < formData.works.length; i++) {
    if (formData.works[i] === "") {
      errors.works = "Work is required";
    }
    if (formData.work_ids[i] === -1) {
      errors.work_ids = "Work ID is required";
    }
    if (formData.costs[i] <= 0) {
      errors.costs = "Cost is required";
    }
    if (formData.quantities[i] <= 0) {
      errors.quantities = "Quantity is required";
    }
  }
  return errors;
};

export { validateSalaryForm };
