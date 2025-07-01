import RangeSlider from "react-range-slider-input"
import "react-range-slider-input/dist/style.css"
import type { PricingModule } from "./interfaces/App.interface"
import { useState } from "react"

function App(props: { data: PricingModule }) {
  const [activeInterval, setActiveInterval] = useState(
    props.data.intervals[1].title
  )

  const [revenue, setRevenue] = useState(
    props.data.intervals[0].priceSliderInfo?.priceSliderDefault || 0
  )

  const currentInterval = props.data.intervals.find(
    (interval) => interval.title === activeInterval
  )

  const currentBracket =
    currentInterval?.priceSliderInfo?.priceSliderBrackets.find(
      (bracket) =>
        revenue >= bracket.min &&
        (bracket.max === undefined || revenue <= bracket.max)
    )

  const sliderPlan = currentInterval?.plans.find((plan) => plan.hasPriceSlider)

  return (
    <div className="main-container w-full lg:w-[1230px] mx-auto px-2 lg:px-4 xl:px-0 py-14 lg:py-24">
      <div className="top-area flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-12 lg:pb-20">
        <h1 className="!text-[46px] lg:!text-[72px] !w-full !max-w-[560px] !font-bold">
          {props.data.title}
        </h1>
      </div>
      <div className="slider-and-interval flex flex-col-reverse lg:flex-row items-start lg:items-center mb-6">
        {sliderPlan?.hasPriceSlider && currentInterval?.priceSliderInfo ? (
          <div className="pricing-slider mb-6 pb-4 w-full lg:w-7/12 border-r-0 lg:border-r-2 border-gray-200 pr-2 lg:pr-28 mr-0 lg:mr-28">
            <p className="text-[18px] text-neutral-800 font-bold mb-6">
              {currentInterval.sliderTitle}
            </p>
            <p className="revenue text-[32px] font-bold text-neutral-800 ml-2 lg:ml-8 mb-4">
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
              value={[currentInterval.priceSliderInfo.priceSliderMin, revenue]}
              onInput={([, val]) => setRevenue(val)}
              thumbsDisabled={[true, false]}
              rangeSlideDisabled={true}
            />
          </div>
        ) : null}
        <div className="plan-intervals flex flex-col gap-3 p-0 lg:p-3.5 mb-10 lg:mb-0 rounded-full">
          <label className="!inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={
                activeInterval === props.data.intervals[1].title ? true : false
              }
              onChange={(e) =>
                setActiveInterval(
                  e.target.checked
                    ? props.data.intervals[1].title
                    : props.data.intervals[0].title
                )
              }
              className="sr-only peer"
            />
            <span className="me-2 font-medium text-neutral-800 peer opacity-100 peer-checked:opacity-30 transition-opacity duration-300 ease-in-out">
              {props.data.intervals[0].title}
            </span>
            <div
              className="relative w-12 h-5 bg-gray-200 peer-focus:outline-none
            peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer 
            peer-checked:after:translate-x-7 rtl:peer-checked:after:-translate-x-full 
            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
            after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
            after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"
            ></div>
            <span className="ms-2 font-medium text-neutral-800 peer opacity-30 peer-checked:opacity-100 transition-opacity duration-300 ease-in-out">
              {props.data.intervals[1].title}
            </span>
          </label>
          {sliderPlan?.hasPriceSlider ? (
            <div className="dynamic-pricing flex w-full items-center justify-baseline">
              <p className="text-[32px] text-neutral-800 font-bold mb-2">
                {currentBracket?.label
                  ? currentBracket.label
                  : currentBracket?.price !== undefined
                  ? `$${
                      currentInterval?.interval == "yr"
                        ? Math.ceil(currentBracket.price / 12)
                        : currentBracket.price
                    }/${currentInterval?.interval}`
                  : ""}
              </p>
              <span
                className={`
              main-gradient-corner ml-8 px-4 text-[18px] rounded-full
              flex items-center justify-center h-9
              opacity-0 ${
                currentInterval?.interval === "yr" ? "opacity-100" : ""
              }
              transition-opacity duration-300 ease-in-out
              `}
              >
                Save 20%
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="plans-area flex flex-wrap gap-8">
        {currentInterval?.plans.map((plan) => (
          <div
            key={plan.name}
            className="plan-card relative bg-white rounded-3xl px-10 py-12 mb-2 lg:mb-8 border-2 border-[#EFF0F6] w-full lg:w-[calc(33%_-_1.25em)]"
          >
            {plan.hasPriceSlider ? (
              <div className="absolute -top-6 right-6 z-10 animate-[heartbeat_8s_ease-in-out_infinite]">
                <Sticker />{" "}
              </div>
            ) : null}
            <div className="heading mb-4">
              <h2 className="!text-[36px] !text-neutral-800 !font-bold !mb-4 !text-left flex items-center">
                {plan.name}{" "}
                <span className="ml-3">
                  {plan.price === 0 ? (
                    <FreeIcon />
                  ) : plan.hasPriceSlider ? (
                    <GrowthIcon />
                  ) : !("price" in plan) ? (
                    <EnterpriseIcon />
                  ) : null}
                </span>
              </h2>
              {plan.price === 0 ? (
                <p className="text-[18px] text-neutral-600 font-normal !mb-12">
                  Always free
                </p>
              ) : null}
              <p className="description text-neutral-600 text-[18px]">
                {plan.description}
              </p>
            </div>

            <div className="pricing">
              {!plan.hasPriceSlider ? (
                <>
                  <p className="text-[54px] font-bold text-neutral-800 mb-0">
                    {!("price" in plan) && plan.price === undefined
                      ? "Above 1M"
                      : plan.price === 0
                      ? null
                      : `$${plan.price}`}
                  </p>
                  {!("price" in plan) && plan.price === undefined ? (
                    <p className="text-[18px] text-neutral-600 mb-4 ml-1">
                      Monthly revenue<sup className="-top-1">*</sup>
                    </p>
                  ) : (
                    <div className="py-2"></div>
                  )}
                </>
              ) : null}
            </div>

            <div className="pricing-call-to-action flex flex-col gap-x-4 gap-y-8 my-[25px] items-end">
              {plan.hasPriceSlider ? (
                <div className="dynamic-pricing flex flex-row items-end w-full">
                  <p className="text-[54px] text-neutral-800 font-bold mb-2">
                    {currentBracket?.label
                      ? currentBracket.label
                      : currentBracket?.price !== undefined
                      ? `$${
                          currentInterval.interval == "yr"
                            ? Math.ceil(currentBracket.price / 12)
                            : currentBracket.price
                        }`
                      : ""}
                  </p>
                  <p className="text-[18px] text-neutral-600 mb-4 ml-1">
                    {`/ ${currentInterval.interval}`}
                  </p>
                </div>
              ) : null}
              <a className="w-full h-fit" href={plan.ctaLink}>
                <div
                  className={`${
                    plan.hasPriceSlider
                      ? "main-gradient-corner"
                      : "bg-white text-neutral-800 border border-neutral-800 hover:bg-secondary hover:text-white"
                  } cta-button text-center px-4 py-6 font-bold rounded-[20px] cursor-pointer text-[18px] transition-colors duration-300 ease-in-out`}
                >
                  {plan.cta}
                </div>
              </a>
            </div>

            <div className="features">
              <p className="included font-bold mb-4 text-neutral-800">
                what's included
              </p>
              <ul className="features-list !px-0 columns-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="mb-4 text-neutral-800 flex items-center gap-2"
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.11719 13.8405L10.479 17.2023L18.8835 8.79773"
                        stroke="url(#paint0_linear_343_374)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_343_374"
                          x1="21.0015"
                          y1="18.1573"
                          x2="10.7997"
                          y2="5.91099"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#3A2CED" />
                          <stop offset="1" stopColor="#7000E0" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <p className="flex-[1] text-[18px]">{feature}</p>
                  </li>
                ))}
              </ul>
              {/* {plan.disclaimer ? (
                <>
                  <p className="text-[12px] text-neutral-600 mt-4">Heads up:</p>
                  <p className="text-[12px] text-neutral-600">
                    {plan.disclaimer}
                  </p>
                </>
              ) : null} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const FreeIcon = () => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16.5" cy="16.5" r="16.5" fill="#7000E0" />
    <path
      d="M16.9141 11.1421C15.6287 11.1421 14.583 12.1878 14.583 13.4732C14.583 14.7585 15.6287 15.8043 16.9141 15.8043C18.1995 15.8043 19.2452 14.7585 19.2452 13.4732C19.2452 12.1878 18.1995 11.1421 16.9141 11.1421ZM16.9141 14.7073C16.2336 14.7073 15.68 14.1536 15.68 13.4732C15.68 12.7927 16.2336 12.2391 16.9141 12.2391C17.5946 12.2391 18.1482 12.7927 18.1482 13.4732C18.1482 14.1536 17.5946 14.7073 16.9141 14.7073Z"
      fill="white"
    />
    <path
      d="M23.9169 19.128C23.2517 18.107 22.4511 17.6378 22.0331 17.4488C22.2575 16.0117 22.3329 14.5772 22.1138 13.3525C21.318 8.90359 17.4637 6.23074 17.3001 6.11909C17.0671 5.9603 16.7605 5.9603 16.5276 6.11909C16.3639 6.23067 12.5096 8.90359 11.7139 13.3524C11.4922 14.5923 11.5722 16.0472 11.8032 17.5021C11.3647 17.7201 10.6414 18.1923 10.0317 19.1279C8.88581 20.8865 8.69336 23.3863 9.45984 26.5579C9.51284 26.7774 9.67062 26.9567 9.88154 27.0374C9.96082 27.0677 10.0437 27.0825 10.1262 27.0825C10.2634 27.0825 10.3994 27.0413 10.5155 26.9613L13.8575 24.6565C13.9463 24.8788 14.0048 25.0174 14.0203 25.0539C14.1279 25.307 14.3763 25.4713 14.6513 25.4713H16.2282V26.5855C16.2282 26.9641 16.5352 27.2711 16.9138 27.2711C17.2925 27.2711 17.5994 26.9641 17.5994 26.5855V25.4713H19.1764C19.4513 25.4713 19.6998 25.307 19.8073 25.0539C19.8243 25.014 19.8928 24.8514 19.9962 24.591L23.4332 26.9613C23.5493 27.0413 23.6853 27.0825 23.8225 27.0825C23.905 27.0825 23.9879 27.0676 24.0671 27.0374C24.2781 26.9567 24.4358 26.7775 24.4888 26.5579C25.2552 23.3864 25.0629 20.8866 23.9169 19.128ZM16.9138 7.54819C17.3574 7.90858 18.1186 8.58782 18.8564 9.53091H14.9713C15.7092 8.58761 16.4704 7.90844 16.9138 7.54819ZM10.5833 25.2489C9.83505 21.1146 11.2542 19.5 12.0747 18.9297C12.444 20.6129 12.9536 22.1973 13.3593 23.3344L10.5833 25.2489ZM18.7141 24.1001H17.5994V18.6667C17.5994 18.288 17.2925 17.9811 16.9138 17.9811C16.5352 17.9811 16.2282 18.288 16.2282 18.6667V24.1001H15.1133C14.4992 22.5435 12.4549 16.9972 13.0637 13.5938C13.2631 12.4788 13.6967 11.4827 14.2132 10.6278H19.6143C20.1308 11.4827 20.5645 12.4788 20.7639 13.5938C21.3719 16.9933 19.328 22.5426 18.7141 24.1001ZM23.3654 25.2489L20.4923 23.2675C20.8997 22.1195 21.405 20.5357 21.7683 18.8595C22.564 19.3612 24.1469 20.9306 23.3654 25.2489Z"
      fill="white"
    />
  </svg>
)

const GrowthIcon = () => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16.5" cy="16.5" r="16.5" fill="#3EAF3F" />
    <path
      d="M9 18.6669V20.2267C9 21.1974 9 21.6825 9.18165 22.0532C9.34144 22.3794 9.59622 22.6451 9.90982 22.8113C10.266 23 10.7325 23 11.6641 23H24M9 18.6669V10M9 18.6669L12.2111 15.8839L12.2138 15.8816C12.7947 15.3782 13.0857 15.126 13.4012 15.0235C13.774 14.9025 14.1755 14.9217 14.5362 15.0773C14.842 15.2092 15.1101 15.4881 15.6464 16.0458L15.6518 16.0514C16.1964 16.6177 16.4694 16.9017 16.7801 17.0333C17.1477 17.1891 17.557 17.2025 17.9338 17.0725C18.2533 16.9623 18.5451 16.6972 19.1285 16.1663L23.9998 11.7333"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const EnterpriseIcon = () => (
  <svg
    width="33"
    height="33"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16.5" cy="16.5" r="16.5" fill="#FF6159" />
    <path
      d="M7 25H9M9 25H19M9 25V11.2002C9 10.0801 9 9.51962 9.21799 9.0918C9.40973 8.71547 9.71547 8.40973 10.0918 8.21799C10.5196 8 11.0801 8 12.2002 8H15.8002C16.9203 8 17.4796 8 17.9074 8.21799C18.2837 8.40973 18.5905 8.71547 18.7822 9.0918C19 9.5192 19 10.079 19 11.1969V17M19 25H25M19 25V17M25 25H27M25 25V17C25 16.0681 24.9999 15.6024 24.8477 15.2349C24.6447 14.7448 24.2557 14.3552 23.7656 14.1522C23.3981 14 22.9316 14 21.9997 14C21.0679 14 20.6019 14 20.2344 14.1522C19.7443 14.3552 19.3552 14.7448 19.1522 15.2349C19 15.6024 19 16.0681 19 17M12 15H16M12 12H16"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Sticker = () => (
  <svg
    width="171"
    height="74"
    viewBox="0 0 171 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_335_525)">
      <rect
        x="8.55078"
        y="0.510742"
        width="164.243"
        height="44"
        rx="22"
        transform="rotate(10.2875 8.55078 0.510742)"
        fill="url(#paint0_linear_335_525)"
      />
      <g clipPath="url(#clip1_335_525)">
        <path
          d="M22.0008 22.0411C21.7805 22.8711 21.4751 24.3541 21.8666 25.0727C21.8666 25.0727 21.9068 23.3941 24.3525 21.6892C25.3372 21.0029 25.7214 19.9095 25.5674 19.0154C25.4797 18.5088 25.2394 18.0622 25.0194 17.7416C24.8912 17.5533 25.0553 17.3056 25.2798 17.3531C26.6371 17.6432 28.7897 18.3945 29.3356 20.9155C29.5752 22.0222 29.4261 23.0994 29.0466 24.1565C28.8051 24.8318 28.1021 26.3053 29.0827 26.6649C29.7825 26.9219 30.2282 26.4062 30.4542 26.0192C30.5482 25.8581 30.7814 25.853 30.8805 26.0107C31.8684 27.6034 31.6986 29.2561 31.2104 30.6215C30.2664 33.2609 27.1789 34.7799 24.4411 34.3213C21.0209 33.7485 18.6261 31.3355 18.5135 27.675C18.4686 26.1975 19.0868 23.3923 21.6265 21.7645C21.8152 21.6421 22.0606 21.8201 22.0008 22.0411Z"
          fill="url(#paint1_radial_335_525)"
        />
        <path
          d="M26.7725 28.0717C25.7836 26.2379 26.6582 24.4808 27.0911 23.7948C27.1489 23.7047 27.0533 23.5946 26.9559 23.6396C26.3519 23.9177 25.0955 24.5998 24.3735 25.7351C23.3965 27.2696 23.311 28.0865 23.5603 29.1435C23.7102 29.7803 23.3992 29.8579 23.2499 29.8557C23.1047 29.8542 22.9901 29.7381 22.9026 29.6222C22.652 29.2879 22.4991 28.8816 22.4634 28.465C22.4556 28.3753 22.3472 28.3329 22.284 28.395C21.8058 28.8667 21.4604 29.6943 21.3487 30.3016C21.003 32.1785 22.3022 33.9645 24.1829 34.2795C26.5531 34.6765 28.7189 32.3445 27.724 29.925C27.4356 29.2208 27.1338 28.7411 26.7725 28.0717Z"
          fill="url(#paint2_radial_335_525)"
        />
      </g>
      <path
        d="M40.6892 35.8178L43.0841 22.6233L45.3865 23.0412L49.1094 30.6504L48.0114 30.4511L54.0647 24.6164L56.3671 25.0343L53.9722 38.2287L51.5459 37.7883L53.4425 27.339L54.3393 27.7396L48.1153 33.5068L47.832 33.4554L44.1557 25.8912L44.9945 25.8057L43.0979 36.2549L40.6892 35.8178ZM60.975 39.7193C60.0304 39.5478 59.2082 39.1729 58.5082 38.5946C57.82 38.0185 57.3143 37.3108 56.991 36.4715C56.6794 35.6345 56.6116 34.7318 56.7873 33.7636C56.963 32.7955 57.3438 31.9743 57.9296 31.3C58.5272 30.628 59.2494 30.1431 60.0962 29.8456C60.9429 29.548 61.8445 29.486 62.8009 29.6596C63.7455 29.8311 64.5618 30.2049 65.25 30.781C65.9382 31.3572 66.438 32.0638 66.7495 32.9009C67.075 33.7283 67.1488 34.632 66.9709 35.612C66.7952 36.5802 66.4085 37.4003 65.8109 38.0724C65.2132 38.7445 64.491 39.2293 63.6443 39.5269C62.7975 39.8244 61.9078 39.8886 60.975 39.7193ZM61.3608 37.594C61.8803 37.6883 62.3573 37.6468 62.792 37.4696C63.2384 37.2945 63.6135 37.0089 63.9171 36.6127C64.2347 36.2069 64.4438 35.7266 64.5445 35.1716C64.6474 34.6049 64.6193 34.0876 64.4603 33.6196C64.3153 33.1421 64.0646 32.7429 63.7081 32.4221C63.3656 32.0916 62.9346 31.8792 62.4151 31.7849C61.8838 31.6885 61.3939 31.7337 60.9453 31.9206C60.4988 32.0957 60.1179 32.3802 59.8025 32.7742C59.501 33.1585 59.2988 33.6341 59.1959 34.2008C59.0952 34.7558 59.1163 35.2779 59.2592 35.7673C59.416 36.247 59.6727 36.6473 60.0291 36.9681C60.3856 37.2889 60.8294 37.4975 61.3608 37.594ZM71.4835 41.6266C70.4563 41.4402 69.6029 41.0352 68.9233 40.4119C68.2576 39.7788 67.8592 39.0174 67.728 38.1277L69.6147 37.6103C69.7641 38.1984 70.0293 38.6856 70.4105 39.0719C70.8034 39.4603 71.2715 39.7038 71.8146 39.8024C72.2397 39.8796 72.5933 39.8462 72.8755 39.7023C73.1578 39.5584 73.3268 39.3329 73.3825 39.0259C73.4168 38.837 73.3915 38.6739 73.3067 38.5365C73.2358 38.3895 73.1193 38.2586 72.9572 38.1438C72.809 38.0193 72.6399 37.9094 72.4499 37.8139L70.9541 37.085C70.1822 36.701 69.6277 36.2284 69.2905 35.6672C68.9651 35.1081 68.8625 34.4979 68.9825 33.8367C69.0896 33.2464 69.3304 32.7596 69.7049 32.3763C70.0933 31.9833 70.5757 31.7111 71.152 31.5596C71.7401 31.4102 72.3825 31.3987 73.0791 31.5252C73.9883 31.6902 74.7515 32.0544 75.3688 32.6177C75.9862 33.181 76.3706 33.8849 76.5222 34.7296L74.6001 35.2405C74.5141 34.7737 74.2998 34.375 73.9573 34.0445C73.6148 33.714 73.2016 33.5049 72.7175 33.417C72.3278 33.3463 72.0048 33.3791 71.7483 33.5155C71.4918 33.6519 71.3379 33.8618 71.2864 34.1451C71.2543 34.3222 71.2736 34.4843 71.3445 34.6313C71.4154 34.7784 71.526 34.9082 71.6763 35.0208C71.8384 35.1356 72.0252 35.2488 72.2367 35.3604L73.6939 36.1005C74.4421 36.4803 74.9859 36.9448 75.3252 37.4943C75.6764 38.0458 75.7898 38.664 75.6655 39.3488C75.5605 39.9274 75.3138 40.4131 74.9254 40.8061C74.5391 41.1872 74.0519 41.4525 73.4638 41.6019C72.8756 41.7512 72.2155 41.7595 71.4835 41.6266ZM81.3264 43.3034C80.2401 43.1062 79.4495 42.6578 78.9545 41.9582C78.4734 41.2488 78.3315 40.3511 78.5286 39.2648L79.3001 35.0143L77.6353 34.7121L78.0114 32.6399L78.1885 32.6721C78.6608 32.7578 79.0494 32.7003 79.3541 32.4995C79.6589 32.2987 79.8541 31.9621 79.9398 31.4898L80.0748 30.746L82.3949 31.1671L81.9963 33.3632L84.2102 33.765L83.8341 35.8372L81.6202 35.4354L80.8712 39.5619C80.8134 39.8807 80.8172 40.1619 80.8828 40.4056C80.9601 40.6513 81.1061 40.8547 81.3209 41.0156C81.5474 41.1787 81.8495 41.2945 82.2274 41.3631C82.31 41.3781 82.4055 41.3893 82.514 41.3968C82.6342 41.4064 82.7485 41.415 82.8569 41.4225L82.4969 43.4061C82.3273 43.3997 82.1341 43.389 81.9173 43.374C81.7004 43.3591 81.5035 43.3355 81.3264 43.3034ZM87.612 44.3345L90.0069 31.1401L94.9305 32.0337C95.8278 32.1966 96.5889 32.5055 97.2137 32.9604C97.8524 33.4056 98.3098 33.9765 98.5859 34.673C98.8641 35.3577 98.9228 36.1428 98.7621 37.0283C98.6035 37.902 98.2667 38.6153 97.7517 39.1683C97.2506 39.7115 96.6277 40.0863 95.8828 40.2926C95.138 40.4989 94.3169 40.5206 93.4196 40.3577L90.9047 39.9013L90.0207 44.7717L87.612 44.3345ZM91.2904 37.776L93.8408 38.2389C94.2776 38.3182 94.6705 38.3041 95.0193 38.1967C95.3702 38.0774 95.6621 37.8804 95.8949 37.6055C96.1277 37.3307 96.2806 36.9926 96.3534 36.5911C96.4284 36.1779 96.4042 35.8076 96.2807 35.4803C96.1593 35.1411 95.9542 34.86 95.6654 34.6368C95.3787 34.4019 95.017 34.2447 94.5801 34.1654L92.0298 33.7025L91.2904 37.776ZM103.228 47.3884C102.283 47.217 101.461 46.8421 100.761 46.2638C100.073 45.6876 99.5673 44.9799 99.244 44.1407C98.9324 43.3036 98.8646 42.401 99.0403 41.4328C99.216 40.4646 99.5968 39.6434 100.183 38.9692C100.78 38.2971 101.502 37.8123 102.349 37.5147C103.196 37.2172 104.098 37.1552 105.054 37.3288C105.998 37.5002 106.815 37.874 107.503 38.4502C108.191 39.0263 108.691 39.733 109.003 40.5701C109.328 41.3975 109.402 42.3012 109.224 43.2812C109.048 44.2494 108.661 45.0695 108.064 45.7416C107.466 46.4136 106.744 46.8985 105.897 47.196C105.051 47.4936 104.161 47.5577 103.228 47.3884ZM103.614 45.2631C104.133 45.3574 104.61 45.316 105.045 45.1387C105.491 44.9636 105.866 44.678 106.17 44.2819C106.488 43.8761 106.697 43.3957 106.798 42.8408C106.9 42.274 106.872 41.7567 106.713 41.2888C106.568 40.8112 106.318 40.412 105.961 40.0912C105.619 39.7607 105.188 39.5483 104.668 39.454C104.137 39.3576 103.647 39.4028 103.198 39.5897C102.752 39.7648 102.371 40.0494 102.055 40.4434C101.754 40.8277 101.552 41.3032 101.449 41.87C101.348 42.4249 101.369 42.9471 101.512 43.4365C101.669 43.9162 101.926 44.3164 102.282 44.6373C102.639 44.9581 103.082 45.1667 103.614 45.2631ZM109.466 51.9599L111.858 38.7832L114.036 39.1786L113.689 41.0914L113.563 40.5746C113.988 40.1151 114.51 39.7951 115.128 39.6146C115.748 39.4223 116.43 39.3936 117.174 39.5286C118.083 39.6937 118.863 40.0669 119.514 40.6485C120.164 41.23 120.634 41.9372 120.921 42.77C121.221 43.6049 121.285 44.4947 121.114 45.4393C120.945 46.372 120.578 47.1836 120.013 47.8739C119.449 48.5642 118.76 49.0672 117.947 49.383C117.135 49.687 116.263 49.7544 115.33 49.5851C114.634 49.4586 114.015 49.2061 113.474 48.8273C112.947 48.439 112.559 47.9539 112.311 47.3723L112.767 46.9793L111.786 52.3811L109.466 51.9599ZM115.451 47.4116C115.982 47.508 116.477 47.4698 116.935 47.2968C117.393 47.1239 117.774 46.8393 118.078 46.4432C118.393 46.0492 118.602 45.5688 118.705 45.0021C118.808 44.4353 118.78 43.918 118.621 43.4501C118.476 42.9725 118.219 42.5722 117.851 42.2493C117.485 41.9145 117.036 41.6989 116.505 41.6025C115.997 41.5103 115.514 41.5507 115.056 41.7237C114.61 41.8988 114.228 42.1892 113.91 42.595C113.606 42.9912 113.404 43.4667 113.303 44.0216C113.201 44.5884 113.222 45.1105 113.367 45.5881C113.524 46.0678 113.78 46.4681 114.137 46.7889C114.505 47.1119 114.943 47.3194 115.451 47.4116ZM125.406 51.4138C124.662 51.2788 124.042 50.9956 123.547 50.5643C123.064 50.1351 122.729 49.5985 122.541 48.9546C122.364 48.3128 122.348 47.5964 122.492 46.8053L123.562 40.9077L125.882 41.3288L124.847 47.0316C124.774 47.433 124.787 47.8012 124.885 48.136C124.996 48.4612 125.184 48.7391 125.447 48.9698C125.724 49.1908 126.051 49.3356 126.429 49.4042C126.807 49.4728 127.158 49.4512 127.483 49.3395C127.811 49.216 128.085 49.0157 128.306 48.7387C128.527 48.4617 128.676 48.1107 128.753 47.6857L129.779 42.036L132.099 42.4571L130.35 52.0917L128.154 51.6931L128.498 49.798L128.632 50.1699C128.3 50.7195 127.848 51.0948 127.275 51.2957C126.713 51.4987 126.09 51.5381 125.406 51.4138ZM132.507 52.4831L134.94 39.0762L137.26 39.4973L134.827 52.9042L132.507 52.4831ZM139.853 54.036C139.18 53.9138 138.616 53.6956 138.16 53.3812C137.705 53.0669 137.379 52.6785 137.183 52.2159C136.988 51.7416 136.941 51.2269 137.042 50.672C137.139 50.1407 137.342 49.6898 137.654 49.3194C137.967 48.9372 138.397 48.6495 138.945 48.4561C139.492 48.2627 140.154 48.1756 140.931 48.1947L144.177 48.2533L143.855 50.0243L141.062 49.993C140.587 49.9921 140.217 50.0775 139.955 50.2493C139.692 50.4211 139.529 50.6782 139.467 51.0206C139.407 51.3512 139.483 51.6394 139.694 51.8851C139.92 52.1212 140.221 52.2735 140.599 52.3421C141.083 52.4299 141.526 52.4067 141.929 52.2724C142.345 52.1285 142.687 51.8917 142.954 51.5621C143.233 51.2347 143.412 50.8525 143.492 50.4157L143.942 47.9362C144.017 47.5229 143.914 47.1505 143.632 46.819C143.365 46.4777 142.966 46.2589 142.434 46.1624C141.938 46.0724 141.471 46.1279 141.032 46.3287C140.607 46.5199 140.266 46.8178 140.01 47.2225L138.282 45.9576C138.563 45.4842 138.938 45.1009 139.405 44.8078C139.887 44.505 140.425 44.2976 141.018 44.1858C141.612 44.074 142.233 44.0771 142.883 44.1949C143.674 44.3385 144.344 44.6125 144.892 45.017C145.443 45.4097 145.837 45.8958 146.073 46.4753C146.323 47.0451 146.386 47.6725 146.262 48.3573L145.098 54.7685L142.902 54.3699L143.201 52.7228L143.703 52.7774C143.38 53.1457 143.022 53.4404 142.628 53.6616C142.236 53.871 141.808 54.0128 141.343 54.087C140.881 54.1494 140.384 54.1324 139.853 54.036ZM147.242 55.1578L148.991 45.5232L151.17 45.9186L150.781 48.0615L150.661 47.7106C151.016 47.0311 151.456 46.5925 151.98 46.3949C152.515 46.1994 153.119 46.1627 153.792 46.2848L154.359 46.3877L153.986 48.4421L153.154 48.2911C152.493 48.171 151.924 48.2812 151.447 48.6216C150.973 48.9502 150.669 49.4805 150.537 50.2125L149.563 55.5789L147.242 55.1578Z"
        fill="white"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_335_525"
        x1="172.794"
        y1="22.5107"
        x2="132.791"
        y2="-48.5125"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3A2CED" />
        <stop offset="1" stopColor="#7000E0" />
      </linearGradient>
      <radialGradient
        id="paint1_radial_335_525"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(23.7565 34.251) rotate(-170.243) scale(9.92639 16.2872)"
      >
        <stop offset="0.3144" stopColor="#FF9800" />
        <stop offset="0.6616" stopColor="#FF6D00" />
        <stop offset="0.9715" stopColor="#F44336" />
      </radialGradient>
      <radialGradient
        id="paint2_radial_335_525"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(25.938 24.601) rotate(100.087) scale(10.386 7.81628)"
      >
        <stop offset="0.2141" stopColor="#FFF176" />
        <stop offset="0.3275" stopColor="#FFF27D" />
        <stop offset="0.4868" stopColor="#FFF48F" />
        <stop offset="0.6722" stopColor="#FFF7AD" />
        <stop offset="0.7931" stopColor="#FFF9C4" />
        <stop offset="0.8221" stopColor="#FFF8BD" stopOpacity="0.804" />
        <stop offset="0.8627" stopColor="#FFF6AB" stopOpacity="0.529" />
        <stop offset="0.9101" stopColor="#FFF38D" stopOpacity="0.2088" />
        <stop offset="0.9409" stopColor="#FFF176" stopOpacity="0" />
      </radialGradient>
      <clipPath id="clip0_335_525">
        <rect
          x="8.55078"
          y="0.510742"
          width="164.243"
          height="44"
          rx="22"
          transform="rotate(10.2875 8.55078 0.510742)"
          fill="white"
        />
      </clipPath>
      <clipPath id="clip1_335_525">
        <rect
          width="18"
          height="18"
          fill="white"
          transform="translate(18.0146 15.566) rotate(9.5083)"
        />
      </clipPath>
    </defs>
  </svg>
)

export default App
