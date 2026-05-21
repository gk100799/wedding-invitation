'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import ColdOpen from '@/components/scenes/ColdOpen';
import MatchScene from '@/components/scenes/MatchScene';
import StoryGallery from '@/components/scenes/StoryGallery';
import Travel from '@/components/scenes/Travel';
import Day1 from '@/components/scenes/Day1';
import Day2 from '@/components/scenes/Day2';
import RSVP from '@/components/scenes/RSVP';
import PeacockWatermark from '@/components/PeacockWatermark';

const allScenes = [
  { key: 'open', Component: ColdOpen },
  { key: 'match', Component: MatchScene },
  { key: 'story', Component: StoryGallery },
  { key: 'travel', Component: Travel },
  { key: 'day1', Component: Day1 },
  { key: 'day2', Component: Day2 },
  { key: 'rsvp', Component: RSVP },
];

export default function Home() {
  const [scenes, setScenes] = useState(allScenes);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('madhu1')) {
      setScenes(allScenes.filter(s => s.key !== 'day1' && s.key !== 'day2'));
    }
  }, []);

  return (
    <main className="h-[100svh] w-full overflow-hidden">
      <PeacockWatermark />
      <Swiper
        direction="vertical"
        slidesPerView={1}
        speed={650}
        mousewheel={{ thresholdDelta: 30, forceToAxis: true, sensitivity: 1 }}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        modules={[Mousewheel, Keyboard, Pagination]}
        className="wedding-swiper h-full w-full"
        threshold={8}
        resistanceRatio={0.4}
      >
        {scenes.map(({ key, Component }) => (
          <SwiperSlide key={key} className="!h-full">
            <Component />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
