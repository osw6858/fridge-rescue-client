// 임시 사이즈
const size = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1450px',
  desktop: '1980px',
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(min-width:${size.mobile})`,
  laptop: `(min-width:${size.tablet})`,
  desktop: `(min-width:${size.laptop})`,
};

/* 사용예시
@media ${device.mobile} {
  background-color: lightblue;
}

@media ${device.tablet} {
  background-color: lightcoral;
}

@media ${device.desktop} {
  background-color: lightgreen;
}
*/
