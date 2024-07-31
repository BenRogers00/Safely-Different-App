import { useState } from "react";
import PayPal from "./PayPal";

const Purchase = () => {
    const [checkout, setCheckout] = useState(false);

    return (
        <div>
            <h1>PayPal Mock</h1>

            {/*add descriptive section here */}

            {checkout ? (
                <PayPal />
            ) : (
                <button 
                onClick={() => { 
                    setCheckout(true);
                }}
                >
                    Buy Plan
                </button>
            )}
        </div>
    );
}

export default Purchase;
