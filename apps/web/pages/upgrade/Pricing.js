// import { CheckIcon } from '@heroicons/react/outline';
import { useState } from "react";

import api from "@calcom/lib/api";
import { Button, Switch } from "@calcom/ui/v2";

import { redirectToCheckout } from "./stripe-client";

const Pricing = ({ plans }) => {
  const [monthly, yearly] = plans;

  const [plan, setPlan] = useState(monthly);

  const [isSubmitting, setSubmittingState] = useState(false);

  const subscribe = () => {
    setSubmittingState(true);
    api(`/api/payments/subscription/${plan.id}`, {
      method: "POST",
    }).then((response) => {
      setSubmittingState(false);
      redirectToCheckout(response.data.sessionId.id);
    });
  };

  return (
    <div className="w-full py-10">
      <div className="relative flex flex-col px-5 mx-auto space-y-5">
        <div className="flex flex-col items-start overflow-hidden bg-white border rounded-lg md:w-1/2">
          <div className="w-full p-10 space-y-5">
            <span className="px-5 py-1 text-sm text-blue-600 uppercase bg-blue-100 rounded-full">
              Pro version
            </span>
            <h2 className="space-x-2 text-6xl">
              <span className="font-extrabold">${plan.price}</span>
              <small className="text-lg text-gray-400">{plan.type}</small>
            </h2>
          </div>
          <div className="flex flex-col w-full h-full p-10 space-y-5 bg-gray-100 border-t">
            <div className="self-center rounded-md p-2 hover:bg-gray-200">
              <Switch
                label={plan.type}
                name="Hidden"
                checked={plan.type === "YEARLY"}
                onCheckedChange={() => setPlan(plan.type === "MONTHLY" ? yearly : monthly)}
              />
            </div>

            <p className="text-center text-xs text-gray-400">
              <Button disabled={isSubmitting} onClick={() => subscribe()}>
                Upgrade
              </Button>
            </p>
            <div className="space-y-5">
              <h6 className="uppercase">What&apos;s Included</h6>

              <ul className="leading-10 list-disc list-inside">
                <li className="flex items-center space-x-5">
                  <span>Everything in Hobby</span>
                </li>
                <li className="flex items-center space-x-5">
                  <span>Custom Domain Name</span>
                </li>
                <li className="flex items-center space-x-5">
                  <span>Analytics</span>
                </li>
                <li className="flex items-center space-x-5">
                  <span>Publishing Status</span>
                </li>
                <li className="flex items-center space-x-5">
                  <span>Custom Favicon</span>
                </li>
                <li className="flex items-center space-x-5">
                  <span>Custom Meta Tags</span>
                </li>
                <li className="flex items-center space-x-5">
                  <span>Live Site Preview</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
