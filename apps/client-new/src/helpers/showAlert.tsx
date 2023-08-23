import { toast } from "react-toastify";

export const showAlert = (action: any, name: any) => {
  toast.success("You have successfully " + action + " " + name);
};
