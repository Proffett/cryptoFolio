import React from "react";
import LoupSvg from "./svg/LoupSvg";
import BellSvg from "./svg/BellSvg";
import {Link} from "react-router-dom";
import LeftArrowSvg from "./svg/LeftArrowSvg";

const Header = ({mainScreen}) => {
    return(
        <>
            {mainScreen ?
                <div className="app-header" >
                    <LoupSvg/>
                    <BellSvg/>
                </div>
                :
                <div className="app-header" >
                    <Link to="/"><LeftArrowSvg/></Link>
                </div>
            }
        </>
    )
}

export default Header