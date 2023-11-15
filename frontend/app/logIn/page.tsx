import Image from "next/image";

import bg from "@/public/image/logInBG.png";
import { LogSignIn } from "@/components/forms/LogSingIn";

const LogIn = () => {
  return (
    <div className="mx-auto">
      <Image
        src={bg}
        alt="Login form"
        className="mx-auto sm:w-5/12 md:w-full lg:w-5/12 2xl:w-4/12"
        priority
      />
      <LogSignIn type="logIn" />
    </div>
  );
};

export default LogIn;
