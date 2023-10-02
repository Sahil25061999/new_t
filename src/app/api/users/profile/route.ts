import { getUserDetails } from "@/helpers/getUserDetails";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/db/models/users";
import { connect } from "@/db/config";

connect();
export async function GET (request: NextRequest) {
  try {
    const id =await getUserDetails(request);
    const userDetails = await User.findOne({ _id: id }).select("-password");
    if (userDetails) {
      return NextResponse.json(
        {
          message: "User Details fetched",
          success: true,
          data: userDetails,
        },
        {
          status: 200,
        }
      );
    } else {
      NextResponse.json({ message: "User Details not found" }, { status: 400 });
    }
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
};
