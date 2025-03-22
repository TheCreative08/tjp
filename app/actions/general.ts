"use server";

import {
  ReviewFormValues,
  reviewSchema,
} from "@/components/dialogs/review-form";
import db from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";

export async function deleteDataById(
  id: string,
  deleteType: "doctor" | "staff" | "patient" | "payment" | "bill"
) {
  try {
    let recordExists = null;

    switch (deleteType) {
      case "doctor":
        recordExists = await db.doctor.findUnique({ where: { id } });
        if (!recordExists)
          return { success: false, message: "Doctor not found", status: 404 };
        await db.doctor.delete({ where: { id } });
        break;

      case "staff":
        recordExists = await db.staff.findUnique({ where: { id } });
        if (!recordExists)
          return { success: false, message: "Staff not found", status: 404 };
        await db.staff.delete({ where: { id } });
        break;

      case "patient":
        recordExists = await db.patient.findUnique({ where: { id } });
        if (!recordExists)
          return { success: false, message: "Patient not found", status: 404 };
        await db.patient.delete({ where: { id } });
        break;

      case "payment":
        recordExists = await db.payment.findUnique({
          where: { id: Number(id) },
        });
        if (!recordExists)
          return { success: false, message: "Payment not found", status: 404 };
        await db.payment.delete({ where: { id: Number(id) } });
        break;

      default:
        return { success: false, message: "Invalid delete type", status: 400 };
    }

    if (["staff", "patient", "doctor"].includes(deleteType)) {
      const client = await clerkClient();
      try {
        console.log('Deleting user from Clerk with ID:', id);
        await client.users.deleteUser(id); // Clerk user deletion
      } catch (clerkError) {
        console.error('Clerk user deletion failed:', clerkError);
        return { success: false, message: 'Failed to delete user from Clerk', status: 500 };
      }
    }

    return { success: true, message: "Deleted Successfully", status: 200 };
  } catch (error) {
    console.error('Failed to delete record:', error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}

// export async function deleteDataById(
//   id: string,
//   deleteType: "doctor" | "staff" | "patient" | "payment" | "bill"
// ) {
//   try {
//     let recordExists = null;

//     switch (deleteType) {
//       case "doctor":
//         recordExists = await db.doctor.findUnique({ where: { id } });
//         if (!recordExists)
//           return { success: false, message: "Doctor not found", status: 404 };
//         await db.doctor.delete({ where: { id } });
//         break;

//       case "staff":
//         recordExists = await db.staff.findUnique({ where: { id } });
//         if (!recordExists)
//           return { success: false, message: "Staff not found", status: 404 };
//         await db.staff.delete({ where: { id } });
//         break;

//       case "patient":
//         recordExists = await db.patient.findUnique({ where: { id } });
//         if (!recordExists)
//           return { success: false, message: "Patient not found", status: 404 };
//         await db.patient.delete({ where: { id } });
//         break;

//       case "payment":
//         recordExists = await db.payment.findUnique({
//           where: { id: Number(id) },
//         });
//         if (!recordExists)
//           return { success: false, message: "Payment not found", status: 404 };
//         await db.payment.delete({ where: { id: Number(id) } });
//         break;

//       default:
//         return { success: false, message: "Invalid delete type", status: 400 };
//     }

//     if (["staff", "patient", "doctor"].includes(deleteType)) {
//       const client = await clerkClient();
//       await client.users.deleteUser(id);
//     }

//     return { success: true, message: "Deleted Successfully", status: 200 };
//   } catch (error) {
//     console.log(error);
//     return { success: false, message: "Internal Server Error", status: 500 };
//   }
// }

export async function createReview(values: ReviewFormValues) {
  try {
    const validatedFields = reviewSchema.parse(values);

    await db.rating.create({
      data: {
        ...validatedFields,
      },
    });

    return {
      success: true,
      message: "Review created successfully",
      status: 200,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Internal Server Error",
      status: 500,
    };
  }
}
