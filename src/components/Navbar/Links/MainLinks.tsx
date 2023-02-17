import MainLink from "./MainLink";
import { LinkDataProps } from "./helper";

interface MainLinksProps {
  linkData: LinkDataProps[];
}

const MainLinks = ({ linkData }: MainLinksProps) => {
  const links = linkData.map((link) => <MainLink {...link} key={link.label} />);
  return <>{links}</>;
};

export default MainLinks;
