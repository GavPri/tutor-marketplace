"use client";

import { useUser } from "@clerk/nextjs";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function StudentProfileBentoGrid() {
  const { user, isLoaded } = useUser();
  const { profile, loading, error } = useUserProfile();

  if (!isLoaded || loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="col-span-1 lg:col-span-3 row-span-1 border border-neutral-200 shadow-sm">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 flex flex-col items-center justify-center p-6">
              <Skeleton className="h-28 w-28 rounded-full" />
              <Skeleton className="h-6 w-32 mt-4" />
              <Skeleton className="h-4 w-24 mt-2" />
              <Skeleton className="h-4 w-20 mt-2" />
              <Skeleton className="h-10 w-full mt-4" />
            </div>

            <div className="lg:w-2/3 p-6 lg:border-l border-neutral-200">
              <Skeleton className="h-6 w-40 mb-4" />
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-20 w-full rounded-lg" />
              <Skeleton className="h-4 w-24 mt-4 mb-2" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const name = user?.fullName || "Student";
  const profileImage = user?.imageUrl || "/placeholder.svg";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <Card className="col-span-1 lg:col-span-3 row-span-1 border border-neutral-200 overflow-hidden relative bg-gradient-to-b from-white to-neutral-50 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200" />
        <div className="absolute top-0 right-0 w-24 h-24 bg-neutral-100 rounded-full opacity-20 -mr-8 -mt-8" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-neutral-100 rounded-full opacity-20 -ml-16 -mb-16" />

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 flex flex-col items-center justify-center p-6 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neutral-200 to-neutral-300 blur-md opacity-50 scale-110" />
              <Avatar className="h-28 w-28 border-4 border-white shadow-md relative">
                <AvatarImage
                  src={profileImage || "/placeholder.svg"}
                  alt={name}
                />
                <AvatarFallback className="bg-gradient-to-br from-neutral-100 to-neutral-200">
                  <User className="h-14 w-14 text-neutral-500" />
                </AvatarFallback>
              </Avatar>
            </div>

            <h3 className="font-semibold text-xl text-neutral-800 mt-4">
              {name}
            </h3>

            <div className="flex items-center justify-center space-x-1 text-sm text-neutral-600 mt-2">
              <span className="capitalize font-medium bg-neutral-100 px-3 py-1 rounded-full">
                {profile?.role || "No role set"}
              </span>
            </div>

            {profile?.location && (
              <div className="flex items-center justify-center text-sm text-neutral-500 mt-2 mb-8">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{profile.location}</span>
              </div>
            )}

            <div className="mt-8 lg:mt-auto">
              <Button className="w-full bg-gradient-to-r from-neutral-700 to-neutral-800 hover:from-neutral-800 hover:to-neutral-900 text-white shadow-md transition-all duration-300">
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="lg:w-2/3 p-6 lg:border-l border-neutral-200 relative z-10">
            <CardHeader className="pb-2 px-0 pt-0 lg:pt-0">
              <CardTitle className="text-lg font-semibold text-neutral-800">
                Profile Overview
              </CardTitle>
            </CardHeader>

            <CardContent className="px-0 pb-0">
              <div className="space-y-4">
                {profile?.bio && (
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 mb-2">
                      Bio
                    </h4>
                    <p className="text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                      {profile.bio}
                    </p>
                  </div>
                )}

                {profile?.subjects?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 mb-2">
                      Subjects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.subjects.map((subject: string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gradient-to-r from-neutral-100 to-neutral-200 rounded-full text-xs font-medium text-neutral-700 shadow-sm border border-neutral-200"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
