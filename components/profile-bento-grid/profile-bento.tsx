"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function StudentProfileBentoGrid() {
  const { user, isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const name = user?.fullName || "Student";
  const profileImage = user?.imageUrl || "/placeholder.svg";
  const role = user?.publicMetadata?.role || "No role set";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Welcome Card */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Welcome back, {name}!</CardTitle>
          <CardDescription>Your learning journey continues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Profile Completion
              </span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="ml-auto">
            Complete Your Profile
          </Button>
        </CardFooter>
      </Card>

      {/* Profile Overview */}
      <Card className="col-span-1 row-span-2">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Profile Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profileImage} alt={name} />
            <AvatarFallback>
              <User className="h-12 w-12" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1 capitalize">
              Role: {typeof role === "string" ? role : "No role set"}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Edit Profile</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
