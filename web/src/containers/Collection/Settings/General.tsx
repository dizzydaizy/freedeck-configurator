import React, { useContext } from "react";

import { Label } from "../../../lib/components/LabelValue";
import { Row } from "../../../lib/components/Row";
import { TextInput } from "../../../lib/components/TextInput";
import {
  ConfigDispatchContext,
  ConfigStateContext,
} from "../../../states/configState";

export const CollectionGeneralSettings: React.FC<{ collectionId: string }> = ({
  collectionId,
}) => {
  const configState = useContext(ConfigStateContext);
  const { renameCollection } = useContext(ConfigDispatchContext);
  const collection = configState.collections.byId[collectionId];

  return (
    <div className="p-8 w-full">
      <Row className="h-8">
        <Label>Name</Label>
        <TextInput
          className="w-44"
          placeholder="Enter page name"
          value={collection.name}
          onChange={(name) => renameCollection({ collectionId, name })}
        />
      </Row>
    </div>
  );
};
