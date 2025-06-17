import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
export const useAnimatedNumber = (
  target: number,
  animationDuration: number
) => {
  const [value, setValue] = useState(target);
  const valueRef = useRef({ val: target });
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    tweenRef.current = gsap.to(valueRef.current, {
      val: target,
      duration: animationDuration,
      ease: "power2.out",
      onUpdate: () => {
        setValue(Math.round(valueRef.current.val));
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [target]);

  return value;
};
