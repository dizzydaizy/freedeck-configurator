import React, { useCallback } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import styled from "styled-components";

import {
  IActionDisplay,
  IActionSettingPage,
  IImageDisplay,
  IImageSettingPage,
} from "../App";
import { colors } from "../definitions/colors";
import { Display } from "./Display";

const Wrapper = styled.div`
  position: relative;
  margin: 24px;
  padding: 18px;
  /* border: 1px solid ${colors.white}; */
  border-radius: 21px;
  background: ${colors.gray};
  box-shadow: 13px 13px 21px #11161d, -13px -13px 21px #2d3a49;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PageIndicator = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-family: sans-serif;
  border-radius: 50%;
  border: 1px solid #555;
  text-align: center;
  vertical-align: middle;
  line-height: 38px;
  width: 40px;
  height: 40px;
  color: ${colors.white};
  position: absolute;
  top: -20px;
  left: -20px;
  background-color: ${colors.black};
`;

const DeletePage = styled.img`
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  height: 22px;
  width: 22px;
  top: -8px;
  right: -8px;
  position: absolute;
  border-style: none;
`;

const Grid = styled.div<{ width: number; height: number }>`
  display: grid;
  grid-template-columns: ${(p) => {
    let fr = "128px";
    for (var i = 0; i < p.width - 1; i++) {
      fr += " 128px";
    }
    return `${fr};`;
  }};
  grid-template-rows: ${(p) => {
    let fr = "64px";
    for (var i = 0; i < p.height - 1; i++) {
      fr += " 64px";
    }
    return `${fr};`;
  }};
  margin: 20px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

interface IProps {
  deleteImage: (displayIndex: number) => void;
  pageIndex: number;
  hasOriginalImage: (displayIndex: number) => boolean;
  width: number;
  height: number;
  actionPage: IActionSettingPage;
  imagePage: IImageSettingPage;
  convertedImages: Buffer[];
  setOriginalImage: (displayIndex: number, image: Buffer) => void;
  deletePage: (pageIndex: number) => void;
  addPage: () => number;
  pageCount: number;
  setDisplayActionSettings: (
    displayIndex: number,
    newDisplay: IActionDisplay
  ) => void;
  setDisplayImageSettings: (
    displayIndex: number,
    newDisplay: IImageDisplay
  ) => void;
  switchDisplays: (
    aPageIndex: number,
    bPageIndex: number,
    aDisplayIndex: number,
    bDisplayIndex: number
  ) => void;
}

const PageComponent: React.FC<IProps> = ({
  pageIndex,
  deleteImage,
  hasOriginalImage,
  width,
  height,
  convertedImages,
  setOriginalImage,
  actionPage,
  imagePage,
  deletePage,
  addPage,
  setDisplayActionSettings,
  setDisplayImageSettings,
  pageCount,
  switchDisplays,
}) => {
  return (
    <Wrapper id={`page_${pageIndex}`}>
      <Header>
        <PageIndicator>{pageIndex}</PageIndicator>
        <DeletePage
          src="close.png"
          onClick={() => {
            const deleteConfirmed = window.confirm(
              "Do you really want to delete this page forever?"
            );
            if (deleteConfirmed) deletePage(pageIndex);
          }}
        />
      </Header>
      <Grid height={height} width={width}>
        <DndProvider backend={Backend}>
          {actionPage.map((actionDisplay, actionDisplayIndex) => (
            <Display
              deleteImage={() => deleteImage(actionDisplayIndex)}
              image={convertedImages[actionDisplayIndex]}
              setDisplayAction={(displayAction: IActionDisplay) =>
                setDisplayActionSettings(actionDisplayIndex, displayAction)
              }
              setDisplayImage={(displayImage: IImageDisplay) =>
                setDisplayImageSettings(actionDisplayIndex, displayImage)
              }
              actionDisplay={actionDisplay}
              imageDisplay={imagePage[actionDisplayIndex]}
              key={actionDisplayIndex}
              displayIndex={actionDisplayIndex}
              pageIndex={pageIndex}
              setOriginalImage={(image) =>
                setOriginalImage(actionDisplayIndex, image)
              }
              pages={[...Array(pageCount).keys()].filter(
                (pageNumber) => pageNumber !== pageIndex
              )}
              addPage={addPage}
              hasOriginalImage={hasOriginalImage(actionDisplayIndex)}
              switchDisplays={switchDisplays}
            />
          ))}
        </DndProvider>
      </Grid>
    </Wrapper>
  );
};

export const Page = React.memo(PageComponent, (prev, next) => {
  return false;
  // if (prev.setActionPage !== next.setActionPage) return false;
  // if (prev.setImagePage !== next.setImagePage) return false;
  // if (prev.setOriginalImage !== next.setOriginalImage) return false;
  // const prevRevisionImage = prev.convertedImages.reduce(
  //   (acc, image) => acc + image._revision,
  //   0
  // );
  // const nextRevisionImage = next.convertedImages.reduce(
  //   (acc, image) => acc + image._revision,
  //   0
  // );
  // if (prevRevisionImage !== nextRevisionImage) return false;

  // const prevRevisionImagePage = prev.imagePage.displays.reduce(
  //   (acc, display) => acc + display._revision,
  //   0
  // );
  // const nextRevisionImagePage = next.imagePage.displays.reduce(
  //   (acc, display) => acc + display._revision,
  //   0
  // );
  // if (prevRevisionImagePage !== nextRevisionImagePage) return false;

  // const prevRevisionActionPage = prev.actionPage.displays.reduce(
  //   (acc, display) => acc + display._revision,
  //   0
  // );
  // const nextRevisionActionPage = next.actionPage.displays.reduce(
  //   (acc, display) => acc + display._revision,
  //   0
  // );
  // if (prevRevisionActionPage !== nextRevisionActionPage) return false;

  // return true;
});
