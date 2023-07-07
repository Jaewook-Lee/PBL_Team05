function checkUndefined(reqParams: any, keyParams: string[]): boolean {
    const paramNames : string[] = Object.keys(reqParams);
    for (let key of keyParams) {
        if (!paramNames.includes(key)){
            return false;
        }
    }
    return true;
}

export { checkUndefined }