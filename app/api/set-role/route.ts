import { createClerkClient } from "@clerk/backend";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST(req: Request) {
  // set the user id
  const { userId } = await auth();

  // check for user Id
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  const { role } = await req.json();

  if (!role) {
    return new NextResponse("No role selected, please select a role.", {
      status: 500,
    });
  }

  try {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role },
    });

    return new NextResponse("Successfully added role", { status: 200 });
  } catch (error) {
    console.error("Failed to update user role:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
