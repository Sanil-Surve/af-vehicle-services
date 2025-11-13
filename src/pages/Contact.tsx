"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    contactNumber: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit number"),
    email: z.string().email("Enter a valid email"),
    location: z.string().min(2, "Location is required"),
    vehicle: z.string().min(2, "Specify your vehicle type"),
    hireDate: z.string().min(1, "Select hire date and time"),
    submitDate: z.string().min(1, "Select submission date and time"),
    previousCustomer: z.string().min(1, "Select an option"),
    description: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            contactNumber: "",
            email: "",
            location: "",
            vehicle: "",
            hireDate: "",
            submitDate: "",
            previousCustomer: "",
            description: "",
        },
    });

    const onSubmit = (values: ContactFormValues) => {
        (async () => {
            const { data, error } = await supabase
                .from("contact_form")
                .insert([{
                    name: values.name,
                    contactnumber: values.contactNumber,
                    email: values.email,
                    location: values.location,
                    vehicle: values.vehicle,
                    hiredate: values.hireDate,
                    submitdate: values.submitDate,
                    previouscustomer: values.previousCustomer,
                    description: values.description
                }]);

            if (error) {
                console.error("Error inserting data:", error);
                alert("Failed to submit form. Please try again.");
            } else {
                console.log("Inserted:", data);
                setIsDialogOpen(true);
                form.reset();
            }
        })();
    };

    const SuccessDialog = () => (
        isDialogOpen && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
                    <h3 className="text-xl font-semibold mb-4">Success</h3>
                    <p className="mb-6">Form submitted successfully!</p>
                    <button
                        onClick={() => setIsDialogOpen(false)}
                        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                    >
                        OK
                    </button>
                </div>
            </div>
        )
    );

    return (
        <section className="w-full flex justify-center py-16 px-6 sm:px-12 bg-yellow-300">
            <SuccessDialog />
            <div className="w-full max-w-3xl bg-gray-50 rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Contact Us
                </h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Contact Number */}
                        <FormField
                            control={form.control}
                            name="contactNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your 10-digit phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email ID</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Location */}
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your location" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Vehicle */}
                        <FormField
                            control={form.control}
                            name="vehicle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Specific Bike/Scooty/Car</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter vehicle type" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Hire Date */}
                        <FormField
                            control={form.control}
                            name="hireDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date and Time of Hiring</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submission Date */}
                        <FormField
                            control={form.control}
                            name="submitDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date and Time of Submission</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Previous Customer */}
                        <FormField
                            control={form.control}
                            name="previousCustomer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Are You A Previous Customer?</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            className="flex gap-6 mt-2"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="yes" id="yes" />
                                                <FormLabel htmlFor="yes">Yes</FormLabel>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="no" id="no" />
                                                <FormLabel htmlFor="no">No</FormLabel>
                                            </div>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description / Additional Data</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Add any extra information here..."
                                            className="resize-none"
                                            rows={4}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    );
};

export default Contact;
