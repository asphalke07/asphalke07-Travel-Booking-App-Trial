import { apiClient } from "@/src/lib";
import { ADMIN_API_ROUTES } from "@/src/Utils";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ScrapingQueue = () => {
    const [onGoingJobs, setOnGoingJobs] = useState(0);

    useEffect(() => {
        const getData = async () => {
            const data = await axios.get(ADMIN_API_ROUTES.JOB_DETAILS);
            setOnGoingJobs(data.data.onGoingJobs);
};

const interval = setInterval(() => getData(), 3000);

return () => {
    clearInterval(interval);
};
    }, []);

const onGoingColor = ()=>{
    if(onGoingJobs<=5) return "bg-green-500";
    else if (onGoingJobs<=10) return "bg-orange-500";
    else return "bg-red-500";
}
const onGoingTextColor = ()=>{
    if(onGoingJobs<=5) return "text-green-500";
    else if (onGoingJobs<=10) return "text-orange-500";
    else return "text-red-500";
}
return (
    <Card className="h-full">
        <CardHeader>Current Queue</CardHeader>
        <CardBody className="flex items-center justify-center">
            <div className={`h-52 w-52 rounded-full flex items-center justify-center ${onGoingColor()}`}>
                <div className="h-44 w-44 bg-white rounded-full flex items-center justify-center">
                    <h4 className={`text-6xl font-bold ${onGoingTextColor()}`}>{onGoingJobs}</h4>
                </div>
            </div>
        </CardBody>
    </Card>
);
};

export default ScrapingQueue;