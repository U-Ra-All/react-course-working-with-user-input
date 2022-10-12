import { useState, useRef, useEffect } from "react";

const SomeInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [isEnteredNameValid, setIsEnteredNameValid] = useState(false);
  const [wasNameInputTouched, setWasNameInputTouched] = useState(false);

  useEffect(() => {
    if (isEnteredNameValid) {
      console.log("Данные в инпуте валидны");
    }
  }, [isEnteredNameValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setWasNameInputTouched(true);

    if (enteredName.trim() === "") {
      setIsEnteredNameValid(false);
      return;
    }

    setIsEnteredNameValid(true);

    console.log(enteredName);
    console.log(nameInputRef.current.value);
    setEnteredName("");
    // nameInputRef.current.value = ""; not best practice
  };

  const isNameInputInvalid = !isEnteredNameValid && wasNameInputTouched;

  const nameInputClasses = isNameInputInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Введите Имя</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
        {isNameInputInvalid && (
          <p className="error-text">Нужно обязательно ввести имя</p>
        )}
      </div>
      <div className="form-actions">
        <button>Отправить</button>
      </div>
    </form>
  );
};

export default SomeInput;
