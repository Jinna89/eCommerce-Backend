import FeaturesModel from '../models/FeaturesModel.js';
import LegalModel from '../models/LegalModel.js';

export const FeaturesListService = async () => {
     try {
         const data = await FeaturesModel.find().lean();
         return { status: "success", data };
     } catch (e) {
         return { status: "fail", message: e.message };
     }
};

export const LegalDetailsService = async (req) => {
     try {
          let type = req.params.type;
         const data = await LegalModel.find({ type }).lean();
         return { status: "success", data };
     } catch (e) {
         return { status: "fail", message: e.message };
     }
};