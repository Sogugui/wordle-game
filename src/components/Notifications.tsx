import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TOAST_CONFIG = {
  hideProgressBar: true,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  autoClose: 4000,
  className: "notification",
};

export const notifySucess = (title: string) => {
  toast.success(title);
};
export const notifyError = (title: string) => {
  toast.error(title);
};
