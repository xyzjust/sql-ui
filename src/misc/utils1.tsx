import React, { useEffect } from 'react';
import { useUiDatabase } from "../useUiDatabase";
import { INITIAL_QUERY } from "./queries";
import { useState } from "react";

export const splitQueryText = (query: string) =>
  query
    .split(";")
    .map((query) => query.trim())
    .filter((query) => query.length > 0)
    .join(";\n");


const { runQuery, resetDatabase } = useUiDatabase();
const [error, setError] = useState<Error | null>(null);

export const loadInitialQuery = () => {
  const queryResults = runQuery(INITIAL_QUERY);

  if (queryResults instanceof Error) {
    setError(queryResults);
  }
};


export const ExampleComponent: React.FC = () => {

  // Define the function that you want to run automatically
  const runOnMount = () => {
    loadInitialQuery()
    console.log('This function runs when the component mounts.');
    // Add your logic here (e.g., fetching data, initializing something)
  };

  // Use the useEffect hook to run the function on component mount
  useEffect(() => {
    runOnMount();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <a> Hello, World!</a>
    </div>
  );
}
  
