import React, { useEffect, useState } from 'react';
import { useUiDatabase } from "../useUiDatabase";
import { QueryExecResult } from "sql.js";
import { EXAMPLE_QUERY, INITIAL_QUERY } from "../misc/queries";
import { QueryResultDisplay } from "../QueryResultsDisplay/QueryResultsDisplay";
import { splitQueryText } from "../misc/utils";
// import { explanations } from './descriptions/page';
import explanation_data from "./descriptions/explanation_data.json"; // Import the JSON file
import TopSection from './descriptions/page';
// import { ExampleComponent} from "../misc/utils1";
// import { pa } from "../About/About";
// import { page } from "./pages/page";
import "./App.scss";
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


export const App = () => {
  const { runQuery, resetDatabase } = useUiDatabase();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<QueryExecResult[]>([]);
  const [error, setError] = useState<Error | null>(null);
  // const [page] = useState<string>("");
  const [page, setPage] = useState<string | null>(null);

  const [queryHistory, setQueryHistory] = useState<string[]>([]);

  /**
   * Function which executes whenever the query textarea changes, sets the current query state.
   */
  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  /**
   * Function which executes whenever the "Run Query" button is clicked
   */
  const handleRunQuery = () => {
    const queryResults = runQuery(query);

    if (Array.isArray(queryResults) && queryResults.length > 0) {
      setResults(queryResults);
      setError(null);
      setQueryHistory([...queryHistory, query]);
      setQuery("");
    } else if (queryResults instanceof Error) {
      setError(queryResults);
    }
  };

  /**
   * Function which executes whenever the "reset db" button is clicked
   */
  const runDatabaseReset = () => {
    resetDatabase();
    setResults([]);
    setQuery("");
    setError(null);
  };

  const loadInitialQuery = () => {
    const queryResults = runQuery(INITIAL_QUERY);
  
    if (queryResults instanceof Error) {
      setError(queryResults);
    }
  };

  // const ExampleComponent: React.FC = () => {

  //   // Define the function that you want to run automatically
  //   const runOnMount = () => {
  //     loadInitialQuery()
  //     console.log('This function runs when the component mounts.');
  //     // Add your logic here (e.g., fetching data, initializing something)
  //   };
  
  //   // Use the useEffect hook to run the function on component mount
  //   useEffect(() => {
  //     runOnMount();
  //   }, []); // The empty dependency array ensures this runs only once when the component mounts
  
  //   return (
  //     <div>
  //       <a> Hello, World!</a>
  //     </div>
  //   );
  // };

  // const pageToLoad = (page: string) => {
  //   page = page;
  //   console.log(page);
  // }

  const pageToLoad = (page: string) => {
    setPage(page);
    console.log(page);
  };
  
  // const loadDescription = (keyName: string) => {
  //   const explanations = explanation_data;
  //   const results = TopSection({ keyName, explanations });
  //   return results;
  // };

  return (
    <body>
      {/* <a> loadInitialQuery() </a> */}
      {/* <loadInitialQuery /> */}
      {/* <ExampleComponent /> */}
      
      <aside className="sidebar">
      <nav>
        <a onClick={() => pageToLoad('intro')} > 0. Intro</a>
        <a onClick={() => pageToLoad('select_from')} >1. Select...From</a>
        <a onClick={() => pageToLoad('where')} >2. Where</a>
        <a onClick={() => pageToLoad('limit')} >3. Limit</a>
        <a onClick={() => pageToLoad('left_join')} >4. Left Join</a>
        <a onClick={() => pageToLoad('group_by')} >5. Group by</a>
        <a onClick={() => pageToLoad('partition_by')} >6. Partition by</a>
        <a onClick={() => pageToLoad('order_by')} >7. Order by</a>
        <a onClick={() => pageToLoad('with')} >8. With</a>
        <a onClick={() => pageToLoad('having')} >9. Having</a>
        <a onClick={() => pageToLoad('qualify')} >10. Qualify</a>
      </nav>
      </aside>

    <div className='top_section'>
      {page && <TopSection keyName={page} explanations={explanation_data} />}
    </div>
    
    <div className="app-container">
        <div className="query-space">
          <textarea
            value={query}
            onChange={handleQueryChange}
            rows={20}
            cols={50}
            placeholder="Write your SQL query here, e.g. SELECT * FROM table_name;" />{" "}
          <br />
          <div className="database-actions">
            <button className="run-query" onClick={handleRunQuery}>
              Run Query
            </button>

            <button className="initial-query" onClick={loadInitialQuery}>
              Initialise db
            </button>

            <button className="run-query" onClick={runDatabaseReset}>
              reset db
            </button>
          </div>
          <p className="query-error">{error?.message}</p>
          <code>Example: </code>
          <pre className="query-example">{EXAMPLE_QUERY}</pre>
          <br />
          <code>
            History <button onClick={() => setQueryHistory([])}>clear</button>{" "}
          </code>
          <pre className="query-history">
            {!queryHistory || queryHistory.length === 0 ? (
              <span className="no-history">no history</span>
            ) : (
              queryHistory.map((query, index) => (
                <pre className="query-history-item">
                  <span key={index}>{splitQueryText(query)}</span>
                </pre>
              ))
            )}
          </pre>
        </div>
        <QueryResultDisplay queryResults={results} />
      </div>
      </body>
  );
};