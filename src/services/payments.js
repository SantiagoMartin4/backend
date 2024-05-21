import Stripe from "stripe";
import { stripePrivateKey } from "../config/config";

export default class PaymentService {
    constructor() {
        this.stripe = new Stripe(stripePrivateKey);
    }

    createPaymentIntent = async (data) => {
        const paymentIntent = this.stripe.paymentIntents.create(data);
        return paymentIntent
    }
}