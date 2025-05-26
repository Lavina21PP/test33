"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SendHorizontal, Eye, EyeOff } from "lucide-react";
import ButtonSub from "@/components/buttonsub";
import ButtonBtn from "@/components/buttonbtn";
export default function Page() {
  const router = useRouter();
  const goToPath = (path: string) => {
    router.push(path);
  };
  const [steps, setSteps] = useState<string>("1");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      <section className="container1 max-w-[400px] fixed w-full translate-x-[-50%] translate-y-[-50%] left-[50%] top-[40%]">
        <div className="text-center font-bold !text-[1.5rem] flex justify-center">
          <div className="k w-[7rem] md:w-[9rem]">
            <img src="/img/logo.png" alt="" />
          </div>
        </div>
        <div className="text-center font-bold !text-[1.6rem] !mt-[1rem]">
          Forgot Password
        </div>
        <div className="form flex flex-col !mt-[4rem]">
          <div className="d flex justify-end">{steps}/2</div>
          {steps === "1" ? (
            <section className="input flex flex-col gap-y-[0.5rem] h-[12rem] overflow-y-auto border-t-2 !px-[0.1rem] !pb-[0.5rem]">
              <div className="flex flex-col !mt-[0.5rem]">
                <label htmlFor="email">Email :</label>

                <div className="l relative">
                  <input
                    className="border-1 !px-2 h-[2.8rem] rounded-[6px] w-full bg-[#f0f0f0]"
                    type={"email"}
                    id="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="absolute top-[50%] right-2 -translate-y-[50%] text-[#4f4f4f] cursor-pointer">
                    <SendHorizontal size={22} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="otp">OTP :</label>
                <input
                  className="border-1 !px-2 h-[2.8rem] rounded-[6px] bg-[#f0f0f0]"
                  type="text"
                  id="otp"
                  placeholder="Enter your OTP"
                  autoComplete="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </section>
          ) : (
            steps === "2" && (
              <section className="input flex flex-col gap-y-[0.5rem] h-[12rem] overflow-y-auto border-t-2 !px-[0.1rem] !pb-[0.5rem]">
                <div className="flex flex-col !mt-[0.5rem]">
                  <label htmlFor="password1">New Password :</label>
                  <div className="l relative">
                    <input
                      className="border-1 !px-2 h-[2.8rem] rounded-[6px] w-full bg-[#f0f0f0]"
                      type={eye1 ? "text" : "password"}
                      id="password1"
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
                <div className="flex flex-col">
                  <label htmlFor="password2">Confirm Password :</label>
                  <div className="l relative">
                    <input
                      className="border-1 !px-2 h-[2.8rem] rounded-[6px] w-full bg-[#f0f0f0]"
                      type={eye2 ? "text" : "password"}
                      id="password2"
                      placeholder="enter your password"
                      autoComplete="current-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="absolute top-[50%] right-2 -translate-y-[50%] text-[#4f4f4f] cursor-pointer">
                      {eye2 ? (
                        <EyeOff size={24} onClick={onEye2} />
                      ) : (
                        <Eye size={24} onClick={onEye2} />
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )
          )}

          <section className="d !mt-[0.6rem] flex justify-between items-center gap-x-4">
            <div
              className="k bg-[#bd3636] rounded-[6px] w-full"
              onClick={() => {
                // เมื่อคลิกปุ่ม, หาก steps เป็น "1", เปลี่ยนเป็น "2"
                if (steps === "1") {
                  goToPath("/login"); // เปลี่ยนเส้นทางไปยังหน้า login
                } else if (steps === "2") {
                  setSteps("1");
                }
              }}
            >
              <ButtonBtn text={steps === "1" ? "Cancel" : "Back"} />
            </div>
            <div
              className="k bg-[#4046f2] rounded-[6px] w-full"
              onClick={() => {
                // เมื่อคลิกปุ่ม, หาก steps เป็น "1", เปลี่ยนเป็น "2"
                if (steps === "1") {
                  setSteps("2");
                } else if (steps === "2") {
                  alert("Registered Successfully!"); // แสดงข้อความเมื่อเสร็จ
                }
              }}
            >
              <ButtonBtn text={steps === "1" ? "Next" : "Confirm"} />
            </div>
          </section>
        </div>
      </section>
      {/* <section className="w-full fixed bottom-8 text-center">
        Have an account? <Link href="/login">Login</Link>
      </section> */}
    </main>
  );
}
