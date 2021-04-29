import BoardManager from "./Board CRUD component/BoardManager";
import TeamManager from "./Teams/TeamManager";

const BoardScreen = () => (
  <div className="BoardScreen">
    <TeamManager />
    <BoardManager />
  </div>
);

export default BoardScreen;
