import { SignUp } from "@clerk/nextjs";

export default function page() {
  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <SignUp />
    </section>
  );
}
