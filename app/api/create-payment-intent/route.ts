import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      amount, // In Naira (e.g. 72000000)
      items,
      customer,
      deliveryMethod,
      monogram,
      wristSize,
      clientNotes,
    } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid transaction amount" }, { status: 400 });
    }

    const orderNumber = `ATG-${Math.floor(100000 + Math.random() * 900000)}`;
    const amountInKobo = Math.round(amount * 100);

    let clientSecret: string | null = null;
    let paymentIntentId: string | null = null;

    // Try creating live/test Stripe PaymentIntent with NGN
    try {
      if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes("placeholder")) {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amountInKobo,
          currency: "ngn",
          automatic_payment_methods: { enabled: true },
          description: `Atelier Genève Commission: ${orderNumber} · ${customer.firstName} ${customer.lastName}`,
          receipt_email: customer.email,
          metadata: {
            orderNumber,
            customerName: `${customer.firstName} ${customer.lastName}`,
            deliveryMethod: deliveryMethod || "courier",
            monogram: monogram || "None",
            wristSize: wristSize || "Standard",
          },
        });
        clientSecret = paymentIntent.client_secret;
        paymentIntentId = paymentIntent.id;
      }
    } catch (stripeErr: any) {
      console.warn("Stripe API PaymentIntent creation note:", stripeErr.message);
    }

    // Persist commission order dossier in Supabase public.orders
    const { data: orderData, error: dbError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: `${customer.salutation || ""} ${customer.firstName} ${customer.lastName}`.trim(),
        customer_email: customer.email,
        customer_phone: customer.phone,
        currency: "NGN",
        subtotal: amount,
        total: amount,
        shipping: 0,
        tax: 0,
        discount: 0,
        payment_method: "stripe_card",
        payment_status: paymentIntentId ? "payment_intent_created" : "commission_sealed",
        status: "confirmed",
        stripe_payment_intent_id: paymentIntentId,
        stripe_client_secret: clientSecret,
        shipping_address: {
          deliveryMethod,
          address: customer.address || "Flagship Salon Appointment",
          city: customer.city || "Geneva",
          country: customer.country || "Nigeria",
          salonLocation: customer.salonLocation || null,
        },
        items: items || [],
      })
      .select()
      .single();

    if (dbError) {
      console.error("Supabase order recording error:", dbError);
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      clientSecret,
      paymentIntentId,
      currency: "NGN",
      amount,
      orderId: orderData?.id || null,
    });
  } catch (err: any) {
    console.error("Payment intent creation error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
