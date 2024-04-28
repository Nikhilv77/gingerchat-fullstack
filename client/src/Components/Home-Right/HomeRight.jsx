import React from "react";
import "./HomeRight.css";

const HomeRight = () => {
  const opendeleteAccountModalHandler = ()=>{
    document.getElementsByClassName('delete-account-modal')[0].style.display = 'grid'
    document.getElementsByClassName('delete-account-backdrop')[0].style.display = 'inline'
  }
  const openLogoutModelHandler = ()=>{
    document.getElementsByClassName('logout-modal')[0].style.display = 'grid'
    document.getElementsByClassName('logout-backdrop')[0].style.display = 'inline'
  }
  return <div className="home-right">
    
  <div className="home-right-contents">
  <div className="home-right-items">
  <i onClick={openLogoutModelHandler} title="logout" class="ri-logout-box-r-fill"></i>
<i title="delete account" onClick = {opendeleteAccountModalHandler}class="ri-delete-bin-fill"></i>
</div>
  </div>
  </div>;
};

export default HomeRight;
