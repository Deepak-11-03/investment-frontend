import { FieldProps } from "formik";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Fragment } from "react";

interface SelectFieldProps extends FieldProps {
    placeholder?: string;
    label?: string,
    fieldName?: string,
    error?: string,
    options: [{
        value: string;
        label: string;
    }];
}

const SelectField: React.FC<SelectFieldProps> = ({ field, form, placeholder, options, label, fieldName,error }) => {
    const handleChange = (value: string) => {
        form.setFieldValue(field.name, value); // Update Formik state
    };

    return (
        <div>
            <label htmlFor={fieldName} className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>
            <Select onValueChange={handleChange} value={field.value}>
                <SelectTrigger className={`w-full rounded-md resize-none bg-white px-3 py-2 text-base text-gray-900  outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-gray-800 sm:text-sm ${error ? 'outline-red-500 focus:outline-red-500' : ''}`} id={fieldName}>
                    <SelectValue placeholder={placeholder || "Select Type"} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectField;
