import Swal from "sweetalert2";

interface IConfirmMessage {
  title?: string;
  text?: string;
  handleYes?: () => any;
  handleNo?: () => any;
}

export const showConfirmMessage = ({
  text,
  title,
  handleNo,
  handleYes,
}: IConfirmMessage) => {
  Swal.fire({
    title: title ?? "Are you sure?",
    text,
    icon: "question",
    iconColor: "#5048E5",
    confirmButtonText: "Yes!",
    confirmButtonColor: "#5048E5",
    cancelButtonColor: "#f27474",
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed && handleYes) {
      handleYes();
    } else if (handleNo) {
      handleNo();
    }
  });
};


