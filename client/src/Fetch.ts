export type Status = "success" | "fail";

export interface GenericResponse {
    status: Status,
    message: string
}

export interface AdminAdList {
    adCount: number,
    data: {
        isActive: 1 | 0,
        adId: number,
        name: string,
        createAt: string, // yyyy-mm-dd hh:mm:ss
        periodBegin: string, // yyyy-mm-dd hh:mm:ss
        periodEnd: string, // yyyy-mm-dd hh:mm:ss
        maxViewCount: number
    }[];
}

export interface AdList {
    status: Status
    data: {
        content: string, // html content
        width: number,
        height: number,
        slotId: string, // html element id
        exposureTime: string // yyyy-mm-dd hh:mm:ss
    }[];
}

export type DeleteAdResult = GenericResponse;

export enum Gender {
    male = 1 << 0,
    felmale = 1 << 1,
    unknown = 1 << 2
}

export interface CreateAdParams {
    name: string,
    advertiser: string,
    createdAt: string, // yyyy-mm-dd hh:mm:ss
    country: string, // iso-3166-1 country
    gender: Gender,
    periodBegin: string, // yyyy-mm-dd hh:mm:ss
    periodEnd: string, // yyyy-mm-dd hh:mm:ss
    maxViewCount: number
}

export interface CreateAdResult extends GenericResponse {
    adId?: number
}

export type ActiveAdResult = GenericResponse;

export type DeactiveAdResult = GenericResponse;

export type UploadContentsResult = GenericResponse;

export type ReadAdResult = {
    adName: string,
    contents: string,
    period: string,
    unitPrice: string,
    advertiser: string,
    language: string,
    adType: string,
    hitCount: number,
    watchTimeSum: number
};

export class Fetch {
    private static readonly _entry = "http://13.125.111.160:8000";

    public static async requestAdminList(
        offset: number,
        length: number
    ): Promise<AdminAdList>;

    public static async requestAdminList(
        offset: number,
        length: number,
        searchWord: string,
        searchType: string
    ): Promise<AdminAdList>;

    public static async requestAdminList(
        offset: number,
        length: number,
        searchWord?: string,
        searchType?: string
    ): Promise<AdminAdList> {
        const query = new URLSearchParams({
            offset: offset.toString(),
            length: length.toString()
        });
        if (searchWord) {
            query.append("searchWord", searchWord);
            query.append("searchType", searchType!);
        }
        const response = await fetch(`${this._entry}/AD/requestAdminList?${query}`, {
            method: "GET"
        });

        return response.json();
    }

    public static async requestList(
        country: string,
        gender: Gender
    ): Promise<AdList> {
        const query = new URLSearchParams({
            country: country,
            gender: gender.toString()
        });
        const response = await fetch(`${this._entry}/AD/requestList?${query}`, {
            method: "GET"
        });

        return response.json();
    }

    public static async deleteAd(adId: number): Promise<DeleteAdResult> {
        const response = await fetch(`${this._entry}/AD/deleteAd`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                adId: adId
            })
        });

        return response.json();
    }

    public static async createAd(params: CreateAdParams): Promise<CreateAdResult> {
        const response = await fetch(`${this._entry}/AD/createAd`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        });

        return response.json();
    }

    public static async activeAd(adId: number): Promise<ActiveAdResult> {
        const response = await fetch(`${this._entry}/AD/activeAd`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                adId: adId
            })
        });

        return response.json();
    }

    public static async deactiveAd(adId: number): Promise<DeactiveAdResult> {
        const response = await fetch(`${this._entry}/AD/deactiveAd`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                adId: adId
            })
        });

        return response.json();
    }

    public static async uploadContents(
        adId: number,
        contents: string
    ): Promise<UploadContentsResult> {
        const response = await fetch(`${this._entry}/AD/uploadContents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                adId: adId,
                contents: contents
            })
        });

        return response.json();
    }

    public static async readAd(adId: number): Promise<ReadAdResult> {
        const query = new URLSearchParams({
            adId: adId.toString()
        });
        const response = await fetch(`${this._entry}/AD/readAd?${query}`, {
            method: "GET"
        });

        return response.json();
    }

    public static async updateAd(params: Partial<CreateAdParams>, adId: number): Promise<CreateAdResult> {
        const response = await fetch(`${this._entry}/AD/updateAd`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                adId ? {
                    adId: adId,
                    ...params
                } : params
            )
        });

        return response.json();
    }

    public static async collectHitStatistics(
        adId: number
    ): Promise<void> {
        const response = await fetch(`${this._entry}/AD/collectHit`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                adId: adId
            })
        });

        return response.json();
    }

    public static async collectWatchTimeStatistics(
        adId: number,
        watchTime: number
    ): Promise<void> {
        const response = await fetch(`${this._entry}/AD/collectWatchTime`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                adId: adId,
                watchTime: watchTime
            })
        });

        return response.json();
    }
}
