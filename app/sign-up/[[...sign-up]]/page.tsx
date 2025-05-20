import { SignUp } from "@clerk/nextjs";

export default function page() {
  return (
    <section className=" h-fit flex justify-center items-center mt-32">
      <SignUp />
    </section>
  );
}
