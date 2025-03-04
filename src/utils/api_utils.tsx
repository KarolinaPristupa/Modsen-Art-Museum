import { IMAGE_BASE_URL } from '@constants/api';

export const getImageUrl = (imageId?: string) =>
    imageId ? `${IMAGE_BASE_URL}/${imageId}/full/400,/0/default.jpg` : '';

export const createFieldsString = <T extends object>(keys: Array<keyof T>) => keys.join(',');