import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  iat: number;
  exp?: number;
  [key: string]: any;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json("Method Not Allowed");
    }
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "There is no token provided",
      });
    }

    // Get JWT secret from environment variables
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json({ message: "Server configuration error" });
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    // Return success with user info
    return NextResponse.json({
      valid: true,
      message: "Token is valid",
      user: {
        id: decoded.id,
      },
    });
  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ valid: false, message: "Invalid token" });
    } else if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ valid: false, message: "Token expired" });
    } else {
      return NextResponse.json({ valid: false, message: "Server error" });
    }
  }
}
