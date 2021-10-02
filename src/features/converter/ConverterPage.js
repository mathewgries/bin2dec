import React, { useState } from "react";
import './style.css'

export const ConverterPage = () => {
  const [input, setInput] = useState("");
  const [decVal, setDecVal] = useState(0);
  let maxLength = input.length === 8;

  const handleInputUpdate = (e) => {
    const { value } = e.target;
    const { inputType } = e.nativeEvent;

    if (!maxLength || inputType === "deleteContentBackward") {
      for (let i = 0; i < value.length; i++) {
        const num = value.charAt(i);
        if (num !== "0" && num !== "1") {
          alert("Enter 1 or 0");
          return;
        }
      }
      setInput(value);
    }
  };

  const caluclateDecimalvalue = (binValue, pos) => {
    const bin = parseFloat(binValue);
    return bin * Math.pow(2, pos);
  };

  const getAnswer = (binValue) => {
    let result = 0;
    for (let i = 0; i < binValue.length; i++) {
      const pos = binValue.length - i - 1;
      result += caluclateDecimalvalue(binValue.charAt(i), pos);
    }
    setDecVal(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getAnswer(input);
  };

  return (
    <section className='container'>
      <h2>Convert Binary To Decimal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            autoFocus={true}
            type="text"
            value={input}
            onChange={handleInputUpdate}
          />
        </div>
        <div>
          <input
            contentEditable={false}
            type="text"
            value={decVal}
            onChange={null}
          />
        </div>
        <div>
          <button type="submit" disabled={!maxLength}>
            Convert
          </button>
        </div>
      </form>
    </section>
  );
};
