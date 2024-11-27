export type StoreLogin = {
    username: string
    password: string
}

  export type StoreToken = {
    access_token: string
    refresh_token: string
}

export type UserProps = {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    password: string;
    role: string;
    enabled: boolean;
    image: string | null;
}