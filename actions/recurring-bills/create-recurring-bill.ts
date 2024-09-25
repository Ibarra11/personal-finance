"use server";

import { actionClient } from "@/actions/safe-action";

import { revalidatePath } from "next/cache";

import { createOrEditBillFormSchema } from "@/components/recurring-bills/form/schema";
import { createRecuringBill } from "@/services/recurring-bills/createRecurringBill";

export const createRecurringBillAction = actionClient
  .schema(createOrEditBillFormSchema)
  .action(async ({ parsedInput: { name, dueDate, amount, budgetId } }) => {
    try {
      const createdBill = await createRecuringBill({
        name,
        dueDate,
        amount,
        budgetId,
      });

      if (createdBill.length === 0) {
        return {
          success: false,
          message: "Issue creating recurring bill. Please try again.",
        };
      }

      await revalidatePath("/dashboard/recurring-bills");

      return {
        success: true,
        message: `Recurring Bill was successfully created.`,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: `An error occurred while trying to create a recurring bill.`,
      };
    }
  });
