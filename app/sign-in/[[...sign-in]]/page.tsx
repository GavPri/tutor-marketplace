import { SignIn } from "@clerk/nextjs";

export default function page() {
  return (
    <section className="h-screen flex justify-center items-center mt-24">
      <SignIn />
    </section>
  );
}
