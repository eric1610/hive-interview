import { useState, useCallback, useEffect } from "react";
import "./styles.css";
import ChevronUp from "./chevron-up.svg";
import ChevronDown from "./chevron-down.svg";

type DropdownType = {
  isMultiSelect?: boolean;
  items: string[];
  onItemSelect?: (item: string) => void;
  label: string;
};

type ItemSelectedType = {
  item: string;
  selected: boolean;
};

const Dropdown = ({
  items,
  isMultiSelect = false,
  label,
  onItemSelect,
}: DropdownType) => {
  const [value, setValue] = useState<string>("");
  const [itemsSelected, setItemsSelected] = useState<ItemSelectedType[]>(
    items.map((item) => {
      return { item, selected: false };
    })
  );
  const [toggleOptions, setToggleOptions] = useState<boolean>(false);
  const [toggleAll, setToggleAll] = useState<boolean>(false);
  const toggleDropdownList = useCallback(() => {
    setToggleOptions((prev) => !prev);
  }, []);

  const handleItemSelect = useCallback(
    (index: number) => {
      setItemsSelected((prev) => {
        let prevCopy;
        const item = prev[index];
        if (!isMultiSelect) {
          prevCopy = prev.map((itemSelect) => {
            return {
              ...itemSelect,
              selected: false,
            };
          });
        } else {
          prevCopy = [...prev];
        }
        prevCopy[index] = {
          ...item,
          selected: !item.selected,
        };
        return prevCopy;
      });
      if (!isMultiSelect) {
        setToggleOptions(false);
      }
    },
    [isMultiSelect]
  );

  const onToggleSelectAll = () => {
    setToggleAll((prev) => !prev);
  };
  useEffect(() => {
    setItemsSelected((prev) => {
      return prev.map((itemSelect) => {
        return { ...itemSelect, selected: toggleAll };
      });
    });
  }, [toggleAll]);

  useEffect(() => {
    const filteredSelected = itemsSelected.filter(
      (itemSelect: ItemSelectedType) => itemSelect.selected
    );
    filteredSelected.forEach((itemSelect) => {
      onItemSelect && onItemSelect(itemSelect.item);
    });
    setValue(
      filteredSelected
        .map((itemSelect: ItemSelectedType) => itemSelect.item)
        .join(", ")
    );
  }, [itemsSelected, onItemSelect]);
  return (
    <div className="dropdown-container">
      <div className="display-options">
        <label htmlFor={label}>{label}</label>
        <input
          name={label}
          type="text"
          value={value}
          onClick={toggleDropdownList}
          readOnly
        />
        <img
          src={toggleOptions ? ChevronUp : ChevronDown}
          alt={toggleOptions ? "chevron up" : "chevron down"}
          className="display-image"
          onClick={() => {
            setToggleOptions((prev) => !prev);
          }}
        />
      </div>
      {toggleOptions && (
        <div className="dropdown-options">
          {isMultiSelect && (
            <div
              className={
                "dropdown-options-item" + (toggleAll ? " selected " : "")
              }
              onClick={onToggleSelectAll}
            >
              <input
                type="checkbox"
                readOnly
                checked={toggleAll}
                className="item-pointer"
              />
              Select all
            </div>
          )}
          {itemsSelected.map((optionItem, index) => {
            return (
              <div
                key={index}
                className={
                  "dropdown-options-item" +
                  (optionItem.selected ? " selected " : "")
                }
                onClick={handleItemSelect.bind(null, index)}
              >
                {isMultiSelect && (
                  <input
                    type="checkbox"
                    readOnly
                    checked={optionItem.selected}
                    className="item-pointer"
                  />
                )}
                {optionItem.item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
