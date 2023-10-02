import { connect } from "@/db/config";
import { User } from "@/db/models/users";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist", success: false },
        { status: 400 }
      );
    }
    const verifyPassword = bcryptjs.compareSync(password, user.password);
    if (!verifyPassword) {
      return NextResponse.json(
        {
          message: "Incorrect password or email",
          success: false,
        },
        { status: 400 }
      );
    }
    //generate token
    const tokenData = {
      id: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JSON_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      {
        message: "Log in successful",
        success: true,
        user: { username: user.username, email: user.email },
      },
      { status: 201 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
