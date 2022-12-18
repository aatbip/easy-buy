import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  if (req.url.includes("/hostDashboard")) {
    return verifyHost(req, res);
  }

  if (req.url.includes("/manage-products")) {
    return verifyHost(req, res);
  }
}

const verifyHost = (req: NextRequest, res: NextResponse) => {
  if (!req.cookies.get("userCredentials")) {
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    let userCredentials = req.cookies.get("userCredentials")?.value;
    if (userCredentials) {
      let user = JSON.parse(userCredentials);
      if (user.role !== "host") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  }
  return null;
};
