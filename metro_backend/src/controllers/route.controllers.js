import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { findRoute } from "../services/routing.services.js";

const getRoute = asyncHandler(async (req, res) => {
    const { startPoint, endPoint} = req.query;

    if (!startPoint || !endPoint) {
        throw new ApiError(400, "Both the fields are required");
    }

    const route = await findRoute({
        startPoint,
        endPoint,
    });

    if(!route){
        throw new ApiError(500, "Failed to find route");
    }

    return res.status(200).json(
        new ApiResponse(200, route, "Route found successfully")
    );
});


export { 
    getRoute 
};