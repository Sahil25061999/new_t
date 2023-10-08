import { connect } from "@/backend/db/config";
import { User } from "@/backend/db/models/users";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (request: NextRequest) => {
  try {
    let reqBody = await request.json();
    let { token, emailType } = reqBody;
    if (emailType === "VERIFY") {
      const user = await User.findOne({
        verifyToken: token,
        verifyTokenExpiry: { $gt: Date.now() },
      });
      if (!user) {
        return NextResponse.json({ message: "Token Expired" }, { status: 400 });
      }
      user.isVerifed = true;
      user.verifyToken = null;
      user.verifyTokenExpiry = null;
      await user.save();
      return NextResponse.json(
        { message: "User email verified", success: true },
        { status: 200 }
      );
    } else if (emailType === "RESET") {
    }
  } catch (e: any) {
    console.log(e)
    return NextResponse.json(
      { message: "An error occurred try again after sometime" },
      { status: 400 }
    );
  }
};
