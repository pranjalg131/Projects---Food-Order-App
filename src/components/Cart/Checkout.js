import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    onChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
    reset: nameResetHandler,
  } = useInput(isNotEmpty);

  const nameClasses = `${classes.control} ${
    nameHasError ? classes.invalid : ""
  }`;

  const {
    value: enteredStreet,
    isValid: streetIsValid,
    hasError: streetHasError,
    onChangeHandler: streetChangeHandler,
    onBlurHandler: streetBlurHandler,
    reset: streetResetHandler,
  } = useInput(isNotEmpty);

  const streetClasses = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;

  const {
    value: enteredPostalCode,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    onChangeHandler: postalCodeChangeHandler,
    onBlurHandler: postalCodeBlurHandler,
    reset: postalCodeResetHandler,
  } = useInput(isFiveChars);

  const postalCodeClasses = `${classes.control} ${
    postalCodeHasError ? classes.invalid : ""
  }`;

  const {
    value: enteredCity,
    isValid: cityIsValid,
    hasError: cityHasError,
    onChangeHandler: cityChangeHandler,
    onBlurHandler: cityBlurHandler,
    reset: cityResetHandler,
  } = useInput(isNotEmpty);

  const cityClasses = `${classes.control} ${
    cityHasError ? classes.invalid : ""
  }`;

  let formIsValid = false;
  if (nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid)
    formIsValid = true;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    const data = {
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    };

    props.onSubmit(data);

    nameResetHandler();
    streetResetHandler();
    postalCodeResetHandler();
    cityResetHandler();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p>Name must not be empty</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && <p>Street must not be empty</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
        />
        {postalCodeHasError && <p>Postal Code must be 5 digits only</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p>City must not be empty</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
