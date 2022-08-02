import React, { useContext } from "react";

import { FDButton } from "../lib/components/Button";
import { Divider } from "../lib/components/Divider";
import { Label } from "../lib/components/LabelValue";
import { Row } from "../lib/components/Row";
import { FDSelect } from "../lib/components/SelectInput";
import { FDSlider } from "../lib/components/Slider";
import { TitleBox } from "../lib/components/Title";
import { AppStateContext } from "../states/appState";
import {
  ConfigDispatchContext,
  ConfigStateContext,
} from "../states/configState";

export const Displays: React.FC<{}> = () => {
  const configState = useContext(ConfigStateContext);
  const configDispatch = useContext(ConfigDispatchContext);
  const appState = useContext(AppStateContext);
  return (
    <div className="w-full">
      <TitleBox title="Displays">
        <Row>
          <Label>Brightness:</Label>
          <FDSlider
            min={0}
            max={255}
            value={configState.brightness}
            onChange={(e) =>
              configDispatch.setBrightness(e.currentTarget.valueAsNumber)
            }
          />
        </Row>
        <Row>
          <Label>Screen saver timeout:</Label>
          <FDSelect
            className="w-44"
            onChange={(value) => configDispatch.setScreenSaver(value)}
            value={configState.screenSaverTimeout}
            defaultValue={0}
            options={[
              { text: "never", value: 0 },
              { text: "5s", value: 5 },
              { text: "10s", value: 10 },
              { text: "30s", value: 30 },
              { text: "1min", value: 60 },
              { text: "2min", value: 60 * 2 },
              { text: "5min", value: 60 * 5 },
              { text: "15min", value: 60 * 15 },
            ]}
          />
        </Row>
      </TitleBox>
      <Divider />
      <TitleBox title="Advanced (currently only freedeck-pico)">
        <Row>
          <Label hint="similar to fps">OLED speed:</Label>
          <FDSlider
            min={1}
            max={255}
            value={configState.oledSpeed}
            onChange={(e) =>
              configDispatch.setOledSpeed(e.currentTarget.valueAsNumber)
            }
          />
        </Row>
        <Row>
          <Label hint="just play with this value to reduce noise">
            Pre charge period:
          </Label>
          <FDSlider
            min={0}
            max={255}
            value={configState.preChargePeriod}
            onChange={(e) =>
              configDispatch.setPreChargePeriod(e.currentTarget.valueAsNumber)
            }
          />
        </Row>
        <Row>
          <Label hint="just play with this value to reduce flickering, higher is better">
            Clock frequency:
          </Label>
          <FDSlider
            min={0}
            max={15}
            value={configState.clockFreq}
            onChange={(e) =>
              configDispatch.setClockFreq(e.currentTarget.valueAsNumber)
            }
          />
        </Row>
        <Row>
          <Label hint="just play with this value to reduce flickering, lower is better">
            Clock divider:
          </Label>
          <FDSlider
            min={0}
            max={15}
            value={configState.clockDiv}
            onChange={(e) =>
              configDispatch.setClockDiv(e.currentTarget.valueAsNumber)
            }
          />
        </Row>
        <Row>
          <Label hint="this is only temporary, you still need to save">
            Try it out:
          </Label>
          <FDButton
            onClick={() =>
              appState.serialApi?.testOledParameters(
                configState.oledSpeed,
                configState.preChargePeriod,
                configState.clockFreq,
                configState.clockDiv
              )
            }
          >
            Try
          </FDButton>
        </Row>
      </TitleBox>
    </div>
  );
};
