import {Request, Response} from 'express';

function deleteAd (req: Request, res: Response) {
    return res.json({
        "status": "success",
        "message": ""
    })
}

export { deleteAd }