/* eslint-disable react/prop-types */
export default function StarFill({ width, height, ...props }) {
  return (
    <svg
      className=""
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1271_3204)">
        <path
          d="M4.51478 19.3039C4.03228 19.5514 3.48478 19.1176 3.58228 18.5639L4.61978 12.6514L0.216032 8.45639C-0.195218 8.06389 0.0185316 7.34639 0.569782 7.26889L6.69228 6.39889L9.42228 0.990137C9.66853 0.502637 10.3348 0.502637 10.581 0.990137L13.311 6.39889L19.4335 7.26889C19.9848 7.34639 20.1985 8.06389 19.786 8.45639L15.3835 12.6514L16.421 18.5639C16.5185 19.1176 15.971 19.5514 15.4885 19.3039L9.99978 16.4839L4.51478 19.3039Z"
          fill="#FD8E1F"
        />
      </g>
      <defs>
        <clipPath id="clip0_1271_3204">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
