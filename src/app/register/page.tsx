"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const goToPath = (path: string) => {
    router.push(path);
  };
  const [steps, setSteps] = useState<string>("1");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <main>
      <section className="max-w-[380px] !px-[0.6rem] !mx-auto fixed w-full translate-x-[-50%] translate-y-[-50%] left-[50%] top-[40%]">
        <div className="text-center font-bold !text-[1.5rem] flex justify-center">
          <div className="k w-[7rem] md:w-[9rem]">
            <img src="/img/logo.png" alt="" />
          </div>
        </div>
        <div className="text-center font-bold !text-[1.6rem] !mt-[1rem]">
          Register
        </div>
        <div className="form flex flex-col !mt-[4rem]">
          <div className="d flex justify-end">{steps}/2</div>
          {steps === "1" ? (
            <section className="input flex flex-col gap-y-[0.5rem] h-[12rem] overflow-y-auto border-t-2">
              <div className="flex flex-col !mt-[0.5rem]">
                <label htmlFor="">Username:</label>
                <input
                  className="border-1 !px-2 h-[2.8rem] rounded-[6px] bg-[#f0f0f0]"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Email:</label>
                <input
                  className="border-1 !px-2 h-[2.8rem] rounded-[6px] bg-[#f0f0f0]"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Password:</label>
                <input
                  className="border-1 !px-2 h-[2.8rem] rounded-[6px] bg-[#f0f0f0]"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Confirm Password:</label>
                <input
                  className="border-1 !px-2 h-[2.8rem] rounded-[6px] bg-[#f0f0f0]"
                  type="text"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </section>
          ) : (
            steps === "2" && (
              <section className="input flex flex-col gap-y-[0.5rem] h-[12rem] overflow-y-auto border-t-2">
                <div className="flex flex-col !mt-[0.5rem]">
                  <label htmlFor="">Email :</label>
                  <input
                    className="border-1 !px-2 h-[2.8rem] rounded-[6px] bg-[#f0f0f0]"
                    type="text"
                    disabled={true}
                    value={email} // แสดงอีเมลที่กรอกในขั้นตอนที่ 1
                    onChange={(e) => setEmail(e.target.value)} // ป้องกันการเปลี่ยนแปลงอีเมล
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">OTP :</label>
                  <input
                    className="border-1 !px-2 h-[2.8rem] rounded-[6px] bg-[#f0f0f0]"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)} // อัปเดตค่า OTP ที่กรอก
                  />
                </div>
              </section>
            )
          )}

          <section className="d !mt-[0.6rem] flex justify-between items-center gap-x-4">
            <input
              className="border-1 w-full h-[2.5rem] rounded-[6px] bg-[#2d63f6] cursor-pointer hover:bg-[#6c93cd] transition-all duration-200"
              type="button"
              value={steps === "1" ? "Cancel" : "Back"} // เปลี่ยนค่า value ตามค่า steps
              onClick={() => {
                // เมื่อคลิกปุ่ม, หาก steps เป็น "1", เปลี่ยนเป็น "2"
                if (steps === "1") {
                  goToPath("/login"); // เปลี่ยนเส้นทางไปยังหน้า login
                } else if (steps === "2") {
                  setSteps("1");
                }
              }}
            />
            <input
              className="border-1 w-full h-[2.5rem] rounded-[6px] bg-[#2d63f6] cursor-pointer hover:bg-[#6c93cd] transition-all duration-200"
              type="button"
              value={steps === "1" ? "Next" : "Register"} // เปลี่ยนค่า value ตามค่า steps
              onClick={() => {
                // เมื่อคลิกปุ่ม, หาก steps เป็น "1", เปลี่ยนเป็น "2"
                if (steps === "1") {
                  setSteps("2");
                } else if (steps === "2") {
                  alert("Registered Successfully!"); // แสดงข้อความเมื่อเสร็จ
                }
              }}
            />
          </section>
        </div>
      </section>
      <section className="w-full fixed bottom-8 text-center">
        Have an account? <Link href="/login">Login</Link>
      </section>
    </main>
  );
}
