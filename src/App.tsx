import RangeSlider from "react-range-slider-input"
import "react-range-slider-input/dist/style.css"
import type { PricingModule } from "./interfaces/App.interface"
import { useState } from "react"

function App(props: { data: PricingModule }) {
  const [activeInterval, setActiveInterval] = useState(
    props.data.intervals[0].title
  )

  const currentInterval = props.data.intervals.find(
    (interval) => interval.title === activeInterval
  )

  const [revenue, setRevenue] = useState(
    currentInterval?.priceSliderInfo.priceSliderDefault || 0
  )

  const currentBracket =
    currentInterval?.priceSliderInfo?.priceSliderBrackets.find(
      (bracket) =>
        revenue >= bracket.min &&
        (bracket.max === undefined || revenue <= bracket.max)
    )

  return (
    <div className="main-container w-full lg:w-7xl mx-auto px-2 lg:px-4 xl:px-0 py-14 lg:py-24">
      <div className="top-area flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-12 lg:pb-20">
        <h1 className="!text-[46px] lg:!text-[72px] !w-full !max-w-[560px] !font-bold">
          {props.data.title}
        </h1>
        <div className="plan-intervals flex flex-row gap-8 bg-[#F5F5F5] p-3.5 rounded-full">
          {props.data.intervals.map((interval) => (
            <div
              key={interval.title}
              onClick={() => {
                setActiveInterval(interval.title)
                setRevenue(interval.priceSliderInfo?.priceSliderDefault || 0)
              }}
              className={`plan-interval py-1 lg:py-2 px-2 lg:px-4 rounded-full cursor-pointer ${
                activeInterval === interval.title ? "bg-white" : ""
              }`}
            >
              <p className="text-[18px] lg:text-[24px]">
                {interval.title}
                {interval.featuredArea !== "" ? (
                  <span className="main-gradient py-1 lg:py-2 px-2 lg:px-4 rounded-full ml-2.5">
                    {interval.featuredArea}
                  </span>
                ) : null}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="plans-area flex flex-wrap gap-2">
        {currentInterval?.plans.map((plan) => (
          <div
            key={plan.name}
            className={`plan-card bg-white rounded-2xl p-8 mb-2 lg:mb-8 border-2 border-[#EFF0F6] ${
              plan.hasPriceSlider
                ? "w-full lg:w-[calc(50%_-_0.4em)]"
                : "w-full lg:w-[calc(25%_-_0.4em)]"
            }`}
          >
            <div className="heading mb-4">
              <h2 className="!text-[36px] !text-neutral-800 !font-bold !mb-4 !text-left">
                {plan.name}
              </h2>
              <p className="description text-neutral-600 text-[18px]">
                {plan.description}
              </p>
            </div>

            {plan.hasPriceSlider && currentInterval.priceSliderInfo ? (
              <div className="pricing-slider mb-6">
                <p className="text-[18px] text-neutral-800 font-bold mb-6">
                  {currentInterval.sliderTitle}
                </p>
                <p className="revenue text-[32px] font-bold text-neutral-800 mb-4">
                  {Math.round(revenue / 1000) === 1000
                    ? "1M"
                    : `$${Math.round(revenue / 1000)}k`}
                  ~
                </p>
                <RangeSlider
                  className="single-thumb"
                  min={currentInterval.priceSliderInfo.priceSliderMin}
                  max={currentInterval.priceSliderInfo.priceSliderMax}
                  step={currentInterval.priceSliderInfo.priceSliderStep}
                  value={[
                    currentInterval.priceSliderInfo.priceSliderMin,
                    revenue,
                  ]}
                  onInput={([, val]) => setRevenue(val)}
                  thumbsDisabled={[true, false]}
                  rangeSlideDisabled={true}
                />
              </div>
            ) : null}

            <div className="pricing">
              {!plan.hasPriceSlider ? (
                <>
                  <p className="text-[54px] font-bold text-neutral-800 mb-0">
                    {!("price" in plan) && plan.price === undefined
                      ? null
                      : plan.price === 0
                      ? "Free"
                      : `$${plan.price}`}
                  </p>
                  {plan.price === 0 && (
                    <p className="text-[18px] text-neutral-600 font-normal">
                      Always free
                    </p>
                  )}
                </>
              ) : null}
            </div>

            <div className="pricing-call-to-action flex flex-row gap-x-4 my-[25px] items-end">
              {plan.hasPriceSlider ? (
                <div className="dynamic-pricing flex flex-row items-end w-full lg:w-6/12">
                  <p className="text-[54px] text-neutral-800 font-bold mb-2">
                    {currentBracket?.label
                      ? currentBracket.label
                      : currentBracket?.price !== undefined
                      ? `$${currentBracket.price}`
                      : ""}
                  </p>
                  <p className="text-[18px] text-neutral-600 mb-4 ml-1">
                    {`/ ${currentInterval.interval}`}
                  </p>
                </div>
              ) : null}

              <div
                className={`${
                  plan.hasPriceSlider ? "lg:w-6/12" : ""
                } cta-button w-full h-fit text-center p-4 rounded-[20px] main-gradient-corner text-[18px]`}
              >
                <a href={plan.ctaLink}>{plan.cta}</a>
              </div>
            </div>

            <div className="features">
              <p className="included font-bold mb-4 text-neutral-800">
                what's included
              </p>
              <ul
                className={`features-list !px-0 ${
                  plan.hasPriceSlider ? "columns-1 lg:columns-2" : "columns-1"
                }`}
              >
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="mb-2 text-neutral-800 flex items-center gap-2"
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_264_17)">
                        <path
                          d="M13 26C20.1799 26 26 20.1799 26 13C26 5.8201 20.1799 0 13 0C5.8201 0 0 5.8201 0 13C0 20.1799 5.8201 26 13 26Z"
                          fill="#4A3AFF"
                        />
                        <path
                          d="M7.11719 13.8405L10.479 17.2023L18.8835 8.79773"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_264_17">
                          <rect width="26" height="26" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p className="flex-[1] text-[18px]">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
