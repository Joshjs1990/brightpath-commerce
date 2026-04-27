"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { ShoppingBag } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined,
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)
  const latestItem = cartState?.items?.length
    ? [...cartState.items].sort((a, b) => {
        return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
      })[0]
    : null

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    itemRef.current = totalItems
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50 text-[#111111]"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full focus:outline-none">
          <LocalizedClientLink
            className="flex h-full items-center gap-1.5 hover:text-ui-fg-base"
            href="/cart"
            data-testid="nav-cart-link"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="hidden small:inline">{`Cart (${totalItems})`}</span>
            <span className="small:hidden">{totalItems}</span>
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <>
            <div
              className="fixed inset-x-3 top-[76px] z-[80] rounded-[16px] border border-black/10 bg-white/[0.985] p-4 text-[#111111] shadow-[0_24px_80px_rgba(0,0,0,0.16)] backdrop-blur-md small:hidden"
              data-testid="mobile-cart-confirmation"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50">
                    Added to cart
                  </p>
                  <h3 className="text-[18px] font-semibold leading-tight">
                    {latestItem?.title || "Item added"}
                  </h3>
                  {latestItem?.variant && (
                    <div className="mt-1 text-[12px] text-black/55">
                      <LineItemOptions variant={latestItem.variant} />
                    </div>
                  )}
                </div>
                {latestItem && (
                  <LocalizedClientLink
                    href={`/products/${latestItem.product_handle}`}
                    className="h-16 w-16 shrink-0 overflow-hidden rounded-[10px] bg-[#f3f1ed]"
                  >
                    <Thumbnail
                      thumbnail={latestItem.thumbnail}
                      images={latestItem.variant?.product?.images}
                      size="square"
                      className="!aspect-square"
                    />
                  </LocalizedClientLink>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-black/10 pt-3">
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-black/55">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
                <LocalizedClientLink href="/cart" onClick={close}>
                  <Button size="small" data-testid="mobile-go-to-cart-button">
                    View bag
                  </Button>
                </LocalizedClientLink>
              </div>
            </div>
            <PopoverPanel
              static
              className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border-x border-b border-[#111111]/10 w-[420px] text-ui-fg-base shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              data-testid="nav-cart-dropdown"
            >
              <div className="p-4 flex items-center justify-center">
                <h3 className="text-large-semi">Cart</h3>
              </div>
              {cartState && cartState.items?.length ? (
                <>
                  <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
                    {[...cartState.items]
                      .sort((a, b) => {
                        return (a.created_at ?? "") > (b.created_at ?? "")
                          ? -1
                          : 1
                      })
                      .map((item) => (
                        <div
                          className="grid grid-cols-[122px_1fr] gap-x-4"
                          key={item.id}
                          data-testid="cart-item"
                        >
                          <LocalizedClientLink
                            href={`/products/${item.product_handle}`}
                            className="w-24"
                          >
                            <Thumbnail
                              thumbnail={item.thumbnail}
                              images={item.variant?.product?.images}
                              size="square"
                            />
                          </LocalizedClientLink>
                          <div className="flex flex-col justify-between flex-1">
                            <div className="flex flex-col flex-1">
                              <div className="flex items-start justify-between">
                                <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
                                  <h3 className="text-base-regular overflow-hidden text-ellipsis">
                                    <LocalizedClientLink
                                      href={`/products/${item.product_handle}`}
                                      data-testid="product-link"
                                    >
                                      {item.title}
                                    </LocalizedClientLink>
                                  </h3>
                                  <LineItemOptions
                                    variant={item.variant}
                                    data-testid="cart-item-variant"
                                    data-value={item.variant}
                                  />
                                  <span
                                    data-testid="cart-item-quantity"
                                    data-value={item.quantity}
                                  >
                                    Quantity: {item.quantity}
                                  </span>
                                </div>
                                <div className="flex justify-end">
                                  <LineItemPrice
                                    item={item}
                                    style="tight"
                                    currencyCode={cartState.currency_code}
                                  />
                                </div>
                              </div>
                            </div>
                            <DeleteButton
                              id={item.id}
                              className="mt-1"
                              data-testid="cart-item-remove-button"
                            >
                              Remove
                            </DeleteButton>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="p-4 flex flex-col gap-y-4 text-small-regular">
                    <div className="flex items-center justify-between">
                      <span className="text-ui-fg-base font-semibold">
                        Subtotal{" "}
                        <span className="font-normal">(excl. taxes)</span>
                      </span>
                      <span
                        className="text-large-semi"
                        data-testid="cart-subtotal"
                        data-value={subtotal}
                      >
                        {convertToLocale({
                          amount: subtotal,
                          currency_code: cartState.currency_code,
                        })}
                      </span>
                    </div>
                    <LocalizedClientLink href="/cart" passHref>
                      <Button
                        className="w-full"
                        size="large"
                        data-testid="go-to-cart-button"
                      >
                        Go to cart
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </>
              ) : (
                <div>
                  <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                    <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                      <span>0</span>
                    </div>
                    <span>Your shopping bag is empty.</span>
                    <div>
                      <LocalizedClientLink href="/store">
                        <>
                          <span className="sr-only">
                            Go to all products page
                          </span>
                          <Button onClick={close}>Explore products</Button>
                        </>
                      </LocalizedClientLink>
                    </div>
                  </div>
                </div>
              )}
            </PopoverPanel>
          </>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
