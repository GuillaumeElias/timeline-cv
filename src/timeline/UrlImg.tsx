import React, { useEffect, useState } from "react";
import { Image, Rect } from "react-konva";

interface UrlImgProps {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const UrlImg: React.FC<UrlImgProps> = ({ src, x, y, width, height }) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const loadImage = () => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => setImage(img);
    };

    loadImage();

    return () => {
      if (image) {
        image.removeEventListener("load", loadImage);
      }
    };
  }, [src]);

  if(!image) return <Rect x={x} y={y} width={width} height={height} />

  return <Image x={x} y={y} width={width} height={height} image={image} />;
};

export default UrlImg;
