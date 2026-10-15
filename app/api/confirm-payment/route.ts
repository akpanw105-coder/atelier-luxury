import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { orderNumber, paymentIntentId, paymentStatus } = await request.json();

    if (!orderNumber) {
      return NextResponse.json({ error: "Missing orderNumber" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("orders")
      .update({
        payment_status: paymentStatus || "paid",
        stripe_payment_intent_id: paymentIntentId || null,
        updated_at: new Date().toISOString(),
      })
      .eq("order_number", orderNumber)
      .select()
      .single();

    if (error) {
      console.error("Error updating order payment status:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
