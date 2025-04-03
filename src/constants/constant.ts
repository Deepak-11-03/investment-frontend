import { NavLink } from "@/types/type";

// ✅ NavLinks Array
export const navlinks: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact-us" },
];

// ✅ Why Choose Us Section (Fixed Naming)
export const WHY_CHOOSE_US = [
    {
        title: "Customer Satisfaction",
        description: "Integer consequat eros sed seroni tempor aliquetaesente in minibh consecter anulla alacinia."
    },
    {
        title: "Financial News Update",
        description: "Sequis lorem sit amet las vehicula viverra sedeget nul donec at nunc estaecenas auctor odioe."
    },
    {
        title: "Putting Clients First",
        description: "Cras accumsan isl nonante cursus fermentuusce tincidunt pretium lacus, a tempor nunc vu."
    },
    {
        title: "Giving Back",
        description: "Vestibulum viverra vierra placerat praesent quis accumsan nunc ac fermentum libero liquam."
    },
];

// ✅ Transaction Types (Fixed `any`)
export interface TransactionType {
    label: string;
    value: "credit" | "debit";
}

export const TRANSACTION: TransactionType[] = [
    { label: "Credit", value: "credit" },
    { label: "Debit", value: "debit" },
];

// ✅ Token (Use Env Variable If Needed)
export const COOKIE_TOKEN: string = "token";
