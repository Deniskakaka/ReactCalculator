import React, { useState, useEffect } from 'react';
import { answearDesicion } from "./functionDesicion.js";
import "./main.scss";

function Calculator() {
    const [number, setNumber] = useState('0');
    const [answear, setAnswear] = useState('')
    const [plus, setPlus] = useState(true);
    const [minus, setMinus] = useState(true);
    const [multi, setMulti] = useState(true);
    const [equals, setEquals] = useState(true);
    const [delet, setDelet] = useState(true);

    useEffect(() => {
        if (answear.split("=")[1] !== undefined &&  answear.split("=")[1].length > 16) {
            setAnswear('');
            setNumber("very big number")
        }
        if (answear.split("=")[1] !== undefined &&  answear.split("=")[0].length >= 8) {
            setAnswear(answear.split("=")[1])
        }
    });

    function handleClick(e) {
        setPlus(true);
        setMinus(true);
        setEquals(true);
        setMinus(true);
        setMulti(true);
        setDelet(true);

        if (!answearDesicion(answear)) {
            setNumber(number + e.target.innerHTML);
            setAnswear(answear + e.target.innerHTML);
        }
        if (number === "0") {
            setNumber(e.target.innerHTML);
        }
        if (number === "+" || number === "-" || number === "*" || number === "/") {
            setNumber(String(e.target.innerHTML));
        }
        if (answearDesicion(answear)) {
            if (answear.split('=')[1] === answear.split('=')[0]) {
                setNumber(String(e.target.innerHTML));
                setAnswear(String(e.target.innerHTML));
            }
        }
        if (e.target.innerHTML === "." && number === "0") {
            setNumber("0" + ".");
        }
        if (String(number.length) > 12) {
            setNumber('very big number');
            setAnswear('');
        }
    };

    function action(e) {
        if (e.target.classList.value.slice(-4) === "plus" && plus) {
            if (answear === "") {
                return null;
            }
            if (!answearDesicion(answear)) {
                setAnswear(answear + '+');
                setNumber('+');
                setPlus(false);
            } else {
                setNumber('+');
                setAnswear(answear.split('=')[1] + "+");
            }
        }
        if (e.target.classList.value.slice(-5) === "minus" && minus) {
            if (!answearDesicion(answear)) {
                setNumber("-");
                setAnswear(answear + "-");
                setMinus(false);
            } else {
                setNumber("-");
                setAnswear(answear.split('=')[1] + "-");
            }
        }
        if (e.target.classList.value.slice(-5) === "multi" && multi) {
            if (answear === "") {
                return null;
            }
            if (!answearDesicion(answear)) {
                setNumber("*");
                setAnswear(answear + "*");
                setMulti(false)
            } else {
                setNumber("*");
                setAnswear(answear.split('=')[1] + "*")
            }
        }
        if (e.target.classList.value.slice(-5) === "delet" && delet) {
            if (answear === "") {
                return null;
            }
            if (!answearDesicion(answear)) {
                setNumber("/");
                setAnswear(answear + "/");
                setDelet(false);
            } else {
                setNumber("/");
                setAnswear(answear.split('=')[1] + "/");
            }
        }
        if (e.target.classList.value.slice(-6) === "equals" && equals) {
            if (String(eval(answear)).length > 10) {
                setAnswear(eval(answear).toExponential(4));
            } else if (answear !== "") {
                setAnswear(answear + "=" + eval(answear))
                setNumber("0");
                setEquals(false);
            }
            if (String(answear.length) > 12) {
                setNumber('very big number');
                setAnswear('');
            }
        }
    };

    function cancellation() {
        if (number === 'very big number') {
            setNumber('0')
        }
        else if (number.length == 1 || answearDesicion(answear)) {
            setNumber("0")
            setAnswear("")
        }
        else if (number.length > 1) {
            setNumber(number.slice(0, -1))
            setAnswear(answear.slice(0, -1))
        }
    };

    function zeroing () {
        setAnswear('')
        setNumber('0')
    };
    return (
        <>
            <div className="corpus">
                <div className="monitor">
                    <span>{number}</span>
                    <span className="answear">{answear}</span>
                </div>
                <div className="buttons">
                    <button className="command" onClick={cancellation}>C</button>
                    <button className="command" onClick={zeroing}>EC</button>
                    <button onClick={action} className="delet"><i className="fas fa-divide delet" onClick={action}></i></button>
                    <button onClick={action} className="multi"><i className="fas fa-times multi" onClick={action}></i></button>
                    <button disabled={answearDesicion(answear) ? true : false} onClick={handleClick}>7</button>
                    <button disabled={answearDesicion(answear) ? true : false} onClick={handleClick}>8</button>
                    <button disabled={answearDesicion(answear) ? true : false} onClick={handleClick}>9</button>
                    <button onClick={action} className="minus"><i className="fas fa-minus" onClick={action}></i></button>
                    <button disabled={answearDesicion(answear) ? true : false} onClick={handleClick}>4</button>
                    <button disabled={answearDesicion(answear) ? true : false} onClick={handleClick}>5</button>
                    <button disabled={answearDesicion(answear) ? true : false} onClick={handleClick}>6</button>
                    <button onClick={action} className="plus"><i className="fas fa-plus plus" onClick={action}></i></button>
                    <button disabled={answearDesicion(answear) ? true : false} onClick={handleClick}>1</button>
                    <button disabled={answearDesicion(answear) ? true : false} onClick={handleClick}>2</button>
                    <button disabled={answearDesicion(answear) ? true : false} onClick={handleClick}>3</button>
                    <button className="equall equals" onClick={action}><i className="fas fa-equals equals" onClick={action}></i></button>
                    <button className="zero" onClick={handleClick}>0</button>
                    <button className="point" onClick={handleClick}>.</button>
                </div>
            </div>
        </>
    )
};
export default Calculator;