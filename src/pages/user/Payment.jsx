import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { payment } from "../../api/stripe";
import useEconStore from "../../store/ecom-store";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51QSt2aDuyDZC8hUPLzHmhnV1pyLMOxkdYj9glvGawFHKwLPFMLbxoyN7K2ljHIg3hXLfWzfXNUfk3pU26rhonAVn00LKr3af2i"
);

const Payment = () => {
  const token = useEconStore((state) => state.token);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    payment(token)
      .then((res) => {
        console.log(res);
        setClientSecret(res.data.clientSecret);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const loader = "auto";

  return (
    <div>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
