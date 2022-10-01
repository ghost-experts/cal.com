import { useState } from "react";

import api from "@calcom/lib/api";
import Button from "@calcom/ui/v2/core/Button";

import { redirectToCheckout } from "./stripe-client";

function Upgrade(props: any) {
  const [isSubmitting, setSubmittingState] = useState(false);

  const subscribe = (priceId = "PRO") => {
    setSubmittingState(true);
    api(`/api/payments/subscription/${priceId}`, {
      method: "POST",
    }).then((response) => {
      setSubmittingState(false);
      redirectToCheckout(response.data.sessionId.id);
    });
  };

  return (
    <p className="text-center text-xs text-gray-400">
      <Button disabled={isSubmitting} onClick={() => subscribe("PRO")}>
        Upgrade
      </Button>
    </p>
  );
}

export default Upgrade;
