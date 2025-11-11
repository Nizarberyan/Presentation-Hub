import Presentation from "../models/Presentation.js";
import type {IPresentation} from "../types/presentation.type";

export const getAllPresentations = async (): Promise<IPresentation[]> => {
    return await Presentation.find()
        .populate('assignedTo', 'name email')
        .lean() as IPresentation[];
}