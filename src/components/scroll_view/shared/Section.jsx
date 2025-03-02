interface SectionProps {
  right?;
  opacity?;
  children: React.ReactNode;
}

export const Section: React.FC = (props) => {
  return (
    <section
      className={`h-screen flex flex-col p-10 ${
        props.right ? "justify-end items-end" : "justify-start items-start"
      }`}
      style={{
        opacity: props.opacity,
      }}
    >
      <div className="w-full">
        <div className="bg-white rounded-lg px-12 py-16 max-w-4xl ">
          {props.children}
        </div>
      </div>
    </section>
  );
};
