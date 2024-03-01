export interface Footer {
    buttons: Array<
        {
            className: string;
            linkTo?: string;
            onClick: () => void;
            buttonText: React.ReactNode;
            variant: any;
            component: any;
        }>
    isFormEmpty: boolean;
}