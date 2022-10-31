import CenteringContainer from "../../../../components/CenteringContainer";
import { SectionHeader, SectionImage } from "../docs-step/styles";

interface IDocsStep {
  imgSrc: string;
  header: string;
}

const DocsStep = (props: IDocsStep) => {
  return (
    <CenteringContainer direction="column" sx={{ mt: 4 }}>
      <SectionHeader>{props.header}</SectionHeader>
      <SectionImage src={props.imgSrc} />
    </CenteringContainer>
  );
};

export default DocsStep;
