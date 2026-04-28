import { Button, Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="flex flex-col gap-4 rounded-[14px] border border-black/10 bg-white/60 p-4 small:flex-row small:items-center small:justify-between">
      <div>
        <Heading level="h2" className="text-[20px] font-medium leading-none">
          Already have an account?
        </Heading>
        <Text className="mt-2 text-[13px] leading-5 text-[#55504a]">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
            Sign in
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
