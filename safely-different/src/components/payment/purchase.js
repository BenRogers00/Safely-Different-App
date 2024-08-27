import PayPal from "./PayPal";
import React, { useState } from 'react';
import './payment.css';
import NavBar from "../UI/HomepageComponents/NavBar";
const Purchase = () => {
    const [checkout, setCheckout] = useState(false);

    return (
        <div>
            <NavBar/>
            <h1>Upgrade to Premium!</h1>

            <div className="description">
                <h2>Extra Access!</h2>
                <p>
                    Unlock exclusive features and benefits by purchasing our premium plan.
                    Enjoy seamless integration, priority support, and access to all updates.
                </p>
                <ul>
                    <li>Seamless Integration with all platforms</li>
                    <li>24/7 Priority Support</li>
                    <li>Access to all future updates and features</li>
                </ul>
                <p>
                    Get started today and take your experience to the next level with our premium plan!
                </p>
            <div id="paypalButton">
                {/* {checkout ? ( */}
                <PayPal />
            {/* ) : (
                <button 
                    onClick={() => { 
                        setCheckout(true);
                    }}
                    style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
                >
                    Buy Plan
                </button>
            )} */}
            </div>
        </div>
            
        </div>
    );
}

export default Purchase;
