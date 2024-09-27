"use client";
import { USER_API_ROUTES } from "@/src/Utils/api-routes";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";

const Success = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const paymentIntent = searchParams.get("payment_intent");

    useEffect(() => {
        const updateOrderInfo = async () => {
            try {
                await axios.patch(USER_API_ROUTES.CREATE_BOOKING, { paymentIntent });
                setTimeout(() => {
                    router.push("/my-bookings");
                }, 3000);
            } catch (error) {
                console.error("Error updating order info:", error);
                // Handle error (optional)
            }
        };

        if (paymentIntent) {
            updateOrderInfo();
        }
    }, [paymentIntent, router]);

    return (
        <div className="h-[80vh] flex items-center px-20 pt-20 flex-col">
            <h1 className="text-2xl text-center">Payment successful. You are being redirected to the booking page.</h1>
            <h1 className="text-4xl text-center">Please do not close the page.</h1>
        </div>
    );
};

// Wrap the Success component in a Suspense boundary
const SuccessWrapper = () => (
    <React.Suspense fallback={<div>Loading...</div>}>
        <Success />
    </React.Suspense>
);

export default SuccessWrapper;
