import Swal from "sweetalert2";

interface IErrorMessage {
    title?: string;
    errorString?: string;
    callback?: () => void;
    footer?: string;
}

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
