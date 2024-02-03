import React, { useState } from "react";

export default function ShowData({ children }) {
  const [showChildren, setShowChildren] = useState(false);

  function handleClick() {
    setShowChildren(!showChildren);
  }

  if (!showChildren) {
    return <button onClick={handleClick}>+</button>;
  } else {
    return (
      <>
        <button onClick={handleClick}>-</button>
        <div>{children}</div>
      </>
    );
  }
}
