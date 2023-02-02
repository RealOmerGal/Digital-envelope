import { styled } from "@mui/material";

type DirectionProps = {
  direction?: "row" | "column";
};

const CenteringContainer = styled("div")<DirectionProps>(({ direction }) => ({
  display: "flex",
  flexDirection: direction,
  flexGrow: 1,
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
}));

export default CenteringContainer;
