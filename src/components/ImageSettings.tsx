import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import { colors } from "../definitions/colors";
import useDebounce from "../lib/useDebounce";
import { StyledSelect, Row } from "./lib/misc";
import { FDButton } from "./lib/button";
import {
  Column,
  Disabler,
  Title,
  Label,
  TextInput,
  CheckButton,
  MicroButton,
} from "./lib/misc";
import { IImageSettings } from "./Display";

export const fontSmaller = "fonts/smaller.fnt";
export const fontSmall = "fonts/small.fnt";
export const fontMedium = "fonts/medium.fnt";
export const fontLarge = "fonts/large.fnt";

function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}
const Wrapper = styled.div<{ show: boolean }>`
  display: ${(p) => (p.show ? "flex" : "none")};
`;

const ContrastValue = styled.p`
  line-height: 21px;
  margin: 0;
  color: ${colors.white};
  font-family: sans-serif;
  font-size: 16px;
  font-weight: bold;
`;
const MicroToggle = styled(FDButton).attrs({ size: 1 })`
  padding: 0px 4px;
`;

const EnableTextButton = styled(CheckButton)`
  margin-right: 4px;
`;

export const ImageSettings: React.FC<{
  setSettings: (settings: IImageSettings) => void;
  show: boolean;
  textOnly: boolean;
  settings: IImageSettings;
}> = ({ setSettings, show, textOnly, settings }) => {
  // const [contrast, setContrast] = useState<number>(settings.contrast);
  // const [dither, setDither] = useState<boolean>(settings.dither);
  // const [invert, setInvert] = useState<boolean>(settings.invert);
  // const [textEnabled, setTextEnable] = useState<boolean>(settings.textEnabled);
  // const [text, setText] = useState<string>(settings.text);
  // const [fontName, setfontName] = useState<string>(settings.fontName);
  // const debouncedText = useDebounce(text, 250);

  // useEffect(() => {
  //   setSettings({ contrast, dither, invert, text, textEnabled, fontName });
  // }, [contrast, dither, invert, debouncedText, textEnabled, fontName]);

  // useEffect(() => {
  //   if (textOnly) return;
  //   setContrast(settings.contrast);
  //   setDither(settings.dither);
  //   setInvert(settings.invert);
  //   setTextEnable(settings.textEnabled);
  //   setText(settings.text);
  //   setfontName(settings.fontName);
  // }, [settings]);

  const setContrast = useCallback((diff: number) => {
    setSettings({
      ...settings,
      contrast: clamp(settings.contrast + diff, -1, 1),
    });
  }, []);
  const setInvert = useCallback(() => {
    setSettings({
      ...settings,
      invert: !settings.invert,
    });
  }, []);
  const setDither = useCallback(() => {
    setSettings({
      ...settings,
      dither: !settings.dither,
    });
  }, []);
  const setTextEnabled = useCallback(() => {
    setSettings({
      ...settings,
      textEnabled: !settings.textEnabled,
    });
  }, []);
  const setfontName = useCallback((fontName: string) => {
    setSettings({
      ...settings,
      fontName,
    });
  }, []);
  const setText = useCallback((text: string) => {
    setSettings({
      ...settings,
      text,
    });
  }, []);
  return (
    <Wrapper show={show}>
      <Column>
        <Disabler
          disable={textOnly}
          title="These options are disable. Load an image by clicking on the black box or just enter some text"
        />
        <Title>Image Settings</Title>
        <Row>
          <Label>Contrast</Label>
          <ContrastValue>{settings.contrast.toFixed(2)}</ContrastValue>
        </Row>
        <Row>
          <MicroButton onClick={() => setContrast(0.1)}>++</MicroButton>
          <MicroButton onClick={() => setContrast(0.02)}>+</MicroButton>
          <MicroButton onClick={() => setContrast(-0.02)}>-</MicroButton>
          <MicroButton onClick={() => setContrast(-0.1)}>--</MicroButton>
        </Row>
        <Row>
          <MicroToggle width="48%" onClick={() => setInvert()}>
            Invert
          </MicroToggle>

          <MicroToggle width="48%" onClick={() => setDither()}>
            Dither
          </MicroToggle>
        </Row>
        <Row>
          <EnableTextButton
            uff={settings.textEnabled}
            width="33%"
            onClick={(e) => setTextEnabled()}
          >
            Text
          </EnableTextButton>
          <StyledSelect
            defaultValue={settings.fontName}
            onChange={(e) => setfontName(e.currentTarget.value)}
          >
            <option value={fontSmaller}>smaller</option>
            <option value={fontSmall}>small</option>
            <option value={fontMedium}>medium</option>
            <option value={fontLarge}>large</option>
          </StyledSelect>
        </Row>
      </Column>

      <Column>
        <Title>Text</Title>
        <Row>
          <TextInput
            placeholder={"Enter text"}
            value={settings.text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
        </Row>
      </Column>
    </Wrapper>
  );
};
