export type Status = "success" | "fail";

export interface GenericResponse {
    status: Status,
    message: string
}

export interface AdList {
    status: Status
    data: {
        content: string,
        width: number,
        height: number,
        slotId: string,
        exposureTime: string
    }
}

export type DeleteAdResult = GenericResponse

export interface CreateAdParams {
    name: string,
    advertiser: string,
    createdAt: string,
    country: string,
    gender: string,
    periodBegin: string,
    periodEnd: string,
    maxViewCount: number
}

export interface CreateAdResult extends GenericResponse {
    adId?: number
}

export type ActiveAdResult = GenericResponse

export type UploadContentsResult = GenericResponse


export class Fetch {
    private static readonly _entry = "http://13.125.111.160:8000";

    public static async requestList(
        country: string,
        gender: string
    ): Promise<AdList> {
        country;
        gender;
        console.log("sans");
        const response = await fetch(`${this._entry}/AD/requestList`, {
            method: "GET"
        });

        return response.json();
    }

    public static async deleteAd(adId: number): Promise<DeleteAdResult> {
        const response = await fetch(`${this._entry}/AD/deleteAd`, {
            method: "DELETE",
            body: JSON.stringify({
                adId: adId
            })
        });

        return response.json();
    }

    public static async createAd(params: CreateAdParams): Promise<CreateAdResult>;

    public static async createAd(params: Partial<CreateAdParams>, adId: number): Promise<CreateAdResult>;

    public static async createAd(params: Partial<CreateAdParams>, adId?: number): Promise<CreateAdResult> {
        const response = await fetch(`${this._entry}/AD/createAd`, {
            method: adId ? "PUT" : "POST",
            body: JSON.stringify(
                adId ? {
                    adId: adId,
                    ...params
                } : params
            )
        });

        return response.json();
    }

    public static async activeAd(adId: number): Promise<ActiveAdResult> {
        const response = await fetch(`${this._entry}/AD/activeAd`, {
            method: "POST",
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
            body: JSON.stringify({
                adId: adId,
                contents: contents
            })
        });

        return response.json();
    }

    public static async collectHitStatistics(
        adId: number
    ): Promise<void> {
        const response = await fetch(`${this._entry}/AD/collectHit`, {
            method: "PUT",
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
            body: JSON.stringify({
                adId: adId,
                watchTime: watchTime
            })
        });

        return response.json();
    }
}
