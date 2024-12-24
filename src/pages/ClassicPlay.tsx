import GameTopNav from "../components/gameplay/GameTopNav";
import ClassicGamesList from "../components/pages/ClassicGamesList";

const ClassicPlay = () => {
    return (
        <div>
            <div className="flex flex-col">
                <div>
                    <GameTopNav />
                </div>
                <ClassicGamesList />
            </div>
        </div>
    );
};

export default ClassicPlay;
