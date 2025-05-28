import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!);

    if (typeof decodedToken === "string") {
      throw new Error("Invalid token format");
    }

    return (decodedToken as JwtPayload).id;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error occurred while verifying token");
  }
};
