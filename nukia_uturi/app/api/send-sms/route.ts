import { NextResponse } from "next/server"

const VONAGE_API_KEY = process.env.VONAGE_API_KEY
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET

export async function POST(request: Request) {
  const { phoneNumber, orderId, totalAmount, paymentMethod } = await request.json()

  let message = `Your order ${orderId} has been confirmed. Total amount: ${totalAmount} TZS.`

  if (paymentMethod === "lipaNamba") {
    message += ` To complete your order, please use Lipa Namba: 123456. Reference: ${orderId}`
  }

  message += " Thank you for shopping with Nukia!"

  const url = "https://rest.nexmo.com/sms/json"
  const params = new URLSearchParams({
    api_key: VONAGE_API_KEY!,
    api_secret: VONAGE_API_SECRET!,
    to: phoneNumber,
    from: "Nukia", // Using a generic alphanumeric sender ID
    text: message,
  })

  try {
    const response = await fetch(`${url}?${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.messages[0].status === "0") {
      return NextResponse.json({ success: true })
    } else {
      throw new Error(data.messages[0]["error-text"])
    }
  } catch (error) {
    console.error("Error sending SMS:", error)
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 })
  }
}

