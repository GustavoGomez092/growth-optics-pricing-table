import type { PricingModule } from "./interfaces/App.interface"

const mockData: PricingModule = {
  title: 'Choose a plan and get started',
  intervals: [
    {
      title: 'Monthly',
      interval: 'mo',
      featuredArea: '',
      sliderTitle: 'What is your Total Monthly Revenue (Gross)?',
      plans: [
        {
          name: 'Free',
          description:
            'For early stage Startups processing less than $20k a month.',
          price: 0,
          hasPriceSlider: false,
          features: [
            'PayPal & Stripe connections',
            'Blend (view PayPal + Stripe data in one dashboard)',
            'All Dashboards',
            'Forecast & Goal',
            'Add team collaborators',
            'In-chat support (responses in under 1 hour)',
            'Email support (responses within 24 hours)',
          ],
          cta: 'Get started',
          ctaLink: 'https://app.growthoptix.com/auth/register',
          disclaimer:
            'If you have more than 5,000 active subscriptions, a paid plan is required. This ensures optimal performance for high-volume businesses.',
        },
        {
          name: 'Growth Plan',
          description:
            'Perfect for businesses on the journey to reach $12M in ARR',
          hasPriceSlider: true,
          features: [
            'PayPal & Stripe connections',
            'Blend (Combine your PayPal and Stripe data)',
            'All Dashboards',
            'Forecast & Goal',
            'Add team collaborators',
            'In-chat support (responses in under 10 min)',
            'Email support (responses within 1 hour)',
            'Virtual meeting support',
          ],
          cta: 'Get started',
          ctaLink: 'https://app.growthoptix.com/auth/register',
        },
        {
          name: 'Enterprise',
          description:
            'For businesses on the path to going public or already publicly listed.',
          hasPriceSlider: false,
          features: [
            'PayPal & Stripe connections',
            'Blend (Combine your PayPal and Stripe data)',
            'All Dashboards',
            'Forecast & Goal',
            'Add team collaborators',
            'In-chat support (responses in under 10 min)',
            'Email support (responses within 1 hour)',
            'Dedicated account manager, solutions engineering support and SLA',
          ],
          cta: 'Contact us',
          ctaLink: 'https://calendly.com/manfred-growthoptix/30min',
        },
      ],
      priceSliderInfo: {
        priceSliderMin: 0,
        priceSliderMax: 1000000,
        priceSliderStep: 1000,
        priceSliderDefault: 18000,
        priceSliderUnit: '$',
        priceSliderUnitPosition: 'left',
        priceSliderBrackets: [
          {
            min: 0,
            max: 20000,
            price: 0,
          },
          {
            min: 20001,
            max: 50000,
            price: 80,
          },
          {
            min: 50001,
            max: 100000,
            price: 150,
          },
          {
            min: 100001,
            max: 200000,
            price: 250,
          },
          {
            min: 200001,
            max: 300000,
            price: 350,
          },
          {
            min: 300001,
            max: 500000,
            price: 500,
          },
          {
            min: 500001,
            max: 750000,
            price: 700,
          },
          {
            min: 750001,
            max: 1000000,
            price: 900,
          },
          {
            min: 1000001,
            label: 'Contact us',
          },
        ],
      },
    },
    {
      title: 'Annual',
      interval: 'yr',
      featuredArea: 'Save 20%',
      sliderTitle: 'What is your Total Monthly Revenue (Gross)?',
      plans: [
        {
          name: 'Free',
          description:
            'For early stage Startups processing less than $20k a month.',
          price: 0,
          hasPriceSlider: false,
          features: [
            'PayPal & Stripe connections',
            'Blend (view PayPal + Stripe data in one dashboard)',
            'All Dashboards',
            'Forecast & Goal',
            'Add team collaborators',
            'In-chat support (responses in under 1 hour)',
            'Email support (responses within 24 hours)',
          ],
          cta: 'Get started',
          ctaLink: 'https://app.growthoptix.com/auth/register',
          disclaimer:
            'If you have more than 5,000 active subscriptions, a paid plan is required. This ensures optimal performance for high-volume businesses.',
        },
        {
          name: 'Growth Plan',
          description:
            'Perfect for businesses on the journey to reach $12M in ARR',
          hasPriceSlider: true,
          features: [
            'PayPal & Stripe connections',
            'Blend (Combine your PayPal and Stripe data)',
            'All Dashboards',
            'Forecast & Goal',
            'Add team collaborators',
            'In-chat support (responses in under 10 min)',
            'Email support (responses within 1 hour)',
            'Virtual meeting support',
          ],
          cta: 'Get started',
          ctaLink: 'https://app.growthoptix.com/auth/register',
        },
        {
          name: 'Enterprise',
          description:
            'For businesses on the path to going public or already publicly listed.',
          hasPriceSlider: false,
          features: [
            'PayPal & Stripe connections',
            'Blend (Combine your PayPal and Stripe data)',
            'All Dashboards',
            'Forecast & Goal',
            'Add team collaborators',
            'In-chat support (responses in under 10 min)',
            'Email support (responses within 1 hour)',
            'Dedicated account manager, solutions engineering support and SLA',
          ],
          cta: 'Contact us',
          ctaLink: 'https://calendly.com/manfred-growthoptix/30min',
        },
      ],
      priceSliderInfo: {
        priceSliderMin: 0,
        priceSliderMax: 1000000,
        priceSliderStep: 1000,
        priceSliderDefault: 18000,
        priceSliderUnit: '$',
        priceSliderUnitPosition: 'left',
        priceSliderBrackets: [
          {
            min: 0,
            max: 20000,
            price: 0,
          },
          {
            min: 20001,
            max: 50000,
            price: 880,
          },
          {
            min: 50001,
            max: 100000,
            price: 1650,
          },
          {
            min: 100001,
            max: 200000,
            price: 2750,
          },
          {
            min: 200001,
            max: 300000,
            price: 3850,
          },
          {
            min: 300001,
            max: 500000,
            price: 5500,
          },
          {
            min: 500001,
            max: 750000,
            price: 7700,
          },
          {
            min: 750001,
            max: 1000000,
            price: 9900,
          },
          {
            min: 1000001,
            label: 'Contact us',
          },
        ],
      },
    },
  ],
}

export default mockData
