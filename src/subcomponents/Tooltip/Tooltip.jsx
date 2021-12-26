import React, { useState } from "react";

const Tooltip = ({title , children  }) => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };
  return children(
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      role="button"
      tabIndex="-3"
    >
      {hover ? {title} : null }
    </div>
  );
};

export default Tooltip;