import React, { useEffect, useState } from "react";
import { options } from "./constants";
import "./App.css";

function App() {
  const [opened, setOpened] = useState(false);
  const [skill, setSkill] = useState([]);

  const deleteAllSkills = () => {
    setSkill([]);
  };

  const toggleMenu = () => {
    setOpened(!opened);
    if (opened) {
      deleteAllSkills();
    }
  };

  const addSkill = (event) => {
    const values = event.target.value;
    for (let index = 0; index < skill.length; index++) {
      const element = skill[index];
      if (element.value === values || skill.length > 4) {
        return;
      }
    }
    setSkill([...skill, { value: event.target.value }]);
  };

  const deleteSkill = (value) => {
    const findDeleteSkill = skill.filter((item) => item.value !== value);
    setSkill(findDeleteSkill);
  };

  return (
    <div className="App">
      <div className="skills-row">
        <ul className="skill-list">
          {skill.map((item, index) => {
            return (
              <li className="skill" key={index}>
                <span>{item.value}</span>
                <button
                  className="delete-skill"
                  onClick={() => deleteSkill(item.value)}
                ></button>
              </li>
            );
          })}
        </ul>
        <label htmlFor="selected-list">
          <input
            id="selected-list"
            type="text"
            placeholder="Add upto 5 skills"
          />
          <button
            className={
              opened ? "toggle-selected-list close" : "toggle-selected-list"
            }
            onClick={toggleMenu}
          ></button>
        </label>
      </div>

      {opened && (
        <select size={5} onChange={addSkill}>
          {options.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.value}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
}

export default App;
