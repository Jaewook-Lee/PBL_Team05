import { Response } from 'express';

function checkUndefined(reqParams: any, keyParams: string[], res: Response): boolean {
    const paramNames : string[] = Object.keys(reqParams);
    for (let key of keyParams) {
        if (!paramNames.includes(key)){
            res.json({
                status : "error",
                message : `필수 파라미터(${key}) 없음`
            });
            return false;
        }
    }
    return true;
}

export { checkUndefined }