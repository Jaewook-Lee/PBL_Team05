import iso from 'iso-3166-1';

function country2Num(countryName: string): number {
    const isoAllData = iso.all();
    for (let i : number = 0; i < isoAllData.length; i++) {
        if (countryName === isoAllData[i].country) {
            return Number(isoAllData[i].numeric);
        }
    }

    // 나라 이름에 맞는 숫자 코드를 찾지 못 함.
    return -1;
}

export { country2Num };