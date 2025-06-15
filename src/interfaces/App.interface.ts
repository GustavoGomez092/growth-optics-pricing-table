interface Brackets {
  min: number
  max?: number
  price?: number
  label?: string
}

interface PriceSlider {
  priceSliderMin: number
  priceSliderMax: number
  priceSliderStep: number
  priceSliderDefault: number
  priceSliderUnit: string
  priceSliderUnitPosition: string
  priceSliderBrackets: Brackets[]
}

interface Plan {
  name: string
  description: string
  price?: number
  hasPriceSlider: boolean
  features: string[]
  cta: string
  ctaLink: string
}

interface TimeIntervals {
  title: string
  interval: string
  featuredArea: string
  plans: Plan[]
  sliderTitle: string
  priceSliderInfo: PriceSlider
}

export interface PricingModule {
  title: string
  intervals: TimeIntervals[]
}
