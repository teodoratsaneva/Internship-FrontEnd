import { ReactNode } from "react";

export interface TextButtonProps {
    value: string;
    onChangeName: (value: string) => void;
    onChangeAmount?: (value: string) => void;
    onAddIngredient: () => void;
    onRemoveIngredient?: (value: Event) => void;
    parentId?: string | null;
    children?: ReactNode;
  }