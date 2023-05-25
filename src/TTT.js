import React, { useState, useEffect } from "react";
const TOTAL_NUM = 9;


function TTT() {
    const [nextStep, setNextStep] = useState("O");
    const [pieces, SetPieces] = useState([]);
    const [isEnd, SetIsEnd] = useState(false);

    useEffect(() => {
        let initPieces = new Array(TOTAL_NUM);

        for (let i = 0; i < TOTAL_NUM; i++) {
            initPieces[i] = { id: i, content: " ", isClick: false };
        }
        SetPieces(initPieces);

    }, []);

    function isWin(piece) {
        let n = Math.sqrt(TOTAL_NUM);
        let x = Math.floor(piece.id / n);
        let y = Math.floor(piece.id % n);
        console.log(`x=${x} y=${y}`);
    }

    function handleClick(piece) {
        if (piece.isClick === true) {
            console.log(`id: ${piece.id} is clicked`);
            return;
        }
        setNextStep(prevStep => prevStep === "O" ? "X" : "O");

        isWin(piece);

        pieces.map((curPiece) => {
            if (!curPiece.isClick && curPiece.id === piece.id) {
                curPiece.content = nextStep;
                curPiece.isClick = true;
            }
            return curPiece;
        })
    }

    return (
        <>
            <div className="board">
                {
                    pieces.map((curPiece) => {
                        return <button className="piece" key={curPiece.id} onClick={() => handleClick(curPiece)}>{curPiece.content}</button>
                    })
                }
            </div>
            {!isEnd && <p>{nextStep === "O" ? "X" : "O"} <span>wins!</span></p>}
        </>
    )
}
export default TTT;