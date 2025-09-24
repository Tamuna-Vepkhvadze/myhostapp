import type { inputeType } from "../../components/interface/interface";

export const passwordInputs: inputeType[] = [
  {
    name: "oldPassword",
    label: "ძველი პაროლი",
    placeholder: "შეიყვანეთ ძველი პაროლი",
    type: "password",
  },
  {
    name: "newPassword",
    label: "ახალი პაროლი",
    placeholder: "შეიყვანეთ ახალი პაროლი",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "დაადასტურეთ ახალი პაროლი",
    placeholder: "დაადასტურეთ ახალი პაროლი",
    type: "password",
  },
]