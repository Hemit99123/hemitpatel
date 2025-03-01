// @ts-nocheck


import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Section } from "./shared/Section";
import Image from "next/image";

export const Personality = () => {
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
  <Image 
          className="rounded-lg"
          src="/images/tactician.png"
          width={250}
          height={30}
          alt="interest quiz"
  />
  <ul className="leading-9">
    <Image 
      className="rounded-lg"
      src="/images/cadet.png"
      width={300}
      height={50}
      alt="hemit at cadet"
    />
    <div>
      I am a proud Cadet Flight CPL. Pictured above is my first ceremony in 2023!
    </div>
    <div className="list-disc ml-5">
      <p className="font-bold">How is this 🏛️ Conventional?:</p>
      <li>I follow the structured system and traditions (conventional ways).</li>
      <li>Respecting hierarchy and authority (contentional values)</li>

      <p className="font-bold">How is this 🚀 Enterprising?</p>
      <li>I take initiative in challenges.</li>
      <li>I engage in fitness testings and range team (shooting) to develop my skills.</li>
      <li>I make calculated moves (planning)</li>
    </div>
  </ul>

  <p className="animate-bounce mt-2">↓</p>
</Section>


        <Section right opacity={opacitySecondSection}>
          <Image 
          className="rounded-lg"
          src="/images/istj.png"
          width={250}
          height={30}
          alt="personality quiz"
          />

          <p className="text-gray-500 text-sm mt-0.5 my-3 underline">P.S. My personality color is 💚</p>

          <div className="flex space-x-10">
          <Image 
          className="rounded-lg"
          src="/images/mecoding.png"
          width={150}
          height={20}
          alt="my coding work"
          />
          <div>
          <h1>Pictured beside is me solving a programming problem.</h1>
    <p className="mt-5">
  As an <strong>ISTJ</strong> with a <span className="text-green-800">Green</span> personality, I excel in environments where <strong>rationality</strong> and <strong>logic</strong> are prioritized. <span className="underline">Coding is the perfect environment for this.</span>
</p>

<ul className="mt-10 list-disc">
  <li><strong className="text-green-500">Logical Thinker:</strong> You need to design logic to write code.</li>
  <li><strong className="text-green-500">Detail-Oriented:</strong> Precision and accuracy are crucial when coding.</li>
  <li><strong className="text-green-500">Efficient Problem-Solving:</strong> Finding the best, most efficient solutions is important and require problem solving.</li>
</ul>



          </div>


          </div>

          <div className="flex space-x-10 mt-3">
          <Image 
            className="rounded-lg"
            src="/images/gym.png"
            width={300}
            height={20}
            alt="my coding work"
          />
          <div>
          <h1>I love going to the gym.</h1>
    <p className="mt-5">
  As an <strong>ISTJ</strong> with a <span className="text-green-800">Green</span> personality, we like routine, consistency, and personal growth. <span className="underline">Working out is the perfect for this as you better your personal fitness.</span>
</p>




          </div>


          </div>



          <p className="animate-bounce  mt-6">↓</p>
        </Section>
        <Section opacity={opacityLastSection}>
          <Image 
            className="rounded-lg"
            src="/images/learningstyle.png"
            width={300}
            height={20}
            alt="my coding work"
          />
          <ul className="list-disc">
            <li>
              <b>Auditory 🎧</b>:
              <Image 
              className="rounded-lg"
              src="/images/beyondcoding.jpg"
              width={200}
              height={20}
              alt="beyond coding podcast"
            />
            <p className="mt-2">I love to listen to podcasts like <span className="font-bold text-blue-500">Beyond Coding Podcast</span> like a typical Auditory learner. I find that hearing concepts helps me connect concepts, deepening my understanding.</p>
            </li>
            
            <li className="mt-5">
              <b>Visual 👀:</b>
              <Image 
              className="rounded-lg"
              src="/images/diagram.jpg"
              width={150}
              height={20}
              alt="beyond coding podcast"
            />
            <p className="mt-2">This is an example of my visual learning. I love creating diagrams like mindmaps or venn diagrams to showcase the different connections between topics, like I did with the carbon cycle in science class.</p>
            </li>
          </ul>
        </Section>
      </div>
    </Scroll>
  );
};