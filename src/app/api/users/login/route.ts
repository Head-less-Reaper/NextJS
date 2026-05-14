
import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse , NextRequest} from "next/server";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest){
    try{
        const {email, password} = await request.json();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"Invalid credentials"}, {status:400});
        }

        //compare the password
        const isMatch = await bcrypt.compare(password, user.password);  
        if(!isMatch){
            return NextResponse.json({message:"Invalid credentials"}, {status:400});
        }
        //create a token
        const tokendata = {
            id: user._id,
            email: user.email,  
            username: user.username
        }
        const token = jwt.sign(tokendata, process.env.SECRET_TOKEN!, {expiresIn:"1h"});
        const response = NextResponse.json({
            message: "Login successful",
            userId: user._id
        }, { status: 200 });
        response.cookies.set("token", token, {httpOnly:true, secure:true, sameSite:"strict", maxAge:3600});
        return response;  
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:"Login failed"}, {status:500});
    }
}

