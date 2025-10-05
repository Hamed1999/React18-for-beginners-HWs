import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeProps {
  onClick: () => void;
  initStatus?: boolean;
}

const Like = ({ onClick, initStatus = false }: LikeProps) => {
  const [status, setStatus] = useState(initStatus);
  const toggle = () => {
    setStatus(!status);
    onClick();
  };
  if (status) return <AiFillHeart color="#ff6b81" onClick={toggle} size={30} />;
  return <AiOutlineHeart color="#c7001eff" size={30} onClick={toggle} />;
};

export default Like;
