"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { flushSync } from "react-dom";
import Image from "next/image";
import Link from "next/link";

const TWEEN_FACTOR = 1.2;

interface WheelCarouselProps {
  slides: {
    alt: string;
    src: string;
    title: string;
    href: string;
  }[];
}

const WheelCarousel: React.FC<WheelCarouselProps> = ({ slides }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: true,
  });
  const [tweenValues, setTweenValues] = useState<number[]>([]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return diffToTarget * (-1 / TWEEN_FACTOR) * 100;
    });
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on("scroll", () => {
      flushSync(() => onScroll());
    });
    emblaApi.on("reInit", onScroll);
  }, [emblaApi, onScroll]);

  return (
    <div className="embla_wheel">
      <div className="embla__viewport_wheel" ref={emblaRef}>
        <div className="embla__container_wheel">
          {slides.map((slide, index) => (
            <Link href={slide.href} key={index} className="embla__slide_wheel">
              <div
                className="embla__slide__inner"
                style={{
                  ...(tweenValues.length && {
                    transform: `scale(${
                      1 - Math.abs(tweenValues[index]) / 200
                    })`,
                    opacity: `${1 - Math.abs(tweenValues[index]) / 300}`,
                  }),
                }}
              >
                <Image
                  className="embla__slide__img_wheel"
                  src={slide.src}
                  alt={slide.alt}
                  fill
                />
                <div className="embla__slide__title">{slide.title}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WheelCarousel;
