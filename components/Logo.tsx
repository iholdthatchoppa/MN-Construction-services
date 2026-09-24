import Image from 'next/image';
import styles from './Logo.module.css';

type Props = {
  variant?: 'dark' | 'light';
  size?: number; // height in px
};

// Transparent crops of the house mark from the official logo (public/logo/).
// 'light' is the same artwork in off-white ink for dark backgrounds.
const SRC = {
  dark: '/logo/mn-logo-mark.png',
  light: '/logo/mn-logo-mark-light.png',
};
const ASPECT = 315 / 288; // width / height of the mark images

export default function Logo({ variant = 'dark', size = 46 }: Props) {
  return (
    <Image
      className={styles.mark}
      src={SRC[variant]}
      alt=""
      aria-hidden="true"
      width={Math.round(size * ASPECT)}
      height={size}
      priority={variant === 'dark'}
    />
  );
}
