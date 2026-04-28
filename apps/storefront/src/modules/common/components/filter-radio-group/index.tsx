import { Label, RadioGroup, Text, clx } from "@modules/common/components/ui"
type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: string
  handleChange: (value: string) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-y-3">
      <Text className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#77736d]">
        {title}
      </Text>
      <RadioGroup className="grid gap-1.5" data-testid={dataTestId}>
        {items?.map((i) => (
          <div
            key={i.value}
            className="relative"
          >
            <RadioGroup.Item
              checked={i.value === value}
              onChange={() => handleChange(i.value)}
              className="hidden peer"
              id={i.value}
              value={i.value}
            />
            <Label
              htmlFor={i.value}
              className={clx(
                "flex h-10 items-center rounded-[11px] border border-black/10 bg-white/55 px-3 !text-[13px] font-semibold text-black/70 !transform-none transition-all hover:cursor-pointer hover:border-black/20 hover:bg-white",
                {
                  "border-black bg-black text-white hover:bg-black":
                    i.value === value,
                }
              )}
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup
