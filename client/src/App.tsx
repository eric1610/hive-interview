import Dropdown from "./Dropdown";

const App = () => {
  const ageDropdownItems = [
    "None",
    "Twenty",
    "Twenty one",
    "Twenty one and a half",
    "Twenty two and two million halves",
  ];

  const tagDropdownItems = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Jack Rowlins",
    "Phil Wilkers",
    "Malcom in the Middle",
  ];

  return (
    <div>
      <Dropdown items={ageDropdownItems} label="Age" />
      <Dropdown items={tagDropdownItems} label="Tag" isMultiSelect />
    </div>
  );
};

export default App;
