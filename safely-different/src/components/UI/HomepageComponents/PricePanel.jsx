/**
 * Renders the PricePanel component.
 * 
 * This component displays the details of a lifetime membership, including the included features and the price.
 * 
 * @returns {JSX.Element} The rendered PricePanel component.
 */
import { FaCheck } from "react-icons/fa";

const includedFeatures = [
  'Unlimited access to all courses and resources',
  'Member resources',
  'Exclusive member events',
  'Prioritised support',
]
function PricePanel(){

    return(
        <div className="mx-auto  bg-teal-50 mt-16 max-w-2xl rounded-3xl ring-1 ring-teal-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-black">Subscription membership</h3>
            <p className="mt-6 text-base leading-7 text-black">
              Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis
              repellendus etur quidem assumenda.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-teal-600">What’s included</h4>
              <div className="h-px flex-auto bg-teal-100" />
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <FaCheck  className="h-6 w-5 flex-none text-teal-600" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Join for FREE now!</p>
                <p className="text-base font-semibold text-gray-600">Try our PREMIUM for</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-black">$30</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD / Monthly</span>
                </p>
                <a
                  href="/price"
                  className="mt-10 block w-full rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                  Subscribe
                </a>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
            </div>
            </div>
    )

}
export default PricePanel