import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="py-8 small:py-12">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 gap-5 small:grid-cols-[1fr_360px] small:items-start small:gap-x-8 medium:gap-x-12">
            <div className="copy-panel flex flex-col gap-y-6 overflow-hidden p-4 small:p-6">
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider />
                </>
              )}
              <ItemsTemplate cart={cart} />
            </div>
            <div className="relative">
              <div className="sticky top-24 flex flex-col gap-y-8">
                {cart && cart.region && (
                  <div className="copy-panel p-4 small:p-6">
                    <Summary cart={cart} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="copy-panel p-5 small:p-8">
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
