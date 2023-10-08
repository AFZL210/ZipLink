import z from 'zod';

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
    id: StringORNull,
    email: StringORNull,
    username: StringORNull,
    profileImg?: StringORNull
}
