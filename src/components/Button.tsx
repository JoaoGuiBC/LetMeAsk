import { ButtonHTMLAttributes } from "react";

import '../styles/components/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button className="button" {...props} />
  );
}
