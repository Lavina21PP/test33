"use client";

import Link from "next/link";

export default function Page() {
  return (
    <main>
      <section className="max-w-[380px] !px-[0.6rem] !mx-auto fixed w-full translate-x-[-50%] translate-y-[-50%] left-[50%] top-[40%]">
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
            <div className="flex flex-col">
              <label htmlFor="">Username:</label>
              <input
                className="border-1 !px-2 h-[2.8rem] rounded-[6px] bg-[#f0f0f0]"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Password:</label>
              <input
                className="border-1 !px-2 h-[2.8rem] rounded-[6px] bg-[#f0f0f0]"
                type="text"
              />
            </div>
          </section>
          <section className="flex justify-between items-center !my-[0.6rem]">
            <div className="flex items-center gap-x-1">
              <div className="flex">
                <input
                  type="checkbox"
                  className="w-[1.4rem] h-[1.4rem]"
                  name=""
                  id=""
                />
              </div>
              <div className="k">Remember Me</div>
            </div>
            <div className="k">
              <div className="k">Forgot Password ?</div>
            </div>
          </section>
          <div className="d !mt-1">
            <input
              className="border-1 w-full h-[2.5rem] rounded-[6px] bg-[#2d63f6] cursor-pointer hover:bg-[#6c93cd] transition-all duration-200"
              type="button"
              value="Login"
            />
          </div>
        </div>
      </section>
      <section className="w-full fixed bottom-8 text-center">
        Don't Have an account? <Link href="/register">Register</Link>
      </section>
    </main>
  );
}
