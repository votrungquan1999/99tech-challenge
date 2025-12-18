"use server";

import { revalidatePath } from "next/cache";

export async function revalidateServerCache() {
	revalidatePath("/", "page");
}
