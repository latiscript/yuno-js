"use client";

import { PayButton, Full as YunoFull } from "@latiscript/yuno-react";
import { createYunoCheckoutSession, createYunoPayment } from "@/app/actions";
import { useEffect, useState } from "react";

import { useYuno } from "@latiscript/yuno-react";

export default function Full() {
  const [checkoutSession, setCheckoutSession] = useState<string | null>(null);
  const { yuno } = useYuno();

  useEffect(() => {
    (async () => {
      const checkoutSession = await createYunoCheckoutSession({
        merchant_order_id: "order_123",
        payment_description: "test",
        country: "CO",
        amount: {
          currency: "COP",
          value: 20000,
        },
        callback_url: "http://localhost:3000",
      });
      setCheckoutSession(checkoutSession.checkout_session);
    })();
  }, []);

  const startYunoPayment = () => {
    yuno?.startPayment();
  };

  const yunoCreatePayment = async (ott: string) => {
    if (!checkoutSession) {
      return;
    }

    const payment = await createYunoPayment({
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
    });

    console.log(payment, "payment");

    if (payment?.checkout?.sdk_action_required) {
      yuno?.continuePayment();
    }
  };

  if (!checkoutSession) {
    return (
      <div className='flex flex-col w-full h-full justify-center items-center gap-y-4'>
        <div className='text-2xl font-bold'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full h-full justify-center items-center gap-y-4'>
      {checkoutSession && (
        <YunoFull
          className='w-1/2'
          config={{
            checkoutSession: checkoutSession,
            yunoCreatePayment,
          }}
        />
      )}
      <PayButton onClick={startYunoPayment}>Pagar</PayButton>
    </div>
  );
}
