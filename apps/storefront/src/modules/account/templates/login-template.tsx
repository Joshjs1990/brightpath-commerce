"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import EdgesInMotionLogo from "@modules/common/icons/edges-in-motion-logo"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="content-container flex w-full justify-center py-10 small:py-16">
      <div className="copy-panel w-full max-w-[520px] px-5 py-6 small:px-8 small:py-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] border border-black/10 bg-white/70 shadow-[0_14px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl">
            <EdgesInMotionLogo className="h-7 w-7 text-black" />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/55">
            Edges In Motion
          </p>
        </div>
        {currentView === "sign-in" ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )}
      </div>
    </div>
  )
}

export default LoginTemplate
