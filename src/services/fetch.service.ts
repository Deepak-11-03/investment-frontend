import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function httpRequest(
    endpoint: string,
    method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
    body?: any,
    extraHeaders?: HeadersInit
) {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return null;
    }

    const headers: HeadersInit = {
        ...extraHeaders, // Allow extra headers if needed
        Cookie: `token=${token}`, 
        "Content-Type": "application/json",
    };

    const options: RequestInit = {
        method,
        headers,
        cache: "no-store",
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res:Response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    let response = await res?.json()

    if (!res.ok) {
        return null;
    }

    return response?.data
}

export default httpRequest;
