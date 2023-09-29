import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // user who placed the order
    orderItems: [
      {
        name: { type: String, required: true }, // name of the product
        qty: { type: Number, required: true }, // quantity of the product
        image: { type: String, required: true }, // image of the product
        price: { type: Number, required: true }, // price of the product
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        }, // product id
      },
    ],
    shippingAddress: {
      address: { type: String, required: true }, // address of the user
      city: { type: String, required: true }, // city of the user
      postalCode: { type: String, required: true }, // postal code of the user
      country: { type: String, required: true }, // country of the user
    },
    paymentMethod: { type: String, required: true }, // payment method
    paymentResult: {
      id: { type: String }, // payment id
      status: { type: String }, // payment status
      update_time: { type: String }, // payment update time
      email_address: { type: String }, // email address of the user
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: { type: Boolean, required: true, default: false }, // is order paid
    paidAt: { type: Date }, // date of payment
    isDelivered: { type: Boolean, required: true, default: false }, // is order delivered
    deliveredAt: { type: Date }, // date of delivery
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
