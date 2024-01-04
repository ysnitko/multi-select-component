import React, { useRef, useState } from 'react';
import { options } from './constants';
import './App.css';

function App() {
  const [opened, setOpened] = useState(false);
  const [skill, setSkill] = useState([]);
  const [filteredList, setFilteredList] = useState(options);

  const inputRef = useRef('');

  const filterSkills = () => {
    const filtered = options.filter((item) =>
      item.value.toLowerCase().includes(inputRef.current.value.toLowerCase())
    );
    setOpened(true);
    setFilteredList(filtered);
    if (inputRef === '') {
      setFilteredList(options);
      setOpened(false);
    }
  };

  const deleteAllSkills = () => {
    setSkill([]);
    setFilteredList(options);
    inputRef.current.value = '';
  };

  const toggleMenu = () => {
    setOpened(!opened);
    if (opened) {
      deleteAllSkills();
    }
  };

  const addSkill = (event) => {
    const values = event.target.value;
    console.log(event.target.id);
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
            ref={inputRef}
            onInput={filterSkills}
          />
          <button
            className={
              opened ? 'toggle-selected-list close' : 'toggle-selected-list'
            }
            onClick={toggleMenu}
          ></button>
        </label>
      </div>
      {opened && (
        <select size={filteredList.length} onClick={addSkill}>
          {filteredList.map((item, index) => {
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
