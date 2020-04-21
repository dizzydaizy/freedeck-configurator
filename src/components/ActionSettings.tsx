import React, { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";

import { EKeys, Keys, MediaKeys, EMediaKeys } from "../definitions/keys";
import { EAction, IRow } from "../lib/parse/parsePage";
import { scrollToPage } from "../lib/scrollToPage";
import { FDButton } from "./lib/button";
import {
  MicroButton,
  SelectWrapper,
  Row,
  WrapRow,
  CheckButton,
  Title,
} from "./lib/misc";
import { StyledSelect } from "./lib/misc";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100px;
`;

const SmallButton = styled(FDButton).attrs({ mt: 4 })`
  font-weight: bold;
`;
export const ActionSettings: React.FC<{
  addPage: () => number;
  pages: number[];
  row: IRow;
  setRow: (settings: IRow) => void;
  title: string;
}> = ({ setRow, row, pages, addPage, title }) => {
  const setMode = useCallback(
    (mode: number) => {
      setRow({ ...row, action: mode });
    },
    [row]
  );
  const removeKey = useCallback(
    (index: number) => {
      const keys = [...row.keys];
      keys.splice(index, 1);
      setRow({ ...row, keys });
    },
    [row]
  );
  const addKey = useCallback(
    (key: number) => {
      setRow({ ...row, keys: [...row.keys, key] });
    },
    [row]
  );
  const setKeys = useCallback(
    (keys: number[]) => {
      setRow({ ...row, keys });
    },
    [row]
  );
  const setPage = useCallback(
    (page: number) => {
      setRow({ ...row, page });
    },
    [row]
  );

  return (
    <Wrapper>
      {JSON.stringify(row)}
      <Title>{title}</Title>
      <SelectWrapper>
        <StyledSelect
          value={row.action}
          onChange={(e) => setMode(parseInt(e.target.value))}
        >
          <option value="0">Send Keys</option>
          <option value="3">Special Keys</option>
          <option value="1">Change Page</option>
          <option value="2">Do nothing</option>
        </StyledSelect>
      </SelectWrapper>
      {row.action === 0 && (
        <>
          <WrapRow>
            {row.keys.map((key, index) => (
              <MicroButton onClick={() => removeKey(index)}>
                {EKeys[key].toString()}
              </MicroButton>
            ))}
          </WrapRow>
          <SelectWrapper>
            <StyledSelect
              value={0}
              onChange={(e) => addKey(parseInt(e.target.value))}
            >
              <option key={0} value={0}>
                Nothing
              </option>
              {Keys.map((enumKey) => (
                //@ts-ignore
                <option key={enumKey} value={EKeys[enumKey]}>
                  {enumKey}
                </option>
              ))}
            </StyledSelect>
          </SelectWrapper>
        </>
      )}
      {row.action === 1 && (
        <>
          {pages.length ? (
            <SelectWrapper>
              <StyledSelect
                value={row.page}
                onChange={(e) => setPage(parseInt(e.target.value))}
              >
                <option value={-1}>Select Page</option>
                {pages.map((pageNumber) => (
                  <option key={pageNumber} value={pageNumber}>
                    Go to {pageNumber}
                  </option>
                ))}
              </StyledSelect>
            </SelectWrapper>
          ) : null}
          {row.page === -1 ? (
            <SmallButton size={1} onClick={() => setPage(addPage())}>
              Add Page +
            </SmallButton>
          ) : (
            <SmallButton size={1} onClick={() => scrollToPage(row.page)}>
              Scroll To {row.page}
            </SmallButton>
          )}
        </>
      )}
      {row.action === 3 && (
        <>
          <SelectWrapper>
            <StyledSelect
              value={row.keys[0]}
              onChange={(e) => setKeys([parseInt(e.target.value)])}
            >
              <option key={0} value={0}>
                Nothing
              </option>
              {MediaKeys.map((enumKey) => (
                //@ts-ignore
                <option key={enumKey} value={EMediaKeys[enumKey]}>
                  {enumKey}
                </option>
              ))}
            </StyledSelect>
          </SelectWrapper>
        </>
      )}
    </Wrapper>
  );
};
