export interface Footer {
    className: string,
    buttonText: string,
    onClickButtonSaveAndExit?: () => void,
    onClickButtonSavaAndReset?: () => void,
    linkTo?: string,
    buttonText2?: string,
    onClick?: () => void,
}