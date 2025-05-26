"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "@/components/buttonsub";
import { SendHorizontal, Eye, EyeOff } from "lucide-react";
export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onLogin = () => {
    // Perform login logic here
    console.log("Logging in with", { username, password });
  };

  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);

  const onEye1 = () => {
    setEye1(!eye1);
  };
  const onEye2 = () => {
    setEye2(!eye2);
  };

  return (
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}
      >
        <section className="container1 max-w-[400px] fixed w-full translate-x-[-50%] translate-y-[-50%] left-[50%] top-[40%]">
          <div className="text-center font-bold !text-[1.5rem] flex justify-center">
            <div className="k w-[7rem] md:w-[9rem]">
              <img src="/img/logo.png" alt="" />
            </div>
          </div>
          <div className="text-center font-bold !text-[1.6rem] !mt-[1rem]">
            Login
          </div>
          <div className="form flex flex-col !mt-[4rem]">
            <section className="input flex flex-col gap-y-[0.5rem]">
              <div className="">
                <label htmlFor="username">Username:</label> <br />
                <input
                  className="border-1 w-full !px-2 h-[2.8rem] rounded-[6px] bg-[#f0f0f0]"
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  autoComplete="username"
                  onFocus={(e) => {
                    e.target.setAttribute("autocomplete", "off");
                  }}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="">
                <label htmlFor="password">Password:</label> <br />
                <div className="l relative">
                    <input
                      className="border-1 !px-2 h-[2.8rem] rounded-[6px] w-full bg-[#f0f0f0]"
                      type={eye1 ? "text" : "password"}
                      id="password"
                      placeholder="enter your password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute top-[50%] right-2 -translate-y-[50%] text-[#4f4f4f] cursor-pointer">
                      {eye1 ? (
                        <EyeOff size={24} onClick={onEye1} />
                      ) : (
                        <Eye size={24} onClick={onEye1} />
                      )}
                    </div>
                  </div>
              </div>
            </section>
            <section className="flex justify-between items-center !my-[0.6rem]">
              <div className="flex items-center gap-x-1">
                <div className="flex">
                  <input
                    type="checkbox"
                    className="w-[1.4rem] h-[1.4rem]"
                    id="remember"
                  />
                </div>
                <label htmlFor="remember">Remember Me</label>
              </div>
              <div className="k">
                <Link href="/forgotpassword">Forgot Password ?</Link>
              </div>
            </section>
            <div className="!mt-1 bg-[#4046f2] rounded-[6px]">
              <Button text="Login"/>
            </div>
          </div>
        </section>
      </form>

      <section className="w-full fixed bottom-8 text-center">
        Don't Have an account? <Link href="/register">Register</Link>
      </section>
    </main>
  );
}
