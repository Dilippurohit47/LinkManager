import React from "react";

const Header = () => {
  return (
    <div className="w-full fixed px-10 py-8 flex justify-between items-center">
      <div>Logo</div>
      <div className="flex gap-8 ">
        <p>Home</p>
        <p>Link</p>
        <p>Pricing</p>
        <p>Account</p>
      </div>
    </div>
  );
};

export default Header;
