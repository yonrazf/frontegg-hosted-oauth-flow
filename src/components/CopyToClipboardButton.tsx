import React, { useState } from "react";
interface CopyToClipboardButtonProps {
  text: string;
}

const CopyToClipboardButton = ({ text }: CopyToClipboardButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <button
      onClick={handleCopy}
      className="copy-button"
      aria-label={isCopied ? "Copied!" : "Copy to clipboard"}
    >
      {isCopied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="16"
          height="16"
          viewBox="0 0 50 50"
        >
          <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z"></path>
        </svg>
      ) : (
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="#C3C5CA"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_144_522)">
            <path d="M10.6654 1.1665H2.66536C1.93203 1.1665 1.33203 1.7665 1.33203 2.49984V11.8332H2.66536V2.49984H10.6654V1.1665ZM12.6654 3.83317H5.33203C4.5987 3.83317 3.9987 4.43317 3.9987 5.1665V14.4998C3.9987 15.2332 4.5987 15.8332 5.33203 15.8332H12.6654C13.3987 15.8332 13.9987 15.2332 13.9987 14.4998V5.1665C13.9987 4.43317 13.3987 3.83317 12.6654 3.83317ZM12.6654 14.4998H5.33203V5.1665H12.6654V14.4998Z" />
          </g>
          <defs>
            <clipPath id="clip0_144_522">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      )}
    </button>
  );
};

export default CopyToClipboardButton;
