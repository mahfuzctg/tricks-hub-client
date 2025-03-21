"use client";

import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  images: string[];
}

export default function ImageGallery({ images }: IProps) {
  return (
    <LightGallery
      elementClassNames={`mt-2 gap-2 grid gap-4 place-items-center ${images?.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
      plugins={[lgThumbnail, lgZoom]}
      speed={500}
    >
      {images?.map((image, index) => (
        <Link
          key={index}
          className={`w-full ${images?.length === 3 && index === 2 ? "col-span-2" : "col-span-1"}`}
          href={image}
        >
          <Image
            alt={`image-${index}`}
            className="h-48 lg:h-56 xl:h-72 w-full object-cover rounded-lg"
            height={500}
            src={image}
            width={500}
          />
        </Link>
      ))}
    </LightGallery>
  );
}
