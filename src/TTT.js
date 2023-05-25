import React, { useState, useEffect } from "react";
const TOTAL_NUM = 9;


function TTT() {
const [nextStep, setNextStep] = useState("O");
const [pieces, SetPieces] = useState([]);

useEffect(()=>{
    let initPieces = new Array(TOTAL_NUM);

    for(let i=0; i< TOTAL_NUM; i++){
        initPieces[i] = {id: i, content: " ", isClick: false};
    }
},[]);

function handleClick(piece){
    setNextStep(prevStep => prevStep==="O"?"X":"O");
    pieces.map((curPiece)=>{
        if(curPiece.id===piece.id){
            curPiece.content = nextStep;
        }
        return curPiece;
    })
}

return(
    <div>
        {
            pieces.map((curPiece)=>{
                return <button onClick={() =>handleClick(curPiece)}>{curPiece.content}</button>
            })
        }
    
    </div>
)


}
export default TTT;