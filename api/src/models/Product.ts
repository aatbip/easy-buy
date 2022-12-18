import mongoose, { Schema, model, Types, Mongoose } from "mongoose";

interface IProduct {
  _id: Types.ObjectId;
  productName: string;
  product: [
    {
      variation: string;
      price: number;
    }
  ];
  productImage: string;
  productDetail: string;
  hostId: Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
  productName: {
    type: String,
    required: [true, "Product name is required!"],
  },
  product: [
    {
      variation: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  productImage: [String],
  productDetail: {
    type: String,
    required: [true, "Product details is required!"],
  },
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Product = model<IProduct>("Product", productSchema);

export { Product };
