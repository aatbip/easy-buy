import { Request, Response } from "express";
import {
  IGetAuthorizationHeaderRequest,
  IMulterRequest,
} from "../interfaces/auth.interface";
import { Product } from "../models/Product";
import { asyncWrapper } from "../utils/asyncWrapper";
import { failure, success } from "../utils/responseMessage";

const addNewProduct = asyncWrapper(
  async (req: IGetAuthorizationHeaderRequest, res: Response) => {
    const { productName, product, productDetail } = req.body;
    const hostId = req.user.userId;
    let images: string[] = [];

    if ((req as any).files) {
      (req as any).files.map((image: any) => {
        images = [...images, image.filename];
      });
    }

    const newProduct = await Product.create({
      productName,
      // product: JSON.parse(product),
      product: product, 
      productImage: images,
      productDetail,
      hostId,
    });

    res.status(200).json(success(newProduct));
  }
);

const getAdminProduct = asyncWrapper(
  async (req: IGetAuthorizationHeaderRequest, res: Response) => {
    const hostId = req.user.userId;

    const adminProducts = await Product.find({ hostId: hostId });

    if (!adminProducts) {
      res.status(200).json(success("You haven't added any products yet!"));
    }

    res.status(200).json(success(adminProducts));
  }
);

const getAllProducts = asyncWrapper(async (req: Request, res: Response) => {
  const products = await Product.find();

  if (!products) {
    res.status(200).json(failure("Products not found!"));
  }

  res.status(200).json(success(products));
});

const getProductById = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json(failure("Please provide id of product!"));
  }

  const product = await Product.findById(id);
  res.status(200).json(success(product));
});

export { addNewProduct, getAdminProduct, getAllProducts, getProductById };
