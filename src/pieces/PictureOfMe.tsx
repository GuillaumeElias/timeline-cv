import React from "react";
import { MAX_MOBILE_SCREEN_WIDTH } from "../App";

interface Props {
  screenWidth: number
}

const PictureOfMe: React.FC<Props> = ({screenWidth}) => (
  <div className="PictureOfMe" onMouseEnter={()=> console.log("enter")}>
    {
      screenWidth > MAX_MOBILE_SCREEN_WIDTH ?
      <img src="images/PictureOfMe.png" height={300}/> :
      <img src="images/PictureOfMe_large.png" height={300}/> 
    }
  </div>
);

export default PictureOfMe;
