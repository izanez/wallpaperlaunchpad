import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function unauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="WallpaperLaunchpad Admin", charset="UTF-8"'
    }
  });
}

function decodeBasicAuthHeader(value: string) {
  if (!value.startsWith("Basic ")) {
    return null;
  }

  try {
    const encoded = value.slice("Basic ".length);
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1)
    };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const configuredUsername = process.env.ADMIN_BASIC_AUTH_USERNAME;
  const configuredPassword = process.env.ADMIN_BASIC_AUTH_PASSWORD;

  if (!configuredUsername || !configuredPassword) {
    return new NextResponse("Admin authentication is not configured.", { status: 503 });
  }

  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return unauthorizedResponse();
  }

  const credentials = decodeBasicAuthHeader(authorization);

  if (
    !credentials ||
    credentials.username !== configuredUsername ||
    credentials.password !== configuredPassword
  ) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
