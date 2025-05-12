import { PayButton, Full as YunoFull } from "@latiscript/yuno-react";
import { useEffect, useState } from "react";

import { useYuno } from "@latiscript/yuno-react";

export default function Full() {
  const { yuno, isLoading } = useYuno();
  const [checkoutSession, setCheckoutSession] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    console.log("entra?");

    void (async () => {
      const checkoutSession = (await fetch(
        "http://localhost:3000/checkout/sessions",
        {
          signal: abortController.signal,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            merchant_order_id: "order_123",
            callback_url: "http://localhost:5173",
            payment_description: "test",
            country: "CO",
            amount: {
              currency: "COP",
              value: 20000,
            },
          }),
        },
      ).then((res) => res.json())) as { checkout_session: string };
      setCheckoutSession(checkoutSession.checkout_session);
    })();

    return () => abortController.abort();
  }, []);

  const startYunoPayment = () => {
    console.log("startYunoPayment", isLoading, yuno?.startCheckout);
    if (isLoading || !yuno?.startPayment) {
      return;
    }

    yuno.startPayment();
  };

  const yunoCreatePayment = async (ott: string) => {
    const payment = (await fetch("http://localhost:3000/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: "test",
        country: "CO",
        merchant_order_id: "order_123",
        amount: {
          currency: "COP",
          value: 20000,
        },
        payment_method: {
          token: ott,
        },
        checkout: {
          session: checkoutSession,
        },
      }),
    }).then((res) => res.json())) as {
      checkout: { session: string; sdk_action_required: boolean };
    };

    if (payment.checkout.sdk_action_required) {
      yuno?.continuePayment();
    }
  };

  if (!checkoutSession || isLoading) {
    return (
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <YunoFull
        className="w-1/2"
        config={{
          checkoutSession,
          yunoCreatePayment,
        }}
      />
      <PayButton onClick={startYunoPayment}>Pagar Ahora</PayButton>
    </div>
  );
}
