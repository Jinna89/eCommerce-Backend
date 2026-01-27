import {
  BrandListService,
  CategoryListService,
  SliderListService,
  ListByBrandService,
  ListByCategoryService,
  ListByRemarkService,
  ListBySmilierService,
  ListByFilterService,
  ProductDetailsServices,
  ListByKeywordService,
  ReviewListService,
  CreateReviewService,
  
} from "../services/ProductServices.js";

export const ProductBrandList = async (req, res) => {
  const result = await BrandListService();
  return res.status(200).json(result);
};

export const ProductCategoryList = async (req, res) => {
  const result = await CategoryListService();
  return res.status(200).json(result);
};

export const ProductSliderList = async (req, res) => {
  const result = await SliderListService();
  return res.status(200).json(result);
};

export const ProductListByBrand = async (req, res) => {
  const result = await ListByBrandService(req);
  return res.status(200).json(result);
};

export const ProductListByCategory = async (req, res) => {
  const result = await ListByCategoryService(req);
  return res.status(200).json(result);
};

export const ProductListByRemark = async (req, res) => {
  const result = await ListByRemarkService(req);
  return res.status(200).json(result);
};

export const ProductListBySmiler = async (req, res) => {
  const result = await ListBySmilierService(req);
  return res.status(200).json(result);
};

export const ProductDetails = async (req, res) => {
  const result = await ProductDetailsServices(req);
  return res.status(200).json(result);
};

export const ProductListByKeyword = async (req, res) => {
  const result = await ListByKeywordService(req);
  return res.status(200).json(result);
};

export const ProductListByFilter = async (req, res) => {
  let result = await ListByFilterService(req);
  return res.status(200).json(result);
};

export const ReviewList = async (req, res) => {
  const result = await ReviewListService(req);
  return res.status(200).json(result);
};

export const CreateReview = async (req, res) => {
  let result = await CreateReviewService(req);
  return res.status(200).json(result);
};

export default {
  ProductBrandList,
  ProductCategoryList,
  ProductSliderList,
  ProductListByBrand,
  ProductListByCategory,
  ProductListByRemark,
  ProductListBySmiler,
  ProductListByFilter,
  ProductDetails,
  ProductListByKeyword,
  ReviewList,
  CreateReview,
};
