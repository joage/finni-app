'use server'

import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation'
import prisma from "../../lib/prisma";
import {z} from 'zod';
import {zu} from 'zod_utilz';


export const createPatient = async (prevState: any, formData: FormData) => {
    const schema = z.object({
        firstName: z.string(),
        middleName: z.string(),
        lastName: z.string(),
        address1: z.string(),
        address2: z.string().optional(),
        address3: z.string().optional(),
        status: z.string(),
        birthDate: z.coerce.date(),
        extendedData: zu.stringToJSON().or((z.literal(''))),
    });
    try {
        const data = schema.parse({
            firstName: formData.get("firstName"),
            middleName: formData.get("middleName"),
            lastName: formData.get("lastName"),
            address1: formData.get("address1"),
            address2: formData.get("address2"),
            address3: formData.get("address3"),
            status: formData.get("status"),
            birthDate: formData.get("birthDate"),
            extendedData: formData.get("extendedData"),
        });
        await prisma.patient.create({data: {
            firstName: data.firstName, 
            middleName: data.middleName, 
            lastName: data.lastName, 
            status: data.status,
            birthDate: data.birthDate,
            addresses: [
                data.address1, 
                ... data.address2 ? [data.address2] : [],
                ... data.address3 ? [data.address3] : [],
            ],
            extendedData: data.extendedData || undefined}});
    } catch (err) {
        if (err instanceof z.ZodError) {
            return {message: `Invalid input for ${err.issues[0].path}: ${err.issues[0].message}`};
        }
        return { message: 'Failed to create patient'};
    }
    revalidatePath("/");
    redirect("/");
};