import { ClickableArrowIconProps, SVGIconPropType } from '@type/Main';

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

export const TikTokIcon = ({ className }: SVGIconPropType) => {
  return (
    <svg
      height="512pt"
      className={className}
      viewBox="-32 0 512 512"
      width="512pt"
      xmlns="http://www.w3.org/2000/svg">
      <path d="m432.734375 112.464844c-53.742187 0-97.464844-43.722656-97.464844-97.464844 0-8.285156-6.714843-15-15-15h-80.335937c-8.28125 0-15 6.714844-15 15v329.367188c0 31.59375-25.707032 57.296874-57.300782 57.296874s-57.296874-25.703124-57.296874-57.296874c0-31.597657 25.703124-57.300782 57.296874-57.300782 8.285157 0 15-6.714844 15-15v-80.335937c0-8.28125-6.714843-15-15-15-92.433593 0-167.632812 75.203125-167.632812 167.636719 0 92.433593 75.199219 167.632812 167.632812 167.632812 92.433594 0 167.636719-75.199219 167.636719-167.632812v-145.792969c29.851563 15.917969 63.074219 24.226562 97.464844 24.226562 8.285156 0 15-6.714843 15-15v-80.335937c0-8.28125-6.714844-15-15-15zm0 0" />
    </svg>
  );
};

export const FacebookIcon = ({ className }: SVGIconPropType) => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      x="0px"
      className={className}
      y="0px"
      viewBox="0 0 155.139 155.139">
      <g>
        <path
          id="f_1_"
          d="M89.584,155.139V84.378h23.742l3.562-27.585H89.584V39.184
          c0-7.984,2.208-13.425,13.67-13.425l14.595-0.006V1.08C115.325,0.752,106.661,0,96.577,0C75.52,0,61.104,12.853,61.104,36.452
          v20.341H37.29v27.585h23.814v70.761H89.584z"
        />
      </g>
    </svg>
  );
};

export const ClickableArrowIcon = ({ className, onClick }: ClickableArrowIconProps) => {
  return (
    <svg
      width="12"
      height="20"
      className={className}
      viewBox="0 0 12 20"
      fill="none"
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M0 18.03L1.77 19.8L11.67 9.9L1.77 0L0 1.77L8.13 9.9L0 18.03H0Z" fill="#FFC700" />
    </svg>
  );
};
