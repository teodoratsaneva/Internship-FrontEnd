import { ReactNode } from "react";

export interface TextButtonProps {
    value: string;
    onChangeName: (value: string) => void;
    onChangeQuantity?: (value: string) => void;
    onAddIngredient: () => void;
    parentId?: string | null;
    children?: ReactNode;
  }