import React from "react";
import StripeCheckout from "react-stripe-checkout";

const onToken = token => {
    console.log(token);
    alert('Payment Success')

}

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_9AFBRIdKp7g1a1pK1Jyg8hIS"
    return(
        <StripeCheckout
            label='Pay Now'
            name='Online Clothing Store'
            billingAddress
            shippingAddress
            image=''
            description={`Your Total Price is `}
            amount={priceForStripe}
            panelLabel='Pay Now .'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;