import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const getUserDetails = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value || "";
  if (token) {
    const decodedData: any = jwt.decode(token);
    return decodedData?.id;
  }
};
