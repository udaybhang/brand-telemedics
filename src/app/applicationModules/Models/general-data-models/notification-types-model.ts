export class NotificationType {
    public id!: number;
    public labelText!: string;
    public name!: string;
}


export class UserNotificationTypes extends NotificationType {
    public isEmail!: boolean;
    public isSMS!: boolean;
}