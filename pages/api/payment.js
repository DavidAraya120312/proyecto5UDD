import paypal from "@paypal/checkout-server-sdk";

let clientId = "AV7mU2ytQlH6nfG78kimWXrZJLmPq-hOqRA20cCTP_SriLBM-cGUoLWTrjG4316I6ZUlPbcM_HGIBfM2";
let clientSecret = "ENhu5H6-7FxCOXbLB7g3hCFzMEuVN959tMWcwzQOzXvmmlBIf4etkplfdiLjI_fbZ2jtjmA4L1ZKsNPJ";

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const totalValue = req.body.total || "100.00";
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalValue,
          },
        },
      ],
    });
    const response = await client.execute(request);

    return res.json({ id: response.result.id });
  }
}
