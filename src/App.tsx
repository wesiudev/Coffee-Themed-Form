import { useState } from "react";
import FloatingInput from "./components/FloatingInput/FloatingInput";
import SelectInput from "./components/SelectInput/SelectInput";
import Loader from "./components/Loader/Loader";
import "./components/styles/index.css";
import coffeeBean from "./images/coffeeBean.png";
import { itemsList } from "./data/itemsList";
import { CredsState, CoffeeState } from "./types/types";
import orangeCup from "./images/orangeCup.png";
import redCup from "./images/redCup.png";
import moment from "moment";
function App() {
  const [{ userName, isSugar, isMilk }, setCredentials] = useState<CredsState>({
    userName: "",
    isSugar: false,
    isMilk: false,
  });

  const [chosenCup, setChosenCup] = useState<number>(0);

  const [{ coffeeId, coffeeName }, setCoffeeId] = useState<CoffeeState>({
    coffeeId: "",
    coffeeName: "",
  });

  const [currentStep, setCurrentStep] = useState<number>(1);

  const [isSubmitted, setSubmitted] = useState(false);

  const [fakeLoading, setFakeLoading] = useState<boolean>(false);

  const handleTextInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCredentials({
      userName,
      isSugar,
      isMilk,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectInput = (item: CoffeeState) => {
    setCoffeeId(item);
  };

  const submitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  function setButtonStyles() {
    if (currentStep != 1) {
      return {
        width: "100px",
        margin: "0 5px",
      };
    }
  }

  const handleStepByButton = (variant: string) => {
    switch (variant) {
      case "decrement":
        setCurrentStep(currentStep - 1);
        return;
      case "increment":
        if (currentStep < 3) {
          setFakeLoading(true);
          setTimeout(() => {
            setFakeLoading(false);
          }, Math.random() * 1000);
          setCurrentStep(currentStep + 1);
        }
        return;
      default:
        return;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setCurrentStep(4);
  };

  const date = moment().format("HH:mm dddd YYYY");
  return (
    <div className="wrapper">
      <div className="wrapper__content">
        {isSubmitted ? null : (
          <h1>
            Hello coffee lovers
            <img
              style={{ width: "5%", marginLeft: "5px" }}
              src={coffeeBean}
              alt=""
            />
          </h1>
        )}

        {fakeLoading ? (
          <Loader />
        ) : (
          <form onSubmit={submitForm} action="">
            {currentStep === 1 ? (
              <>
                <FloatingInput>
                  <input
                    value={userName}
                    placeholder="placeholder"
                    type="text"
                    name="userName"
                    onChange={handleTextInput}
                  />
                  <label>First name</label>
                </FloatingInput>
                <SelectInput
                  placeholder="Select item"
                  options={itemsList}
                  onSelect={handleSelectInput}
                />
              </>
            ) : null}
            {currentStep === 2 ? (
              <>
                <h2>Do you sweeten?</h2>
                <button
                  className="wrapper__content__boolean"
                  onClick={() =>
                    setCredentials({
                      userName: userName,
                      isSugar: !isSugar,
                      isMilk: isMilk,
                    })
                  }
                >
                  <div className={isSugar ? "activated" : ""}></div>
                </button>
                <h2>Do you milken?</h2>
                <button
                  className="wrapper__content__boolean"
                  onClick={() =>
                    setCredentials({
                      userName: userName,
                      isSugar: isSugar,
                      isMilk: !isMilk,
                    })
                  }
                  style={{ marginBottom: "20px" }}
                >
                  <div className={isMilk ? "activated" : ""}></div>
                </button>
              </>
            ) : null}
            {currentStep === 3 ? (
              <>
                <h2>Choose your cup</h2>
                <div className="wrapper__content__cups">
                  <div
                    onClick={() => setChosenCup(1)}
                    className={
                      chosenCup === 1
                        ? "chosenCup wrapper__content__cups__cup"
                        : "wrapper__content__cups__cup"
                    }
                  >
                    <img src={redCup} alt="" />
                  </div>
                  <div
                    onClick={() => setChosenCup(2)}
                    className={
                      chosenCup === 2
                        ? "chosenCup wrapper__content__cups__cup"
                        : "wrapper__content__cups__cup"
                    }
                  >
                    <img src={orangeCup} alt="" />
                  </div>
                </div>
              </>
            ) : null}
            {isSubmitted ? (
              <div
                className={
                  isSubmitted ? "wrapper__content__receipt receipt-animate" : ""
                }
              >
                <div>
                  <h3>Receipt</h3>
                  <h5>{date}</h5>

                  <code>Merchant: {userName}</code>
                  <br />
                  <code>
                    Item: {coffeeId}.{coffeeName}
                  </code>
                </div>
                <div className="wrapper__content__receipt__details">
                  <div className="wrapper__content__receipt__details__remarks">
                    <code>Remarks:</code>
                    <code>{isSugar ? "-With sugar" : "-No sugar"}</code>
                    <code>{isMilk ? "-Extra milk" : "-No milk"}</code>
                    <code>{chosenCup === 1 ? "-Red cup" : "-Orange cup"}</code>
                  </div>
                  <div className="wrapper__content__receipt__details__price">
                    <code>Price:</code>
                    <code>0$</code>
                  </div>
                </div>
              </div>
            ) : null}
          </form>
        )}

        <div className="wrapper__content__buttons">
          {currentStep !== 1 && !isSubmitted ? (
            <button
              onClick={() => handleStepByButton("decrement")}
              style={setButtonStyles()}
              className="submitBtn"
            >
              Previous
            </button>
          ) : null}
          {!isSubmitted ? (
            <button
              onClick={
                currentStep === 3
                  ? handleSubmit
                  : () => handleStepByButton("increment")
              }
              style={setButtonStyles()}
              className="submitBtn"
            >
              {currentStep === 3 ? "Submit" : "Next"}
            </button>
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "rgb(236, 236, 236)",
                marginTop: "35px",
              }}
            >
              Have a nice day
              <br />
              Zapraszamy ponownie{" :)"}
            </div>
          )}
        </div>
        <div className="wrapper__content__dots">
          {isSubmitted ? null : (
            <>
              <div
                onClick={() => setCurrentStep(1)}
                className={
                  currentStep === 1
                    ? "wrapper__content__dots__dot highlight"
                    : "wrapper__content__dots__dot"
                }
              ></div>
              <div
                onClick={() => setCurrentStep(2)}
                className={
                  currentStep === 2
                    ? "wrapper__content__dots__dot highlight"
                    : "wrapper__content__dots__dot"
                }
              ></div>
              <div
                onClick={() => setCurrentStep(3)}
                className={
                  currentStep === 3
                    ? "wrapper__content__dots__dot highlight"
                    : "wrapper__content__dots__dot"
                }
              ></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
