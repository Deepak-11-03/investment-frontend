"use client";

import { useRouter, usePathname } from "next/navigation";

export default function useLocation() {
    const router = useRouter();
    const pathname = usePathname();

    // Navigate to a new route
    const navigate = (path: string) => {
        router.push(path);
    };

    return { pathname, navigate };
}
