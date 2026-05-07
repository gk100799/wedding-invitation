import SmoothScroll from '@/components/SmoothScroll';
import ColdOpen from '@/components/scenes/ColdOpen';
import MatchScene from '@/components/scenes/MatchScene';
import StoryGallery from '@/components/scenes/StoryGallery';
import Travel from '@/components/scenes/Travel';
import Day1 from '@/components/scenes/Day1';
import Day2 from '@/components/scenes/Day2';
import RSVP from '@/components/scenes/RSVP';
import ProgressDots from '@/components/ProgressDots';

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <ProgressDots />
        <ColdOpen />
        <MatchScene />
        <StoryGallery />
        <Travel />
        <Day1 />
        <Day2 />
        <RSVP />
      </main>
    </SmoothScroll>
  );
}
