import z, { boolean } from 'zod';

export const SignupFormSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Enter a valid email" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters" }),
});

export type SignupFormType = z.infer<typeof SignupFormSchema>;


export const LoginFormSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Enter a valid email" }),
    password: z.string().min(8, { message: "Password must be atleast 8 characters" }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export interface ICustomError {
    response?: {
        data?: {
            msg?: string;
        };
    };
}

export type StringORNull = string | null

export type UserStateType = {
    id?: StringORNull,
    email?: StringORNull,
    username?: StringORNull,
    image?: StringORNull,
    name?: StringORNull,
    loading: boolean
}

export type LinkItemType = {
    id: string,
    favicon: string,
    url: string,
    shortUrl: string,
    clicks: number,
    createdAt: string,
    getLinks: () => Promise<ILink[] | undefined>,
    isProtected: boolean,
    password: string,
    urlCode: string
}

export interface ILinkLocation {
    id: string,
    linkId?: string,
    coutry?: string,
    city?: string,
    clicks?: number,
}

export interface ILink {
    id: string,
    userId: string,
    favicon: string,
    url: string,
    shortUrl: string,
    urlCode: string,
    clicks: number,
    isPrivate: boolean,
    password: string,
    user: UserStateType,
    createdAt: Date,
    updatedAt: Date,
    lastClicked: Date,
    locations?: ILinkLocation[]
}


export type UpdateLinkModalPropType = {
    url: string,
    shortUrl: string,
    isProtected: boolean,
    password: string,
    getLinks: () => any
}

export type CreateModalPropsType = {
    getLinks: () => Promise<ILink[] | undefined>
}

export const UpdateLinkSchema = z.object({
    isProtected: z.boolean(),
    destinationUrl: z.string().min(1),
    password: z.string(),
    linkId: z.string().min(1)
})

export interface IDate {
    date: string,
    clicks: number
}

export interface IOs {
    os: string,
    clicks: number
}

export interface IDevice {
    device: string,
    clicks: number
}
