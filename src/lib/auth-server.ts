import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getServerSession() {
    "use server"
    return await auth.api.getSession({
        headers: await headers(),
    });
}