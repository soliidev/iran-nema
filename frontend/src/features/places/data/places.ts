import type { Place } from "../types/place";

export const places: Place[] = [
  {
    id: 1,
    title: "تخت جمشید",
    city: "شیراز",
    province: "فارس",
    description:
      "مجموعه تاریخی تخت جمشید یکی از باشکوه‌ترین آثار باستانی ایران و جهان است که در دوره هخامنشیان ساخته شده است. این اثر ارزشمند در فهرست میراث جهانی یونسکو قرار دارد و سالانه گردشگران بسیاری از آن بازدید می‌کنند.",
    image: "/images/places/perspolis.jpg",
    gallery: [
      "/images/places/perspolis.jpg",
      "/images/places/perspolis.jpg",
      "/images/places/perspolis.jpg",
    ],
    latitude: 29.935,
    longitude: 52.891,
    rating: 4.9,
    category: "آثار تاریخی",
    hasVirtualTour: true,
  },
  {
    id: 2,
    title: "میدان نقش جهان",
    city: "اصفهان",
    province: "اصفهان",
    description:
      "میدان نقش جهان اصفهان یکی از بزرگ‌ترین میدان‌های جهان و از آثار مهم دوره صفوی است. این میدان با مسجد امام، مسجد شیخ لطف‌الله و کاخ عالی‌قاپو احاطه شده است.",
    image: "/images/places/naghsh-jahan.jpg",
    gallery: [
      "/images/places/naghsh-jahan.jpg",
      "/images/places/naghsh-jahan.jpg",
    ],
    latitude: 32.657,
    longitude: 51.677,
    rating: 4.8,
    category: "آثار تاریخی",
    hasVirtualTour: true,
  },
  {
    id: 3,
    title: "پل خواجو",
    city: "اصفهان",
    province: "اصفهان",
    description:
      "پل خواجو یکی از زیباترین پل‌های تاریخی ایران در شهر اصفهان است که در دوره صفوی ساخته شده است. این پل علاوه بر کاربرد عبوری، به عنوان سد و محل برگزاری مراسم نیز استفاده می‌شده است.",
    image: "/images/places/khaju-bridge.jpg",
    gallery: [
      "/images/places/khaju-bridge.jpg",
      "/images/places/khaju-bridge.jpg",
    ],
    latitude: 32.637,
    longitude: 51.682,
    rating: 4.7,
    category: "آثار تاریخی",
    hasVirtualTour: false,
  },
  {
    id: 4,
    title: "حافظیه",
    city: "شیراز",
    province: "فارس",
    description:
      "آرامگاه حافظ شیرازی، شاعر بزرگ ایرانی، یکی از محبوب‌ترین جاذبه‌های گردشگری شیراز است. این مکان با معماری زیبا و فضای معنوی خود سالانه میلیون‌ها بازدیدکننده را جذب می‌کند.",
    image: "/images/places/hafezieh.jpg",
    gallery: [
      "/images/places/hafezieh.jpg",
      "/images/places/hafezieh.jpg",
    ],
    latitude: 29.625,
    longitude: 52.558,
    rating: 4.8,
    category: "آثار تاریخی",
    hasVirtualTour: true,
  },
  {
    id: 5,
    title: "ارگ بم",
    city: "بم",
    province: "کرمان",
    description:
      "ارگ بم بزرگترین بنای خشتی جهان است که در استان کرمان واقع شده است. این اثر تاریخی با قدمت بیش از ۲۰۰۰ سال، یکی از مهم‌ترین جاذبه‌های گردشگری ایران به شمار می‌رود.",
    image: "/images/places/arg-e-bam.jpg",
    gallery: [
      "/images/places/arg-e-bam.jpg",
      "/images/places/arg-e-bam.jpg",
    ],
    latitude: 29.116,
    longitude: 58.368,
    rating: 4.6,
    category: "آثار تاریخی",
    hasVirtualTour: true,
  },
];
