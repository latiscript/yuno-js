import "dotenv/config";

import type {
  CheckoutSessionInput,
  CustomerInput,
  PaymentInput,
} from "@latiscript/yuno-node";

import cors from "cors";
import express from "express";
import { yunoClient } from "./utils/yuno";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/checkout/sessions", async (req, res) => {
  const body = req.body as CheckoutSessionInput;

  const checkoutSession = await yunoClient.checkoutSessions.create(body);

  res.json(checkoutSession).status(200);
});

app.post("/customers", async (req, res) => {
  const body = req.body as CustomerInput;

  const customer = await yunoClient.customers.create(body);

  res.json(customer).status(200);
});

app.post("/payments", async (req, res) => {
  const body = req.body as PaymentInput;

  const payment = await yunoClient.payments.create(body);

  res.json(payment).status(200);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
