import sadhsangatDataModel, { SadhsangatDataModel } from "../models/sadhsangatDataModel";


const createSadhsangat = async (sadhsangatData: SadhsangatDataModel) => {
    // You might want to perform additional validation or transformation here
    return await sadhsangatDataModel.insertSadhsangat(sadhsangatData);
};

const getSadhsangat = async (sadhsangatId: number) => {
    // You might want to perform additional validation or transformation here
    return await sadhsangatDataModel.getSadhsangat(sadhsangatId);
};

const updateSadhsangat = async (id: number, updateData: Partial<SadhsangatDataModel>) => {
    const existingRecord = await sadhsangatDataModel.getById(id);

    if (!existingRecord) {
        return null;
    }

    // Update the record using the stored procedure or direct query
    await sadhsangatDataModel.update(id, updateData);

    return true;
};


const deleteSadhsangat = async (id: number): Promise<boolean> => {
    return await sadhsangatDataModel.getSadhsangat(id);
};


export default {
    createSadhsangat,getSadhsangat, updateSadhsangat, deleteSadhsangat
};
