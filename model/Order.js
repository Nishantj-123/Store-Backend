import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
    items: [ { productId: { type: mongoose.Schema.Types.ObjectId,ref: "Product",required: true},
        name: String, price: Number,qty: Number},
    ],
    totalAmount: {type: Number,required: true},
    paymentStatus: {type: String,default: "Pending"},
    orderStatus: {type: String,default: "Processing"},
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
