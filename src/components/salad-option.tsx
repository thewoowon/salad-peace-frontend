import React from "react";

interface ISaladOptionProps {
  isSelected: boolean;
  name: string;
  extra?: number | null;
  saladId: number;
  addOptionToItem: (dishId: number, optionName: string) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

export const SaladOption: React.FC<ISaladOptionProps> = ({
  isSelected,
  name,
  extra,
  addOptionToItem,
  removeOptionFromItem,
  saladId,
}) => {
  const onClick = (e:any) => {
    if (isSelected) {
      removeOptionFromItem(saladId, name);
    } else {
      addOptionToItem(saladId, name);
    }
    e.stopPropagation();
  };
  return (
    <span
      onClick={onClick}
      className={`border px-2 py-1 ${
        isSelected ? "border-gray-800" : "hover:border-gray-800"
      }`}
    >
      <span className="mr-2">{name}</span>
      {<span className="text-sm opacity-75">(${extra})</span>}
    </span>
  );
};