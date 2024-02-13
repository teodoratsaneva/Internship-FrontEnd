import { ReactNode } from "react";

export interface TextButtonProps {
    value: string;
    onChangeName: (value: string) => void;
    onChangeQuantity?: (value: string) => void;
    onAddIngredient: () => void;
    onRemoveIngredient?: (value: string) => void;
    parentId?: string | null;
    children?: ReactNode;
    style: any
  }