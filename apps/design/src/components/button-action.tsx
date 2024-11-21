import styled from "@emotion/styled";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import { breakpoints } from "../utils/media-query";

export default function ButtonAction(
  props: PropsWithChildren<
    {
      icon?: ReactNode;
      subtitle?: ReactNode;
      description?: string;
      tags?: string[];
    } & Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
      "ref"
    >
  >
) {
  const { icon, children, subtitle, description, tags, ...rest } = props;
  return (
    <ButtonContainer {...rest}>
      <ButtonMain>
        {icon}
        <ButtonContent>{children}</ButtonContent>
        {subtitle}
      </ButtonMain>
      {description && <ButtonDescription>{description}</ButtonDescription>}
      {tags && (
        <ButtonTags>
          {tags.map((tag) => (
            <ButtonTag key={tag}>{tag}</ButtonTag>
          ))}
        </ButtonTags>
      )}
    </ButtonContainer>
  );
}
const ButtonContainer = styled.button`
  background-color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  width: 100%;
  text-align: left;
  ${breakpoints.sm} {
    padding: 1rem 1.5rem;
  }
`;
const ButtonMain = styled.div`
  display: flex;
  > :not([hidden]) ~ :not([hidden]) {
    margin-left: 0.5rem;
  }
`;
const ButtonContent = styled.div`
  flex: 1;
`;
const ButtonDescription = styled.div`
  margin-top: 0.5rem;
  color: #7d7d7d;
  font-size: 0.875rem;
  line-height: 1;
`;
const ButtonTags = styled.div`
  margin-top: 1rem;
  font-size: 0.75rem;
  display: flex;
  > :not([hidden]) ~ :not([hidden]) {
    margin-left: 0.5rem;
  }
`;
const ButtonTag = styled.div`
  background-color: #f2f2f2;
  padding: 0.25rem 0.5rem;
`;
