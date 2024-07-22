import Catagories from "./components/Home/Catagories/Catagories";
import HeroContainer from "./components/Home/HeroContainer/HeroContainer";
import MealType from "./components/MealType/MealType";

export default function Home() {
  return (
    <div className="dark:bg-black dark:text-white">
    <HeroContainer/>
    <Catagories/>
    <MealType/>
    </div>
  );
}
