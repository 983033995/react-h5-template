import React, { useEffect, useRef } from 'react';
import lottie, { type AnimationItem } from 'lottie-web';

// 定义控制方法的接口
interface LottieControls {
  play: () => void;
  pause: () => void;
  stop: () => void;
}

// 合并 HTMLDivElement 和控制方法的类型
type LottieRef = HTMLDivElement & LottieControls;

interface LottieAnimationProps {
  animationData: any; // Lottie JSON 数据，可以更精确地定义类型
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
  speed?: number;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

const LottieAnimation = React.forwardRef<LottieRef, LottieAnimationProps>(
  (
    {
      animationData,
      loop = true,
      autoplay = true,
      className = '',
      width = '100%',
      height = '100%',
      speed = 1,
      onComplete,
      onError,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<AnimationItem | null>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      try {
        animationRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop,
          autoplay,
          animationData, // 使用传入的 JSON 数据
        });

        animationRef.current.setSpeed(speed);

        if (onComplete) {
          animationRef.current.addEventListener('complete', onComplete);
        }
      } catch (error) {
        if (onError && error instanceof Error) {
          onError(error);
        }
        console.error('Failed to load Lottie animation:', error);
      }

      return () => {
        if (animationRef.current) {
          animationRef.current.destroy();
          animationRef.current = null;
        }
      };
    }, [animationData, loop, autoplay, speed, onComplete, onError]);

    // 定义控制方法
    const play = () => animationRef.current?.play();
    const pause = () => animationRef.current?.pause();
    const stop = () => animationRef.current?.stop();

    // 使用 useImperativeHandle 暴露控制方法
    React.useImperativeHandle(ref, () => {
      const element = containerRef.current;
      if (!element) {
        return {
          play: () => undefined,
          pause: () => undefined,
          stop: () => undefined,
        } as LottieRef;
      }
      return Object.assign(element, {
        play,
        pause,
        stop,
      });
    }, []);

    return (
      <div
        ref={containerRef}
        className={`lottie-container ${className}`}
        style={{ width, height }}
      />
    );
  },
);

export default LottieAnimation;
