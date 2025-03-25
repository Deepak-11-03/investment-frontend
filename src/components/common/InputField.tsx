import { InputFieldProps } from "@/types/type"
import { Field } from "formik"
import ErrorField from "./ErrorField";

const InputField = ({ type, name, label, error, required,optional,...attr}:InputFieldProps) => {

    const isTextarea = type === 'textarea';
    return (
        <div>
            <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
                {label}
                {optional && <span className="text-gray-500 ps-1 text-xs">(optional)</span>}
                {required && <span className="text-red-600 ps-1">*</span>}
            </label>
            {isTextarea ? (
          <Field
            as="textarea" // textarea when type is "textarea"
            id={name}
            name={name}
            rows={4} // You can adjust the height
            className={`block w-full rounded-md resize-none bg-white px-3 py-2 text-base text-gray-900  
      outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-gray-500 sm:text-sm ${error ? 'outline-red-500 focus:outline-red-500' : ''}`}
            {...attr}
          />
        ) : (
          <Field
            id={name}
            name={name}
            type={type}
            autoFocus={false}
              className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-gray-500 sm:text-sm ${error ? 'outline-red-500 focus:outline-red-500' : ''}`}
            {...attr}
          />
        )}
        {error && <ErrorField message={error}/> }
        </div>
    )
}

export default InputField