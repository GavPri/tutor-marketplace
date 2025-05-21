"use client";

import { useEffect, useState } from "react";
import { useSession, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CompleteSignUpForm() {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [subjectInput, setSubjectInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();
  const { session } = useSession();

  // Create Supabase client inline
  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        async accessToken() {
          return session?.getToken() ?? null;
        },
      }
    );
  }

  const supabase = createClerkSupabaseClient();

  const handleAddSubject = () => {
    if (subjectInput.trim()) {
      setSubjects([...subjects, subjectInput.trim()]);
      setSubjectInput("");
    }
  };

  const handleRemoveSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || (e.key === "," && subjectInput.trim())) {
      e.preventDefault();
      handleAddSubject();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user?.id) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    const role = user.publicMetadata.role as "tutor" | "student" | undefined;
    if (!role) {
      setError("Missing user role in metadata.");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const bio = formData.get("bio") as string;
    const location = formData.get("location") as string;
    const credentials = formData.get("credentials") as string | null;
    const experience = formData.get("experience") as string | null;
    const learningGoals = formData.get("learningGoals") as string | null;

    const profileData: any = {
      user_id: user.id,
      role,
      bio,
      location,
      subjects,
    };

    if (role === "tutor") {
      profileData.credentials = credentials;
      profileData.experience = experience ? Number(experience) : null;
    } else {
      profileData.learning_goals = learningGoals;
    }

    try {
      const { error } = await supabase.from("profiles").upsert(profileData);
      if (error) {
        setError(error.message);
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Loading user...</p>;

  const role = user.publicMetadata.role as "tutor" | "student" | undefined;
  if (!role) return <p>Role not found.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="text-center">
            Please provide additional information as a {role}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="text-red-600 font-semibold text-center">{error}</p>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself..."
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, Country"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subjects">Subjects</Label>
                <div className="flex space-x-2">
                  <Input
                    id="subjects"
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add subjects (Enter or comma)"
                  />
                  <Button
                    type="button"
                    onClick={handleAddSubject}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                {subjects.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        <span>{subject}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubject(index)}
                          className="text-gray-500 hover:text-gray-700"
                          disabled={loading}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {role === "tutor" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="credentials">Credentials</Label>
                  <Input
                    id="credentials"
                    name="credentials"
                    placeholder="Your qualifications"
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    placeholder="0"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="learningGoals">Learning Goals</Label>
                  <Textarea
                    id="learningGoals"
                    name="learningGoals"
                    placeholder="What do you hope to achieve?"
                    className="min-h-[100px]"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Complete Sign-Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
