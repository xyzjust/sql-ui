import React from 'react';

export const Page = () => {
  return (
      <body> "hello world" </body>
  )
}

interface Explanation {
  title: string;
  description: string;
  additionalInfo: string;
}

interface TopSectionProps {
  keyName: string;
  explanations: { [key: string]: Explanation };
}

const TopSection: React.FC<TopSectionProps> = ({ keyName, explanations }) => {
  const value = explanations[keyName];

  if (!value) {
    return <p>No explanation found for the key: {keyName}</p>;
  }

  const { title, description, additionalInfo } = value;

  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{additionalInfo}</p>
    </section>
  );
}

export default TopSection;

