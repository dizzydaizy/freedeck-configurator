import React from "react";
import { keys } from "../../definitions/keys";
import { IButtonSetting } from "../../interfaces";
import { FDButton } from "../../lib/components/Button";
import { Label } from "../../lib/components/LabelValue";
import { Row } from "../../lib/components/Row";
import { StyledSelect } from "../../lib/components/SelectInput";
import { useTranslateKeyboardLayout } from "../../lib/localisation/keyboard";

const HotkeyKeys: React.FC<{
  values: number[];
  setKeys: (keys: number[]) => void;
}> = ({ values, setKeys }) => {
  const translatedKeys = useTranslateKeyboardLayout(values);
  return (
    <div className="flex flex-wrap gap-1">
      {translatedKeys.map((key, index) => (
        <FDButton
          size={1}
          key={`${key}-${index}`}
          onClick={() => {
            const newKeys = [...values];
            newKeys.splice(index, 1);
            setKeys(newKeys.slice(0, 7));
          }}
        >
          {key}
        </FDButton>
      ))}
    </div>
  );
};

export const Hotkeys: React.FC<{
  action: IButtonSetting;
  setKeys: (keys: number[]) => void;
  onKey: (e: React.KeyboardEvent<any>, lengthLimit?: any) => void;
}> = ({ action, setKeys, onKey }) => {
  return (
    <>
      <Row>
        <Label>Key</Label>
        <StyledSelect
          className="w-32"
          value={0}
          onChange={(e) => {
            if (action.values.length < 7)
              setKeys([...action.values, parseInt(e.target.value)]);
          }}
        >
          <option key={0} value={0}>
            Choose Key
          </option>
          {Object.keys(keys).map((keyName) => (
            <option key={keyName} value={keys[keyName]?.hid}>
              {keyName}
            </option>
          ))}
        </StyledSelect>
      </Row>
      <Row>
        <div
          className="bg-gray-400 px-2 py-1 w-full rounded text-center"
          tabIndex={0}
          onKeyDown={(e) => onKey(e)}
        >
          Click/Focus to scan
        </div>
      </Row>
      <Row>
        <div>
          <HotkeyKeys setKeys={setKeys} values={action.values} />
        </div>
      </Row>
    </>
  );
};
