import { Heading, Text } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="flex min-h-[360px] flex-col items-start justify-center"
      data-testid="empty-cart-message"
    >
      <Heading
        level="h1"
        className="flex flex-row items-baseline gap-x-2 text-[36px] font-medium leading-none tracking-normal text-[#111111] small:text-[56px]"
      >
        Cart
      </Heading>
      <Text className="mb-6 mt-4 max-w-[32rem] text-[14px] leading-6 text-[#55504a]">
        You don&apos;t have anything in your cart. Let&apos;s change that, use
        the link below to start browsing our products.
      </Text>
      <div>
        <InteractiveLink href="/store">Explore products</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
