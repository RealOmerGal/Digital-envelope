import Swal from "sweetalert2";

interface ISucessMessage {
  title?: string;
  successString?: string;
  callback?: () => void;
}

interface IErrorMessage {
  title?: string;
  errorString?: string;
  callback?: () => void;
  footer?: string;
}

interface IConfirmMessage {
  title?: string;
  text?: string;
  handleYes?: () => any;
  handleNo?: () => any;
}

export const showSuccessMessage = ({
  title,
  successString,
  callback,
}: ISucessMessage) => {
  Swal.fire({
    icon: "success",
    title: title ?? "Success!",
    text: successString ?? "You're doing great",
    confirmButtonColor: "#5469d4",
  }).then((res) => {
    if (res.isConfirmed && callback) {
      callback();
    }
  });
};

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

export const showErrorMessage = ({
  title,
  callback,
  errorString,
  footer,
}: IErrorMessage) => {
  Swal.fire({
    icon: "error",
    title: title ?? "Oops...",
    text: errorString ?? "Something went wrong!",
    footer: footer ?? "Please try again later",
    confirmButtonColor: "#5469d4",
  }).then((res) => {
    if (res.isConfirmed && callback) {
      callback();
    }
  });
};

export const formatNumber = (n: number) => {
  const abbrev = "kmb";
  function round(n: number, precision: number) {
    var prec = Math.pow(10, precision);
    return Math.round(n * prec) / prec;
  }
  let base = Math.floor(Math.log(Math.abs(n)) / Math.log(1000));
  let suffix = abbrev[Math.min(2, base - 1)];
  base = abbrev.indexOf(suffix) + 1;
  return suffix ? round(n / Math.pow(1000, base), 2) + suffix : "" + n;
};
