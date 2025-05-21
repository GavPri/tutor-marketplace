"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const roles = [
  { value: "student", label: "I am a student" },
  { value: "tutor", label: "I am a tutor" },
];

export default function RoleSelectionPage() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!value) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/set-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: value }),
      });

      if (!res.ok) throw new Error("Failed to set role.");

      // Redirect or do something next
      router.push("/complete-sign-up"); 
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27 width=%2732%27 height=%2732%27 fill=%27none%27 stroke=%27rgb(15 23 42 / 0.03)%27%3e%3cpath d=%27M0 .5H31.5V32%27/%3e%3c/svg%3e')] opacity-50"></div>

      <Card className="w-full max-w-md shadow-xl border-border bg-card relative z-10">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold text-card-foreground">
            One last thing before we start
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground mt-2">
            Please select your role to personalize your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between h-14 text-base transition-all duration-200"
                >
                  {value
                    ? roles.find((role) => role.value === value)?.label
                    : "Select your role..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 shadow-xl animate-in fade-in-0 zoom-in-95 duration-100">
                <Command>
                  <CommandList>
                    <CommandEmpty>No role found.</CommandEmpty>
                    <CommandGroup className="p-1.5">
                      {roles.map((role) => (
                        <CommandItem
                          key={role.value}
                          value={role.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                          className="rounded-md py-2"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === role.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {role.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              className="w-full h-14 text-base font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.01] disabled:opacity-70 disabled:pointer-events-none"
              disabled={!value || loading}
              onClick={handleSubmit}
            >
              {loading ? "Saving..." : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
