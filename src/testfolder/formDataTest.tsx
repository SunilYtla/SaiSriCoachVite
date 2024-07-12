import { useFormStore } from "../store/useForm";
interface FormData {
  date: string;
  quotationnumber: string;
  recipientAddress: string;
  totalamount: string;
  subject: string;
  bodytext: string;
  recipientName: string;
  sender: string;
}
const YourComponent: React.FC = () => {
  const { formData, setFormData } = useFormStore();
  const formmdaata: FormData = {
    date: "2000000",
    quotationnumber: "1",
    recipientAddress: "address sda",
    totalamount: "amount as",
    subject: "subject dd",
    bodytext: "bd txt",
    recipientName: "recp name",
    sender: "esnder",
  };

  // Use formData and setFormData in your component
  const handleClick = () => {
    console.log(formData);
  };
  const handlesetForm = () => {
    setFormData(formmdaata);
  };
  return (
    <div>
      <button onClick={handleClick}>Console Log Button</button>
      <button onClick={handlesetForm}>Another function Button</button>
    </div>
  );

  // Rest of your component
};

export default YourComponent;
