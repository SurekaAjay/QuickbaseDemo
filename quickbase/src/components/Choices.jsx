import Select from "react-select";
import { SORTING_CHOICE } from "../constants/constants";
import { ChoiceWrapper } from "./ChoicesStyle";

const Choices = (props) => {
  return (
    <ChoiceWrapper>
      <div className="choices-style">
        <label htmlFor="countries">Choices</label>
        <Select
          isMulti={!props.isSingleSelect}
          options={props.country}
          onChange={(e) => props.onChange(e, "choices")}
          value={props.selectedChoices}
        ></Select>
      </div>
      <div>
        <label htmlFor="sorting">Order: </label>
        <select
          name="sorting"
          id="sorting"
          className="sort-style"
          onChange={(event) => props.onClickSort(event)}
        >
          {SORTING_CHOICE.map((sortVal) => {
            return (
              <option value={sortVal} key={sortVal}>
                {sortVal}
              </option>
            );
          })}
        </select>
      </div>
    </ChoiceWrapper>
  );
};

export default Choices;
