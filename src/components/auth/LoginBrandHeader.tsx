import Image from "next/image";
import logo from "@/assets/images/logo.png";

export function LoginBrandHeader() {
  return (
    <div className="flex flex-col items-center mb-8 text-center">
      <div className="w-62 h-20 mb-4 rounded-2xl flex items-center justify-center p-2 transition-transform duration-300 hover:scale-105">
        <Image
          src={logo}
          alt="Elevate Heart Foundation logo mark"
          width={248}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
        Welcome Back
      </h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 max-w-xs">
        Log in to continue to your Elevate Heart account.
      </p>
    </div>
  )
}