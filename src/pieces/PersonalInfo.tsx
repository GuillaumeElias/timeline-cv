import React from "react";

const PersonalInfo: React.FC = () => (
  <div className="PersonalInfo">
    <p><u>Technical skills : </u></p>
    <p>
    <img src="images/cpplogo.svg" height={25} /> Qt wxwidgets JUCE <br/>
    <img src="images/react_ts.png" height={25} /> React/TS with material-ui<br/>
    <img src="images/javalogo.png" height={25} /> Spring<br/>
    <img src="images/python.png" height={25} /> Tkinter, Numpy<br/>
    <img src="images/asm.png" height={25} /> Assembly language and embedded programming (x86/AVR)<br/>
    <img src="images/linux.png" height={25} /> System admin experience in Ubuntu and CentOS<br/>
    </p>
  </div>
);

export default PersonalInfo;
