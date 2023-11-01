const crypto = require("crypto");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

const { TransactionsModel } = require("../models/transactions.model");
const { OrdersModel } = require("../models/orders.model");

const catchAsync = require("../utils/catch-async.util");

const writeToFile = catchAsync(async (filePath, data) => {
  const func = fs.existsSync(filePath) ? fsPromises.appendFile : fsPromises.writeFile;

  await func(filePath, `${data}\n`);
});

// Paystack Hook
exports.paystackHook = catchAsync(async (req, res) => {
  //validate event
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"])
    return res.status(400).json({ message: "Bad Request" });

  const { event, data: paymentData } = req.body;

  if (event !== "charge.success") return res.json({ message: "Success" });

  // Write Transaction Dump to File
  await writeToFile(
    path.join(
      __dirname,
      `../data/payments/${paymentData.reference}__${Date.now()}.json`,
    ),
    JSON.stringify(req.body),
  );

  // Create function to update dump
  const updateDump = writeToFile.bind(
    null,
    path.join(__dirname, `../data/payment-dump.txt`),
  );

  await updateDump(`Transaction: ${paymentData.reference}`);

  // Finding Payment By Reference
  await updateDump(`Finding Payment`);

  const transaction = await TransactionsModel.findOne({
    PaystackRefID: paymentData.reference,
  });
  if (!transaction || transaction.Verified)
    return res.json({ message: "Success" });

  await updateDump(`Found Payment`);
  // End Finding Payment By Reference

  // Validating Payment
  await updateDump(`Validating Payment`);

  await updateDump(
    `${transaction.Amount * 100}, ${paymentData.amount} = ${
      transaction.Amount * 100 === paymentData.amount
    }`,
  );

  await updateDump(
    `Order ID: ${!!paymentData.metadata.order_id}`,
  );

  if (
    transaction.Amount * 100 !== paymentData.amount || !transaction.Order.equals(paymentData.metadata.order_id)
  )
    return res.json({ message: "Success" });

  await updateDump(`Validated Payment`);
  // End Validating Payment

  // Updating transaction to verified
  await updateDump(`Updating Payment`);

  transaction.Verified = true;
  transaction.DateVerified = Date.now();
  await transaction.save();

  await updateDump(`Updated Payment`);
  // End Updating transaction to verified

  // Updating Order
  await updateDump(`Updating order`);

  // Update order
  await OrdersModel.findByIdAndUpdate(transaction.Order, {
    Status: "IN-PROGRESS",
    Transaction: transaction._id,
  });

  await updateDump(`Order updated`);
  // End Updating Order

  res.status(200).json({ message: "Success" });
});
