import { FeaturesListService, LegalDetailsService } from "../services/FeaturesServices.js";

export const FeaturesList = async (req, res) => {
     const result = await FeaturesListService();
     return res.status(200).json(result);
};

export const LegalDetails = async (req, res) => {
     const result = await LegalDetailsService(req);
     return res.status(200).json(result);
};

export default {
     FeaturesList,
     LegalDetails,
};