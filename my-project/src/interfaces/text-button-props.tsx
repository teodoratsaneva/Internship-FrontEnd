import React, { ReactNode } from "react";

export interface TextButtonProps {
    value: string;
    onChange: (value: string) => void;
    onChange2?: (value: string) => void;
    onAddIngredient: () => void;
    parentId?: string | null;
    children?: ReactNode;
  }