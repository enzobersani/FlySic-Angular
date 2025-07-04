export interface UpdatePasswordModel {
    userId: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}