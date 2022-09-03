import Swal from "sweetalert2";

interface ISucessMessage {
    title?: string;
    successString?: string;
    callback?: () => void;
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