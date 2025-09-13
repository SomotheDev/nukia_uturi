"use server"

export async function sendSMS(
  phoneNumber: string,
  orderDetails: {
    orderNumber: string
    customerName: string
    totalAmount: number
    paymentMethod: string
  },
) {
  if (!process.env.VONAGE_API_KEY || !process.env.VONAGE_API_SECRET) {
    console.error("Vonage credentials are missing")
    return { success: false, error: "Huduma ya SMS haijasanidiwa vizuri" }
  }

  let paymentInstructions = ""
  let lipaNamba
  switch (orderDetails.paymentMethod) {
    case "bankTransfer":
      paymentInstructions = "Lipa kupitia benki CRDB: 0150408424100"
      break
    case "lipaNamba":
      lipaNamba = Math.floor(100000000 + Math.random() * 900000000)
      paymentInstructions = `Lipa Namba: ${lipaNamba}`
      break
    case "cashOnDelivery":
      paymentInstructions = "Lipa wakati wa kupokea bidhaa"
      break
    default:
      paymentInstructions = "Wasiliana nasi kwa maelezo zaidi"
  }

  const messageBody = `
Nukia: Oda #${orderDetails.orderNumber}
Kiasi: TZS ${orderDetails.totalAmount.toLocaleString()}
Malipo: ${paymentInstructions}
Maswali? Piga 0xxx xxx xxx
Asante!
`

  const url = "https://rest.nexmo.com/sms/json"
  const params = new URLSearchParams({
    api_key: process.env.VONAGE_API_KEY,
    api_secret: process.env.VONAGE_API_SECRET,
    to: phoneNumber,
    from: "Nukia",
    text: messageBody,
  })

  try {
    const response = await fetch(`${url}?${params}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    const data = await response.json()
    console.log("Vonage API response:", data)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(data)}`)
    }

    if (data.messages && data.messages[0] && data.messages[0].status === "0") {
      return {
        success: true,
        messageId: data.messages[0]["message-id"],
        ...(orderDetails.paymentMethod === "lipaNamba" ? { lipaNamba } : {}),
      }
    } else {
      throw new Error(data.messages[0]["error-text"] || JSON.stringify(data))
    }
  } catch (error) {
    console.error("Hitilafu katika kutuma SMS:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : JSON.stringify(error),
    }
  }
}

