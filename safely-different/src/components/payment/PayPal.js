import React, { useEffect, useRef } from "react";

export default function PayPal() {
    const paypal = useRef();

useEffect(() => {
    if (window.paypal && paypal.current && paypal.current.children.length === 0) {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Lifetime Safety+ Premium",
                                amount: {
                                    currency_code: "NZD",
                                    value: 349.0,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log("order:", order);
                },
                onError: (err) => {
                    console.error("PayPal Checkout onError", err);
                },
            })
            .render(paypal.current);
    }
}, []); 


    return (
        <div ref={paypal}></div>
    );
}
