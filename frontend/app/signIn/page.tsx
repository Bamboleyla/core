import Image from "next/image";

import bg from "@/public/image/signInBG.png";
import { LogSignIn } from "@/components/forms/LogSingIn";

const SignIn = () => {
  return (
    <>
      <Image
        src={bg}
        alt="SingIn form"
        priority
        className="mx-auto w-full sm:w-4/12 md:w-full lg:w-5/12 2xl:w-4/12"
      />
      <LogSignIn type="singIn" />
    </>
  );
};

export default SignIn;
