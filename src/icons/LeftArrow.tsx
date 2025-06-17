import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={14}
    fill="none"
    viewBox="0 0 10 14"
    {...props}
  >
    <path stroke="#42567A" strokeWidth={2} d="M8.5.75 2.25 7l6.25 6.25" />
  </svg>
);
export { SvgComponent as LeftArrow };
