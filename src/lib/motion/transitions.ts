import { duration } from "./durations";
import { easing } from "./easings";
import { spring } from "./springs";

export const transition = {
  enter: { duration: duration.base, ease: easing.out },
  enterSlow: { duration: duration.slower, ease: easing.out },
  hover: { duration: duration.fast, ease: easing.out },
  press: spring.layout,
  toggle: { duration: duration.base, ease: easing.inOut },
} as const;
