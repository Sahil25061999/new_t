import { connect } from "@/db/config";
import { User } from "@/db/models/users";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        message: "Logged Out",
        success: true,
      },
      { status: 201 }
    );
    response.cookies.delete("token");
    return response;
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
