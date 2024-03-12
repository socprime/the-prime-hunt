export type ScreenType = 'esm' | 'ssm' | 'sm' | 'md' | 'lg' | 'hg';

export const calculateScreen = (
  newWidth: number,
): ScreenType => {
  if (newWidth < 336) {
    return 'esm';
  }
  if (newWidth < 390) {
    return 'ssm';
  }
  if (newWidth >= 390 && newWidth < 480) {
    return 'sm';
  }
  if (newWidth >= 480 && newWidth < 890) {
    return 'md';
  }
  if (newWidth >= 890 && newWidth < 1200) {
    return 'lg';
  }
  return 'hg';
};
