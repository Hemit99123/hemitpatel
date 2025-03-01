import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Section } from "./shared/Section";
import Image from "next/image";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

export const Coping = () => {
  const scroll = useScroll();
  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityLastSection, setOpacityLastSection] = useState(1);

  useFrame(() => {
    setOpacityFirstSection(1 - scroll.range(0, 1 / 3));
    setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3));
    setOpacityLastSection(scroll.range(2 / 3, 1 / 3));
  });

  return (
    <Scroll html>
      <div className="w-screen">
        <Section opacity={opacityFirstSection}>
          <h1 className="text-xl font-bold">Meditation</h1>
          <p>Meditation is the best way to relax your mind. I personally practice it when I wake up. It involves detaching yourself from reflexive logical thinking. As a Green personality, that is tough as I love logical reasoning but I do my best for the betterment of my mental health!</p>
          <div className="flex space-x-10 mt-4">
            <Image 
              src="/images/calmapp.png"
              width={250}
              height={30}
              alt="interest quiz"
            />
            <div>
              My favourite content creators on Calm are:
              <ul className="list-disc font-bold mt-3">
                  <li>Jay Shetty (Chief Purpose Officer)</li>
                  <li>Matthew McConaughey</li>
                  <li>Dr. Eric Lopez, Ph.D</li>
              </ul>
            </div>
          </div>

          <p className="mt-2">↓</p>
        </Section>

        <Section>
        <div className="w-full text-center z-10 mb-6">
  {/* Thought Bubbles */}
  <div className="space-y-4">
  <h1 className="text-xl font-bold">Watching Netflix/TV</h1>

    <div className="relative inline-block bg-white p-6 rounded-lg shadow-xl max-w-xs mx-auto transform rotate-3 mr-10">
      <p className="italic text-xl opacity-80">Escaping the chaos... sinking into comfort...</p>
      {/* Tail of the thought bubble */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
    </div>

    <div className="relative inline-block bg-white p-6 rounded-lg shadow-xl max-w-xs mx-auto transform rotate-6">
      <p className="italic text-xl opacity-80">In a world where time stands still...</p>
      {/* Tail of the thought bubble */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
    </div>
  </div>
</div>

{/* Image of current watchlist */}
<div className="flex mt-12 z-10 space-x-5">
  <Image
    className="rounded-lg shadow-xl transform transition-all duration-500 hover:scale-110"
    src="/images/netflix.png"
    width={320}
    height={210}
    alt="Current Watchlist"
  />
  <div className="bg-pink-100 rounded-lg shadow-md p-10">Watching TV shows provides me an escape by delving into the story of the show. This way I can disassociate myself from the stresses of my actual world, providing me some relief</div>
</div>

<p className="text-center mt-5 text-gray-700 relative z-20">
  The above image shows my current watchlist on Netflix. I mostly watch Superstore due to quick episodes and a light/humorous plot. However, during the weekends I delve into Dexter for some long-form content, mystery, and action.
</p>

{/* Link to explore more shows */}
<div className="mt-8 text-center relative z-20">
  <Link
    href="https://www.netflix.com"
    className="bg-red-600 text-white px-8 py-3 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-red-700 hover:ring-4 hover:ring-red-500"
  >
    Explore More Shows
  </Link>
</div>

<p className="mt-8 text-center text-gray-500">↓</p>

        </Section>
       

        <Section opacity={opacityLastSection}>
          <h1 className="text-xl font-bold">Hanging out w/ friends</h1>
          <div className="flex space-x-10">
            <Image
              className="rounded-lg"
              src="/images/cineplex.jpg"
              width={300}
              height={200}
              alt="Placeholder image"
            />
            <p>
              I took this picture when me and my friends went to watch a movie and get food.
              Pictured is us eating at Pizza Pizza near SliverCity Cineplex. My friends are
              important to me and provide emotional support whenever I am feeling down. In this
              instance, we went out because we all got rejected from a Stanford summer program.
              Being in each other's companies helped us navigate these negative emotions because
              we knew we weren't suffering alone, and it was okay to be sad about it ❤️‍🩹
            </p>
          </div>

          <div className="mt-8 p-6 bg-pink-100 rounded-lg shadow-lg flex items-center space-x-4">
            <Lightbulb size={50} />    
            <div>
                <h2 className="text-lg font-semibold">Emotional Support</h2>
                <p className="text-gray-700">
                Spending time with friends is a powerful coping mechanism. It reminds us that we’re not alone,
                helps us to share our burdens, and turns tough times into times of bonding and togetherness
                </p>
              </div>
            </div>
          </Section>
      </div>
    </Scroll>
  );
};
