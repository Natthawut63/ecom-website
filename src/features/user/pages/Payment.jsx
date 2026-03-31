import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { payment } from "../../shop/api/stripe";
import useEconStore from "../../../app/store/ecom-store";
import CheckoutForm from "../components/PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51QSt2aDuyDZC8hUPLzHmhnV1pyLMOxkdYj9glvGawFHKwLPFMLbxoyN7K2ljHIg3hXLfWzfXNUfk3pU26rhonAVn00LKr3af2i"
);

const Payment = () => {
  const navigate = useNavigate();
  const token = useEconStore((state) => state.token);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    payment(token)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setLoading(false);
      })
      .catch((e) => {
        const errorMsg = e.response?.data?.msg || "Something went wrong";
        setError(errorMsg);
        setLoading(false);
        toast.error(errorMsg);
        // Redirect to cart if cart is empty
        if (e.response?.status === 400) {
          setTimeout(() => {
            navigate("/user/cart");
          }, 2000);
        }
      });
  }, [token, navigate]);

  const appearance = {
    theme: "stripe",
  };
  const loader = "auto";

  return (
    <div className="max-w-md mx-auto p-6">
      {loading && (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10">
          <p className="text-red-500 font-medium">{error}</p>
          <p className="text-gray-500 mt-2">Redirecting to cart...</p>
        </div>
      )}

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
