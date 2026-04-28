"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import EdgesInMotionLogo from "@modules/common/icons/edges-in-motion-logo"
import { Text, clx } from "@modules/common/components/ui"
import { Fragment } from "react"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { Locale } from "@lib/data/locales"

type MenuLink = {
  label: string
  href: string
}

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  categoryLinks: MenuLink[]
}

const SideMenu = ({
  regions,
  locales,
  currentLocale,
  categoryLinks,
}: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex items-center">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full items-center">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative flex h-10 items-center rounded-[10px] border border-white/60 bg-white/70 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  Menu
                </Popover.Button>
              </div>

              {open && (
                <div
                  className="fixed inset-x-0 bottom-0 top-[64px] z-[50] bg-white/35 backdrop-blur-sm pointer-events-auto"
                  onClick={close}
                  data-testid="side-menu-backdrop"
                />
              )}

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100 backdrop-blur-2xl"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 backdrop-blur-2xl"
                leaveTo="opacity-0"
              >
                <PopoverPanel className="fixed inset-x-3 top-[76px] z-[51] flex h-[calc(100dvh-88px)] max-h-[calc(100dvh-88px)] flex-col text-sm text-[#111111] small:absolute small:inset-x-auto small:left-2 small:right-auto small:top-[calc(100%+12px)] small:h-[calc(100vh-6rem)] small:max-h-[calc(100vh-6rem)] small:w-[420px]">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex min-h-full flex-col justify-between gap-10 overflow-y-auto rounded-[16px] border border-white/80 bg-white/[0.985] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.18)] backdrop-blur-md small:bg-white/96 small:p-6"
                  >
                    <div className="flex justify-end" id="xmark">
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-black/10 bg-white/70 backdrop-blur-xl"
                      >
                        <XMark />
                      </button>
                    </div>
                    <div>
                      <LocalizedClientLink
                        href="/"
                        className="mb-12 flex items-center gap-3 text-[18px] font-semibold uppercase tracking-[0.22em]"
                        onClick={close}
                      >
                        <EdgesInMotionLogo className="h-7 w-7" />
                        <span>Edges In Motion</span>
                      </LocalizedClientLink>
                      <ul className="flex flex-col gap-6 items-start justify-start">
                        {categoryLinks.map(({ label, href }) => {
                          return (
                            <li key={label}>
                              <LocalizedClientLink
                                href={href}
                                className="text-[34px] leading-none tracking-[-0.01em] hover:text-black/55"
                                onClick={close}
                                data-testid={`${label.toLowerCase()}-link`}
                              >
                                {label}
                              </LocalizedClientLink>
                            </li>
                          )
                        })}
                        <li>
                          <LocalizedClientLink
                            href="/account"
                            className="text-[34px] leading-none tracking-[-0.01em] hover:text-black/55"
                            onClick={close}
                            data-testid="account-link"
                          >
                            Account
                          </LocalizedClientLink>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-y-6">
                      {!!locales?.length && (
                        <div
                          className="flex justify-between"
                          onMouseEnter={languageToggleState.open}
                          onMouseLeave={languageToggleState.close}
                        >
                          <LanguageSelect
                            toggleState={languageToggleState}
                            locales={locales}
                            currentLocale={currentLocale}
                          />
                          <ArrowRightMini
                            className={clx(
                              "transition-transform duration-150",
                              languageToggleState.state ? "-rotate-90" : "",
                            )}
                          />
                        </div>
                      )}
                      <div
                        className="flex justify-between"
                        onMouseEnter={countryToggleState.open}
                        onMouseLeave={countryToggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={countryToggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            countryToggleState.state ? "-rotate-90" : "",
                          )}
                        />
                      </div>
                      <Text className="flex justify-between txt-compact-small text-black/55">
                        © {new Date().getFullYear()} Edges In Motion. All rights
                        reserved.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
