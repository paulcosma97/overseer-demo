export interface ModalState {
    open: boolean;
}

export interface ErrorModalState extends ModalState {
    message: string;
}
