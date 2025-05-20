"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";

export default function AuthSection() {
  const { isSignedIn } = useUser();

  return isSignedIn ? (
    <UserButton />
  ) : (
    <>
      <Link href={"/sign-in"}>
        <Button
          variant="outline"
          className="hidden sm:inline-flex rounded-full"
        >
          Sign In
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button className="rounded-full">Sign Up</Button>
      </Link>
    </>
  );
}
