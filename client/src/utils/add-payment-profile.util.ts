import Swal from "sweetalert2";
import { UserService } from "../services/user.service";
import { showSuccessMessage } from "./success-message.util";

export const addPaymentProfileMessage = async () => {
  const { value: profileId } = await Swal.fire({
    title: "Hello there",
    text: "We have noticed you dont have a stripe payment profile yet, you wont be able to open an event meanwhile",
    icon: "warning",
    iconColor: "#5048E5",
    input: "text",
    confirmButtonText: "Submit",
    confirmButtonColor: "#5048E5",
    cancelButtonColor: "#f27474",
    cancelButtonText: "Not now",
    showCancelButton: true,
  });
  if (profileId) {
    const newUser = await UserService.updateUser({
      paymentProfileId: profileId,
    });
    showSuccessMessage({});
    return newUser;
  }
  return null;
};
