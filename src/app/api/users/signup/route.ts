import { connect } from "@/backend/db/config";
import { User } from "@/backend/db/models/users";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/helpers/mailer";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    //hash password
    const salt = await bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    const newUser = await new User({
      username,
      email,
      password: hashPassword,
    });
    const saveUser = await newUser.save();
    //send email for verification
    await sendMail({ email, emailType: "VERIFY", userId: newUser._id });
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        user: { username: saveUser.username, email: saveUser.email },
      },
      { status: 201 }
    );
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
