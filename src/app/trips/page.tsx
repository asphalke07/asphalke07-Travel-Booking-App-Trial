"use client";
import { TripType } from "@/src/types/trips";
import { USER_API_ROUTES } from "@/src/Utils/api-routes";
import { Button, Chip } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

const Trips = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchCity = searchParams.get("city");
    const [trips, setTrips] = useState<TripType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${USER_API_ROUTES.GET_CITY_TRIPS}?city=${searchCity}`
                );
                if (response.data.trips) {
                    setTrips(response.data.trips);
                } else {
                    setError("No trips found.");
                }
            } catch (err) {
                console.error("Error fetching trips:", err);
                setError("Failed to fetch trips. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (searchCity) fetchData();
    }, [searchCity]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="m-10 px-[5vw] min-h-[80vh]">
            <Button className="my-5" variant="shadow" color="primary" size="lg" onClick={() => router.push("/")}>
                <FaChevronLeft /> Go Back
            </Button>
            <div className="grid grid-cols-2 gap-5">
                {trips.map((trip) => (
                    <div
                        key={trip.id}
                        className="grid grid-cols-9 rounded-2xl gap-5 border border-neutral-300 cursor-pointer"
                        onClick={() => router.push(`/trips/${trip.id}`)}
                    >
                        <div className="relative w-full h-48 rounded-s-2xl rounded-t-none col-span-3 overflow-hidden">
                            <Image src={trip.images[0]} alt="trip" className="rounded-s-2xl" fill />
                        </div>
                        <div className="col-span-6 pt-5 pr-5 flex flex-col gap-1">
                            <div className="flex gap-4 text-green-500">
                                <div>{trip.days} days</div>
                                <div>{trip.nights} nights</div>
                            </div>
                            <h2 className="text-lg font-medium capitalize">
                                <span className="line-clamp-1">{trip.name}</span>
                            </h2>
                            <div>
                                <ul className="flex gap-5 w-full overflow-hidden pt-1">
                                    {trip.destinationDetails.map((detail) => (
                                        <li key={detail.name}>
                                            <Chip color="warning" variant="flat">
                                                {detail.name}
                                            </Chip>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="line-clamp-2 text-xs">{trip.description}</p>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="text-sm">{trip.id}</span>
                                <span className="font-bold text-red-500">₹{trip.price} / Person</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Wrap the Trips component in a Suspense boundary
const TripsWrapper = () => (
    <React.Suspense fallback={<div>Loading...</div>}>
        <Trips />
    </React.Suspense>
);

export default TripsWrapper;
