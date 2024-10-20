import { Link } from "react-router-dom";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "../../../components/ui/3d-card";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-100 relative group/card  border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl px-3 py-3 sm:p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600"
        >
          Create your account
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2"
        >
          Choose a plan that suits you, and explore our easy-to-use interface
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="/src/assets/rocket-engine.jpg"
            height="1000"
            width="1000"
            className="h-48 sm:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            // as={Link}
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold"
          >
            <Link to="/signup">Sign up</Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
