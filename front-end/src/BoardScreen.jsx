import { useEffect, useState, useContext } from "react";

import BoardManager from "./Board CRUD component/BoardManager";
import TeamManager from "./Teams/TeamManager";
import { CookieContext } from "./CookiesContext";
import { CurrentTeamContext } from "./CurrentTeamContext";

const BoardScreen = () => {
  // needed for fetch error handling
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // allBoards is a list of boards,
  // which should be fetched from the server
  const [allBoards, setAllBoards] = useState([]);
  const [boards, setBoards] = useState([]);

  const [teams, setTeams] = useState([]);

  const [cookies] = useContext(CookieContext);
  const [currTeamID, setCurrTeamID] = useContext(CurrentTeamContext);

  // function for retrieving teams from boards
  const getTeams = (boardArr) => {
    console.log(boardArr);
    const duplicatedTeams = [];
    boardArr.forEach((board) => {
      const team = { name: board.team_name, id: board.team_id };
      duplicatedTeams.push(team);
    });
    console.log(duplicatedTeams);
    const uniqueTeams = duplicatedTeams.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );
    console.log(uniqueTeams);
    // const notEmptyTeams = uniqueTeams.filter((team) => team.id);

    return uniqueTeams;
  };

  // fetching the list of boards
  useEffect(() => {
    const getBoardsOfFirstTeam = (teamArr, boardArr) => {
      // add handling for empty teams
      const boardsOfFirstTeam = boardArr.filter(
        (board) => board.team_id === teamArr[0].id
      );
      return boardsOfFirstTeam;
    };

    fetch("http://localhost:3000/boards", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.JWT}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          // eslint-disable-next-line func-names
          console.log(result);
          const { boards: boardArr, teams: teamArr } = result;
          setIsLoaded(true);
          setAllBoards(boardArr);
          // const teamArr = getTeams(result);
          setTeams(teamArr);
          setBoards(getBoardsOfFirstTeam(teamArr, boardArr));
          if (teamArr[0]) {
            setCurrTeamID(teamArr[0].id);
          } else setCurrTeamID(null);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      );
  }, [cookies.JWT]);

  // fetch error handling
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="BoardScreen">
      <TeamManager
        teams={teams}
        setTeams={setTeams}
        setBoards={setBoards}
        allBoards={allBoards}
      />
      <BoardManager
        boards={boards}
        setBoards={setBoards}
        setAllBoards={setAllBoards}
        allBoards={allBoards}
      />
    </div>
  );
};
export default BoardScreen;
