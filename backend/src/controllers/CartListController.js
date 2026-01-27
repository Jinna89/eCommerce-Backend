import {CartListService, SaveCartListService, UpdateCartListService, RevoveCartListService} from '../services/CartListServices.js'

export const CartList = async (req, res) => {
     let result = await CartListService(req);
     return res.status(200).json(result)
}

export const SaveCartList = async (req, res) => {
     let result = await SaveCartListService(req);
     return res.status(200).json(result)
}

export const UpdateCartList = async (req, res) => {
     let result = await UpdateCartListService(req);
     return res.status(200).json(result)
}

export const RevoveCartList = async (req, res) => {
     let result = await RevoveCartListService(req);
     return res.status(200).json(result)
}

export default {
     CartList,
     SaveCartList,
     UpdateCartList,
     RevoveCartList
}