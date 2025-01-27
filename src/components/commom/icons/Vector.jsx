/* eslint-disable react/prop-types */
export default function Vector({ width, height, fill, ...props }) {
  return (
    <svg
      className=""
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 8C0 3.58125 3.58125 0 8 0C12.4187 0 16 3.58125 16 8C16 12.4187 12.4187 16 8 16C3.58125 16 0 12.4187 0 8ZM11.6187 6.61875C11.9594 6.27813 11.9594 5.72187 11.6187 5.38125C11.2781 5.04062 10.7219 5.04062 10.3813 5.38125L7 8.7625L5.61875 7.38125C5.27813 7.04062 4.72187 7.04062 4.38125 7.38125C4.04062 7.72187 4.04062 8.27812 4.38125 8.61875L6.38125 10.6187C6.72187 10.9594 7.27813 10.9594 7.61875 10.6187L11.6187 6.61875Z"
        fill={fill}
      />
    </svg>
  );
}
