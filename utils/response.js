export const successResponse = (res, message, data) => {
    const response = { success: true, message };
    if (data !== undefined) response.data = data;
    return res.status(200).json(response);
};

export const errorResponse = (res, statusCode = 500, message, data) => {
    const response = { success: false, message };
    if (data !== undefined) response.data = data;
    return res.status(statusCode).json(response);
};

