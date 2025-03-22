"use client";

import { PatientFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Form } from "../ui/form";
import { CustomInput, SwitchInput } from "../custom-input";
import { toast } from "sonner";
import { createNewPatient } from "@/app/actions/patient";

export const PatientForm = ({ pid = "new-patient" }: { pid?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof PatientFormSchema>>({
    resolver: zodResolver(PatientFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      date_of_birth: undefined,
      gender: "MALE",
      phone: "",
      email: "",
      address: "",
      marital_status: "single",
      emergency_contact_name: "",
      emergency_contact_number: "",
      relation: "other",
      blood_group: "",
      allergies: "",
      medical_conditions: "",
      medical_history: "",
      insurance_provider: "",
      insurance_number: "",
      privacy_consent: true,
      service_consent: true,
      medical_consent: true,
      img: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof PatientFormSchema>) => {
    try {
      setIsLoading(true);
      const resp = await createNewPatient(values, pid);

      if (resp.success) {
        toast.success("Patient added successfully!");
        form.reset();
        router.refresh();
      } else {
        toast.error(resp.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus size={20} />
          New Patient
        </Button>
      </SheetTrigger>

      <SheetContent className="rounded-xl rounded-r-xl md:h-[90%] md:top-[5%] md:right-[1%] w-full overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Add New Patient</SheetTitle>
        </SheetHeader>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8 mt-5 2xl:mt-10"
            >
              <CustomInput
                type="input"
                control={form.control}
                name="first_name"
                placeholder="John"
                label="First Name"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="last_name"
                placeholder="Doe"
                label="Last Name"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="date_of_birth"
                label="Date of Birth"
                inputType="date"
              />

              <CustomInput
                type="radio"
                selectList={[
                  { label: "Male", value: "MALE" },
                  { label: "Female", value: "FEMALE" },
                ]}
                control={form.control}
                name="gender"
                label="Gender"
              />

              <div className="flex items-center gap-2">
                <CustomInput
                  type="input"
                  control={form.control}
                  name="email"
                  placeholder="john@example.com"
                  label="Email Address"
                />

                <CustomInput
                  type="input"
                  control={form.control}
                  name="phone"
                  placeholder="9225600735"
                  label="Contact Number"
                />
              </div>

              <CustomInput
                type="input"
                control={form.control}
                name="address"
                placeholder="1479 Street, Apt 1839-G, NY"
                label="Address"
              />

              <CustomInput
                type="select"
                selectList={[
                  { label: "Single", value: "single" },
                  { label: "Married", value: "married" },
                  { label: "Divorced", value: "divorced" },
                  { label: "Widowed", value: "widowed" },
                  { label: "Separated", value: "separated" },
                ]}
                control={form.control}
                name="marital_status"
                label="Marital Status"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="emergency_contact_name"
                placeholder="Emergency Contact Name"
                label="Emergency Contact Name"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="emergency_contact_number"
                placeholder="Emergency Contact Number"
                label="Emergency Contact Number"
              />

              <CustomInput
                type="select"
                selectList={[
                  { label: "Mother", value: "mother" },
                  { label: "Father", value: "father" },
                  { label: "Husband", value: "husband" },
                  { label: "Wife", value: "wife" },
                  { label: "Other", value: "other" },
                ]}
                control={form.control}
                name="relation"
                label="Relation with Emergency Contact"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="blood_group"
                placeholder="A+, B-, O+, etc."
                label="Blood Group"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="allergies"
                placeholder="Any allergies?"
                label="Allergies"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="medical_conditions"
                placeholder="Any medical conditions?"
                label="Medical Conditions"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="medical_history"
                placeholder="Past medical history"
                label="Medical History"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="insurance_provider"
                placeholder="Insurance Provider"
                label="Insurance Provider"
              />

              <CustomInput
                type="input"
                control={form.control}
                name="insurance_number"
                placeholder="Insurance Number"
                label="Insurance Number"
              />

              {/* <SwitchInput
                control={form.control}
                name="privacy_consent"
                label="Agree to Privacy Policy"
              />

              <SwitchInput
                control={form.control}
                name="service_consent"
                label="Agree to Terms of Service"
              />

              <SwitchInput
                control={form.control}
                name="medical_consent"
                label="Agree to Medical Treatment Terms"
              /> */}

              <Button type="submit" disabled={isLoading} className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
