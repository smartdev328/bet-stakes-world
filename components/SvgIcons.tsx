type SVGIconPropType = {
  className: string;
};

export const StarSvg = ({ className }: SVGIconPropType) => {
  return (
    <svg
      width="99"
      height="95"
      className={className}
      viewBox="0 0 99 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M49.5014 75.8733L80.0365 94.2351L71.9334 59.6283L98.911 36.3438L63.3855 33.3409L49.5014 0.703247L35.6173 33.3409L0.0917969 36.3438L27.0694 59.6283L18.9663 94.2351L49.5014 75.8733Z"
        fill="#959799"
      />
    </svg>
  );
};

export const CarouselArrowIcon = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.71647 0.229493L5.59086 1.35509L10.0454 5.81758L0.330077 5.81758L0.330077 7.41418L10.0454 7.41418L5.59086 11.8767L6.71646 13.0023L13.1029 6.61588L6.71647 0.229493Z"
        fill="#1A1A1A"
      />
    </svg>
  );
};
