import gsap from "gsap";
export const fadeOutSlides = (elements: HTMLDivElement | null) =>
  gsap.to(elements, {
    opacity: 0,
    y: 40,
    duration: 0.4,
    ease: "power1.out",
  });

export const fadeInSlides = (
  elements: HTMLDivElement | null,
  onComplete?: () => void
) =>
  gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete,
    }
  );
