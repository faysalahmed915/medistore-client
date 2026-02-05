"use client";

import { useAuth } from "@/providers/auth-provider";

const AuthButtons = () => {

const { user } = useAuth(); 
console.log(user)

    return (
        <div>
            
        </div>
    );
};

export default AuthButtons;