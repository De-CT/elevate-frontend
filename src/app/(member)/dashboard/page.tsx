"use client"
import { listSubscriptions } from "@/backend/user";
import { MemberDashboard } from "@/components/member/dashboard/MemberDashboard";
import { useEffect } from "react";
import toast from "react-hot-toast";


export default function DashboardPage() {
    const fetchSubscriptions = async () => {
        try {
            const res = await listSubscriptions()
        } catch (e: any) {
            toast.error(e.message)
        }
    }
    useEffect(() => {
        fetchSubscriptions()
    }, [])
    return <MemberDashboard />;
}