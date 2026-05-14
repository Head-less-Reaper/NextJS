import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse , NextRequest} from "next/server";
import bcrypt from "bcryptjs";
connect();

export async function POST(request: NextRequest){
    try{
        const {email, password, username} = await request.json();
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({message:"User already exists"}, {status:400});
        }
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hashedPassword,
            username
        });
        await newUser.save();
        return NextResponse.json({message:"User created successfully"}, {status:201});
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message:"Signup failed"}, {status:500});
    }
}