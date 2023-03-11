import Swal from "sweetalert2";

const SuccessMsg = ({ message }) => {
  Swal.fire({
    icon: "success",
    title: "Good job!",
    text: message,
  });
};

export default SuccessMsg;
