"use client";

import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";



export default function ProfilePage() {
    const router = useRouter();
    async function logout() {
        
        try {
            await axios.get("/api/users/logout"); 
            toast.success("Logout successful");  
            router.push("/login");
        } catch (error) {
            console.log(error);
            toast.error("Logout failed");
        }   
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <button
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={logout}
            >Logout</button>
        </div>
    );  
}