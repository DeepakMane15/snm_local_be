import sadhsangatDataModel, { SadhsangatDataModel } from "../models/sadhsangatDataModel";


const createSadhsangat = async (sadhsangatData: SadhsangatDataModel) => {
    // You might want to perform additional validation or transformation here
    return await sadhsangatDataModel.insertSadhsangat(sadhsangatData);
};

const getSadhsangat = async (sadhsangatId: number) => {
    // You might want to perform additional validation or transformation here
    return await sadhsangatDataModel.getSadhsangat(sadhsangatId);
};



export default {
    createSadhsangat,getSadhsangat
};
