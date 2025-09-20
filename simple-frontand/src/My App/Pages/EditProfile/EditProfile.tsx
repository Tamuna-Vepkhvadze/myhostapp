import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RegiretForm from "../../components/Form/RegiretForm";
import type { EditType } from "../../components/interface/interface";
import EditProfileInput from "./EditProfileInput";
import { editSchema } from "../../components/zod/editShema";
import useEdit from "../../components/Hook/useEdit";
import {  userstate } from "../../../zustand/Uzerstate";

const EditProfile = () => {
  const { id } = useParams();

  const navigate = useNavigate()

  const {globalstate} = userstate()

  const editData: EditType = {
    image: globalstate?.image,
    firstName: globalstate?.firstName || "",
    lastName: globalstate?.lastName || "",
    phone: globalstate?.phone || ""
  }


  const {mutate } = useEdit(Number(id));

  const button = useMemo(() => {
    return (
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
      >
        პროფილის რედაქტირება
      </button>
    );
  }, []);

  const action = (data: EditType) => {
    mutate(data, {
        onSuccess: () => navigate("/SuccessEdit")
    });
    console.log(data);
  };


  return (
    <RegiretForm
      action={action}
      button={button}
      inpute={EditProfileInput}
      schema={editSchema}
      defaultValues={editData}
    />
  );
};

export default EditProfile;
