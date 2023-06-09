import React, { useState, useEffect } from "react";
import { v4 } from 'uuid';
const N = 3;


function TTT() {
    const [curStep, setCurStep] = useState("-");
    const [pieces, SetPieces] = useState([]);
    const [isEnd, SetIsEnd] = useState(false);

    useEffect(() => {
        let initPieces = new Array(N * N);

        for (let i = 0; i < N * N; i++) {
            initPieces[i] = { id: i, content: "\u00A0", isClick: false };
        }
        SetPieces(initPieces);

    }, []);

    function isWin(piece, newStep) {
        let n = N;
        let cur_x = Math.floor(piece.id / n);
        let cur_y = Math.floor(piece.id % n);

        console.log("newStep=" + newStep + " curX=" + cur_x + " curY=" + cur_y);

        let xCount = 0, yCount = 0, DiagonalCount = 0, antiDiagonalCount = 0;

        for (let i = 0; i < N * N; i++) {
            let x = Math.floor(i / n);
            let y = Math.floor(i % n);

            if (x === cur_x && pieces[i].content === newStep) {
                xCount++;
            }
            if (y === cur_y && pieces[i].content === newStep) {
                yCount++;
            }

            if (x === y && pieces[i].content === newStep) {
                DiagonalCount++;
            }

            if (x + y === n - 1 && pieces[i].content === newStep) {
                antiDiagonalCount++;
            }
        }
        console.log(`xCount=${xCount}; yCount=${yCount}; DiagonalCount=${DiagonalCount}; antiDiagonalCount=${antiDiagonalCount}`);

        if (xCount === n || yCount === n || DiagonalCount === n || antiDiagonalCount === n) {
            return true;
        }

        // no winner
        return false;
    }


    function handleClick(piece) {
        if (isEnd || piece.isClick === true) {
            return;
        }

        const newStep = curStep === "O" ? "X" : "O";
        setCurStep(newStep);

        pieces.map((curPiece) => {
            if (!curPiece.isClick && curPiece.id === piece.id) {
                curPiece.content = newStep;
                curPiece.isClick = true;
            }
            return curPiece;
        })

        const winStat = isWin(piece, newStep);
        if (winStat) SetIsEnd(true);
    }

    let indices = new Array(N);
    for (let i = 0; i < N; i++) {
        indices[i] = i;
    }

    return (
        <>
            <div className="board">
                {indices.map(i => (
                    <div className="row-container" key={v4()}>
                        {pieces.slice(i * N, (i + 1) * N).map((curPiece) => (
                            <button className="piece" key={curPiece.id} onClick={() => handleClick(curPiece)}>{curPiece.content}</button>
                        ))}
                    </div>))
                }
            </div>
            {isEnd && (<p>{curStep} <span>wins!</span></p>)}
        </>
    )
}
export default TTT;