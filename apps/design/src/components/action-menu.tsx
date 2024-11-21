import styled from "@emotion/styled";
import {
  Backdrop as BackdropMUI,
  Button as ButtonMUI,
  Fab as FabMUI,
  Fade,
  ListItem as ListItemMUI,
  List as ListMUI,
  Modal,
} from "@mui/material";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import IconAddShoppingCart from "@mui/icons-material/AddShoppingCart";
import IconClose from "@mui/icons-material/Close";
import { breakpoints } from "../utils/media-query";
import ButtonAction from "./button-action";
interface Option {
  id: string | number;
  label: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
}
interface Props
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "ref" | "onClick"
  > {
  options: Array<Option>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onClickOption?: (
    option: Option,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}
type Options = {
  padding?: number;
};

function computeRects(reference: HTMLElement, floating: HTMLElement) {
  const referenceRec = reference.getBoundingClientRect();
  const floatingRec = floating.getBoundingClientRect();
  return {
    reference: {
      x: referenceRec.x,
      y: referenceRec.y,
      width: referenceRec.width,
      height: referenceRec.height,
    },
    floating: {
      width: floatingRec.width,
      height: floatingRec.height,
      x: 0,
      y: 0,
    },
  };
}
function computePosition(
  reference: HTMLElement,
  floating: HTMLElement,
  options: Options = {}
) {
  const rects = computeRects(reference, floating);
  const { padding = 0 } = options;
  let y = rects.reference.y + rects.reference.height - rects.floating.height;
  const min = padding;
  const max = innerHeight - rects.floating.height - padding;
  y = Math.max(Math.min(y, max), min);
  return y;
}
export default function UnknownComponent(props: Props) {
  const { options, onClick, onClickOption, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [pos1, setPos1] = useState(0);
  const [pos2, setPos2] = useState(0);
  const ref = useRef<HTMLButtonElement>(null);
  const [iconRef, setIconRef] = useState<HTMLButtonElement | null>(null);
  const [containerRef, setContainerRef] = useState<HTMLUListElement | null>(
    null
  );
  const reference = useRef<DOMRect>();
  const lastY = useRef(0);
  const calculatePosition: MouseEventHandler<HTMLButtonElement> = (e) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    lastY.current = e.clientY;
    reference.current = rect;
  };
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);
    setOpen(!open);
    calculatePosition(e);
  };
  const handleClose = () => setOpen(false);
  const handleClickOption: Props["onClickOption"] = (option, event) => {
    onClickOption?.(option, event);
    handleClose();
  };
  useLayoutEffect(() => {
    if (!containerRef || !iconRef) return;
    setPos1(computePosition(ref.current!, containerRef, { padding: 16 }));
    setPos2(computePosition(ref.current!, iconRef, { padding: 16 }));
  }, [iconRef, containerRef]);

  return (
    <Wrapper {...rest}>
      <Fade in={!open}>
        <Button ref={ref} onClick={handleClick}>
          <IconAddShoppingCart />
          <span style={{ textTransform: "initial" }}>Buy</span>
        </Button>
      </Fade>
      <Modal
        open={open}
        onClose={handleClose}
        slots={{ backdrop: BackdropMUI }}
      >
        <Fade appear in={open}>
          <Container>
            <ListContainer>
              <List ref={setContainerRef} style={{ top: pos1 }}>
                {options.map((option) => (
                  <ListItem key={option.id}>
                    <ButtonAction
                      icon={<IconAddShoppingCart />}
                      onClick={(e) => handleClickOption(option, e)}
                      {...option}
                    >
                      {option.label}
                    </ButtonAction>
                  </ListItem>
                ))}
              </List>
            </ListContainer>
            <CTAContainer>
              <Fab onClick={handleClose} ref={setIconRef} style={{ top: pos2 }}>
                <IconClose style={{ height: 20, width: 20 }} />
              </Fab>
            </CTAContainer>
          </Container>
        </Fade>
      </Modal>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 0 2rem;
  display: flex;
  justify-content: end;
`;
const Button = styled(ButtonMUI)`
  background-color: black;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-align: left;
  > :not([hidden]) ~ :not([hidden]) {
    margin-left: 0.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  padding: 0 2rem 0 1rem;
  justify-content: end;
  ${breakpoints.sm} {
    width: auto;
  }
`;
const ListContainer = styled.div`
  flex: 1;
  position: relative;
  height: 0;
`;
const CTAContainer = styled.div`
  position: relative;
  width: 2.5rem;
  margin-left: 1rem;
`;

const List = styled(ListMUI)`
  padding: 0px;
  flex: 1;
  right: 0px;
  margin-left: auto;
  > :not([hidden]) ~ :not([hidden]) {
    margin-top: 0.5rem;
  }
  ${breakpoints.sm} {
    width: 22.5rem;
    flex: initial;
  }
`;

const ListItem = styled(ListItemMUI)`
  width: 100%;
  padding: 0;
`;

const Fab = styled(FabMUI)`
  /* margin-left: 1rem; */
  height: 2.5rem;
  width: 2.5rem;
  position: absolute;
`;
