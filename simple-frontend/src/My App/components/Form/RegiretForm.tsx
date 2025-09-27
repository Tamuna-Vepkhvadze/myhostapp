import { useState, useEffect, type ReactNode } from "react";
import {
  useForm,
  type SubmitHandler,
  type FieldValues,
  type Path,
  type DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { inputeType } from "../interface/interface";
import type { ZodSchema } from "zod";

interface FormType<T extends FieldValues> {
  inpute: inputeType[];
  button: ReactNode;
  schema: ZodSchema<T>;
  action: (formdata: T) => void;
  validError?: string | null;
  defaultValues?: DefaultValues<T>; 
}

const RegiretForm = <T extends FieldValues>({
  action,
  button,
  inpute,
  schema,
  validError,
  defaultValues
}: FormType<T>) => {
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
    password: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
     watch,
  } = useForm<T>({
    resolver: zodResolver(schema as any),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: Path<T>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      alert("Only PNG or JPEG allowed");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setValue(fieldName, reader.result as any); // Base64 string
    };
    reader.readAsDataURL(file);
  };

  const onSubmit: SubmitHandler<T> = (data) => {
    action(data);
  };

  return (
    <div className="min-h-screen pt-26 pb-16 w-full h-full bg-gradient-to-br px-5 from-purple-100 via-pink-100 to-indigo-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto p-5 bg-gray-100 rounded-2xl shadow-lg space-y-4 transform hover:scale-102 transition-all"
      >
        {inpute.map((item) => {
          const fieldName = item.name as Path<T>;
          return (
            <div key={item.name} className="relative flex flex-col space-y-1">
              <label htmlFor={item.name} className="text-sm font-semibold text-indigo-700">
                {item.label}
              </label>

              {item.type === "file" ? (
                <div className="relative w-full">
 
  <div
    className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
      errors[fieldName]
        ? "border-red-400 bg-red-50"
        : "border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50"
    }`}
  >
    <input
      type="file"
      accept="image/png, image/jpeg"
      onChange={(e) => handleFileChange(e, fieldName)}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
    {watch(fieldName) ? (
      <img
        src={watch(fieldName) as string}
        alt="Preview"
        className="max-h-28 object-contain rounded-lg"
      />
    ) : (
      <span className="text-gray-400 text-sm select-none">
        Click or drag to upload PNG/JPEG
      </span>
    )}
  </div>
  {errors[fieldName]?.message && (
    <span className="text-xs text-red-500 mt-1 block">
      {String(errors[fieldName]?.message)}
    </span>
  )}
</div>

              ) : (
                <input
                  type={
                    ["password", "confirmPassword", "oldPassword", "newPassword"].includes(item.name)
                      ? showPassword[item.name]
                        ? "text"
                        : "password"
                      : item.type
                  }
                  {...register(fieldName)}
                  placeholder={item.placeholder}
                  className={`w-full px-3 py-2 border ${
                    errors[fieldName]
                      ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                      : "border-gray-300 focus:ring-indigo-400 focus:border-indigo-400"
                  } rounded-xl focus:outline-none transition-all placeholder-gray-400 shadow-sm text-sm`}
                />
              )}

              {["password", "confirmPassword", "oldPassword", "newPassword"].includes(item.name) && (
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({ ...prev, [item.name]: !prev[item.name] }))
                  }
                  className="absolute right-3 top-8 text-xs text-gray-500"
                >
                  {showPassword[item.name] ? "Hide" : "Show"}
                </button>
              )}

              {errors[fieldName]?.message && (
                <span className="text-xs text-red-500">{String(errors[fieldName]?.message)}</span>
              )}
            </div>
          );
        })}

        {validError && <p className="text-red-500 text-xs text-center mb-2">{validError}</p>}

        <div className="pt-2">{button}</div>
      </form>
    </div>
  );
};

export default RegiretForm;
