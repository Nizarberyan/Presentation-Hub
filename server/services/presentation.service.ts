import Presentation from "../models/Presentation.js";
import type {IPresentation} from "../types/presentation.type";

export const getAllPresentations = async (): Promise<IPresentation[]> => {
    return await Presentation.find()
        .populate('assignedTo', 'name email')
        .lean() as IPresentation[];
}
export const getPresentationById = async (id: string): Promise<IPresentation | null> => {
    return await Presentation.findById(id)
        .populate('assignedTo', 'name email')
        .populate('createdBy', 'name email')
        .lean() as IPresentation | null;
}