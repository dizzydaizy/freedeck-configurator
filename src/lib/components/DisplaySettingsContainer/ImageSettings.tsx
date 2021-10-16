import {
  LightningBoltIcon,
  MoonIcon,
  RefreshIcon,
  SunIcon,
  SwitchHorizontalIcon,
  TranslateIcon,
} from "@heroicons/react/outline";
import { SunIcon as SunIconAlt } from "@heroicons/react/solid";
import c from "clsx";
import React, { useContext } from "react";
import {
  fontLarge,
  fontMedium,
  fontSmall,
  fontSmaller,
} from "../../../definitions/fonts";
import {
  ConfigDispatchContext,
  ConfigStateContext,
} from "../../../states/configState";
import { CtrlDuo } from "../CtrlDuo";
import { Label, Value } from "../LabelValue";
import { StyledSelect, TextInput } from "../Misc";
import { Row } from "../Row";
import { FDSlider } from "../Slider";
import { Switch } from "../Switch";
import { Title } from "../Title";

const Toggle: React.FC<{ $on: boolean; onClick?: any }> = ({
  $on,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={c(
      $on
        ? "bg-success-600 hover:bg-success-400"
        : "bg-danger-600 hover:bg-danger-400",
      "px-2 py-0.5 w-14 font-semibold rounded-sm text-center text-white select-none"
    )}
  >
    {$on ? "I" : "O"}
  </div>
);

export interface ISettings {
  contrast: number;
  dither: boolean;
  invert: boolean;
  text: string;
  textEnabled: boolean;
  fontName: string;
}

export const ImageSettings: React.FC<{
  displayIndex: number;
  pageIndex: number;
}> = ({ displayIndex, pageIndex }) => {
  const configState = useContext(ConfigStateContext);
  const display =
    pageIndex === -1
      ? configState.defaultBackDisplay
      : configState.displaySettingsPages[pageIndex][displayIndex];

  const configDispatch = useContext(ConfigDispatchContext);

  const setBlack = (blackThreshold: number) => {
    display.imageSettings.blackThreshold = blackThreshold;
    configDispatch.setDisplaySettings({
      displaySettings: display,
      pageIndex,
      buttonIndex: displayIndex,
    });
  };
  const setWhite = (whiteThreshold: number) => {
    display.imageSettings.whiteThreshold = whiteThreshold;
    configDispatch.setDisplaySettings({
      displaySettings: display,
      pageIndex,
      buttonIndex: displayIndex,
    });
  };
  const setBrightness = (brightness: number) => {
    display.imageSettings.brightness = brightness;
    configDispatch.setDisplaySettings({
      displaySettings: display,
      pageIndex,
      buttonIndex: displayIndex,
    });
  };
  const setContrast = (contrast: number) => {
    display.imageSettings.contrast = contrast;
    configDispatch.setDisplaySettings({
      displaySettings: display,
      pageIndex,
      buttonIndex: displayIndex,
    });
  };
  const setInvert = (invert: boolean) => {
    display.imageSettings.invert = invert;
    configDispatch.setDisplaySettings({
      displaySettings: display,
      pageIndex,
      buttonIndex: displayIndex,
    });
  };
  const setDither = (dither: any) => {
    display.imageSettings.dither = dither;
    configDispatch.setDisplaySettings({
      displaySettings: display,
      pageIndex,
      buttonIndex: displayIndex,
    });
  };
  const setfontName = (font: string) => {
    display.textSettings.font = font;
    configDispatch.setDisplaySettings({
      displaySettings: display,
      pageIndex,
      buttonIndex: displayIndex,
    });
  };
  const setText = (text: string) => {
    display.textSettings.text = text;
    configDispatch.setDisplaySettings({
      displaySettings: display,
      pageIndex,
      buttonIndex: displayIndex,
    });
  };
  const setIconWidthMultiplier = (value: number) => {
    display.textWithIconSettings.iconWidthMultiplier = value;
    configDispatch.setDisplaySettings({
      displaySettings: display,
      pageIndex,
      buttonIndex: displayIndex,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 grid-rows-1 w-full">
      <div className="relative flex flex-col p-4 bg-gray-700 rounded-2xl">
        <div
          className={c(
            "z-10 bg-gray-900 opacity-80 top-0 left-0 right-0 bottom-0 absolute rounded-2xl",
            display.originalImage ? "hidden" : "block"
          )}
          title="These options are disabled. Load an image by clicking on the black box or just enter some text"
        />
        <Title className="mb-8">Image Settings</Title>
        {!display.imageSettings.dither ? (
          <>
            <Row className="h-7">
              <CtrlDuo>
                <SunIconAlt className="h-7 w-7Te" />
                <Label>White Threshold:</Label>
              </CtrlDuo>
              <FDSlider
                className="w-32"
                min={0}
                max={128}
                step={1}
                value={display.imageSettings.whiteThreshold}
                onChange={(event) =>
                  setWhite(event.currentTarget.valueAsNumber)
                }
              />
            </Row>
            <Row className="h-7">
              <CtrlDuo>
                <SunIcon className="h-7 w-7Te" />
                <Label>Black Threshold:</Label>
              </CtrlDuo>
              <FDSlider
                className="w-32"
                min={128}
                max={255}
                step={1}
                value={display.imageSettings.blackThreshold}
                onChange={(event) =>
                  setBlack(event.currentTarget.valueAsNumber)
                }
              />
            </Row>
          </>
        ) : (
          <>
            <Row className="h-7">
              <CtrlDuo>
                <SunIconAlt className="h-7 w-7Te" />
                <Label>Brightness:</Label>
              </CtrlDuo>
              <FDSlider
                min={-1}
                max={1}
                step={0.02}
                value={display.imageSettings.brightness}
                onChange={(event) =>
                  setBrightness(event.currentTarget.valueAsNumber)
                }
              />
            </Row>
            <Row className="h-7">
              <CtrlDuo>
                <MoonIcon className="h-7 w-7Te" />
                <Label>Contrast:</Label>
              </CtrlDuo>
              <FDSlider
                min={-1}
                max={1}
                step={0.02}
                value={display.imageSettings.contrast}
                onChange={(event) =>
                  setContrast(event.currentTarget.valueAsNumber)
                }
              />
            </Row>
          </>
        )}

        <Row className="h-7">
          <CtrlDuo>
            <RefreshIcon className="h-7 w-7Te" />
            <Label>Invert</Label>
          </CtrlDuo>
          <Switch
            onChange={(value) => setInvert(value)}
            value={display.imageSettings.invert}
          />
        </Row>
        <Row className="h-7">
          <CtrlDuo>
            <LightningBoltIcon className="h-7 w-7" />
            <Label>Dither</Label>
          </CtrlDuo>
          <Switch
            onChange={(value) => setDither(value)}
            value={display.imageSettings.dither}
          />
        </Row>
      </div>

      <div className="relative flex flex-col p-4 bg-gray-700 rounded-2xl">
        <Title className="mb-8">Text Settings</Title>
        <Row>
          <TextInput
            placeholder={"Enter text"}
            value={display.textSettings.text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
        </Row>
        <Row>
          <CtrlDuo>
            <TranslateIcon className="h-7 w-7" />
            <Label>Font:</Label>
          </CtrlDuo>
          <CtrlDuo>
            <StyledSelect
              style={{ width: "180px" }}
              defaultValue={display.textSettings.font}
              onChange={(e) => setfontName(e.currentTarget.value)}
            >
              <option value={fontSmaller}>smaller</option>
              <option value={fontSmall}>small</option>
              <option value={fontMedium}>medium</option>
              <option value={fontLarge}>large</option>
            </StyledSelect>
            <Value>{display.textSettings.font}</Value>
          </CtrlDuo>
        </Row>
        <Row>
          <CtrlDuo>
            <SwitchHorizontalIcon className="h-7 w-7Te" />
            <Label>Icon width:</Label>
          </CtrlDuo>
          <FDSlider
            disabled={!display.textSettings.text.length}
            min={0.1}
            max={0.9}
            step={0.01}
            value={display.textWithIconSettings.iconWidthMultiplier}
            onChange={(event) =>
              setIconWidthMultiplier(event.currentTarget.valueAsNumber)
            }
          />
        </Row>
      </div>
    </div>
  );
};
