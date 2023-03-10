export type User = {
    id: number,
    email: string,
    nickname: string | null,
    followingIds: number[],
    username: string,
    password: string,
    info: UserInfo
    bitsId: number[],
}

export enum Gender {
    MALE,
    FEMALE,
    OTHER,
    HIDDEN,
}

export type UserInfo = {
    gender: Gender
}


