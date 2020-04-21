import Jimp from "jimp";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";

import { composeImage, composeText } from "../lib/convertFile";
import { handleFileSelect } from "../lib/fileSelect";
import { IRow, parseRow, EAction } from "../lib/parse/parsePage";
import { getBase64Image } from "../lib/uint8ToBase64";
import { ActionSettings } from "./ActionSettings";
import { ImageSettings, fontLarge } from "./ImageSettings";
import { Modal } from "./modal";
import { Column, Row } from "./lib/misc";

const Wrapper = styled.div<{ opacity: number }>`
  opacity: ${(p) => p.opacity};
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  z-index: 10;
`;
const ImagePreview = styled.img<{ multiplier: number }>`
  width: ${(p) => p.multiplier * 128}px;
  height: ${(p) => p.multiplier * 64}px;
  image-rendering: pixelated;
  cursor: pointer;
`;
const DropWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 128px;
  background-color: #000000a1;
  border-radius: 16px;
`;
const DeleteImage = styled.img`
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  height: 22px;
  width: 22px;
  top: -8px;
  right: -8px;
  position: absolute;
  border-style: none;
  visibility: hidden;
  z-index: 10;
  ${DropWrapper}:hover & {
    visibility: visible;
  }
`;

const Drop = styled.div`
  border-radius: 8px;
  border-top: none;
  border-bottom: none;
`;

const DropHere = styled.div`
  font-size: 24px;
  color: white;
`;

export interface IImageSettings {
  contrast: number;
  dither: boolean;
  invert: boolean;
  text: string;
  textEnabled: boolean;
  fontName: string;
}

export const Display: React.FC<{
  rowBuffer: Buffer;
  images: Buffer[];
  addPage: () => number;
  setImage: (newImage: Buffer) => void;
  setRow: (newRow: Buffer, offset: number, secondaryAction?: number) => void;
  imageIndex: number;
  pages: number[];
  switchDisplays: (aIndex: number, bIndex: number) => void;
}> = ({
  rowBuffer,
  images,
  addPage,
  setImage,
  setRow: setNewRow,
  imageIndex,
  pages,
  switchDisplays,
  // connectDragSource,
}) => {
  const [row, setRow] = useState<IRow>();
  const [secondary, setSecondary] = useState<IRow>();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [newImageFile, setNewImageFile] = useState<File>();
  const [convertedImageBuffer, setConvertedImageBuffer] = useState<Buffer>();
  const [croppedImage, setCroppedImage] = useState<Jimp>();
  const [imageSettings, setImageSettings] = useState<IImageSettings>({
    contrast: -0.12,
    dither: false,
    fontName: fontLarge,
    invert: false,
    text: "",
    textEnabled: false,
  });
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const [{ opacity }, dragRef] = useDrag({
    item: { type: "display", imageIndex },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  const [{ targetDisplayIndex }, drop] = useDrop({
    accept: "display",
    drop: (item, monitor): undefined => (
      switchDisplays(targetDisplayIndex, monitor.getItem().imageIndex),
      undefined
    ),
    collect: () => ({ targetDisplayIndex: imageIndex }),
  });

  const onDrop = useCallback((acceptedFiles) => {
    setNewImageFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: [".jpg", ".jpeg", ".png"],
  });

  useEffect(() => {
    const parsedRow = parseRow(rowBuffer);
    const parsedSecondary = parseRow(rowBuffer, 8);
    setRow(parsedRow);
    setSecondary(parsedSecondary);
  }, [rowBuffer]);

  useEffect(() => {
    if (row) {
      setPreviewImage(getBase64Image(images, imageIndex));
    }
  }, [row, images]);

  const buildNewRow = useCallback((row: Buffer, settings: IRow) => {
    if (settings.action === EAction.changeLayout) {
      row.writeUInt8(1, 0);
      row.writeInt16LE(settings.page, 1);
      return row;
    } else if (settings.action === EAction.keyboard) {
      let i = 1;
      row.writeUInt8(0, 0);
      settings.keys.forEach((key, index) => {
        row.writeUInt8(Math.max(0, Math.min(key, 255)), i + index);
      });
      return row;
    } else if (settings.action === EAction.special_keys) {
      row.writeUInt8(3, 0);
      row.writeInt16LE(settings.keys[0], 1);
      return row;
    } else if (settings.action === EAction.noop) {
      row.writeUInt8(2, 0);
      return row;
    }
  }, []);

  useEffect(() => {
    console.log("ROW", imageIndex, row);
    if (row) {
      const newRow = new Buffer(8);
      buildNewRow(newRow, row);
      setNewRow(newRow, 0, secondary?.action);
    }
  }, [row]);

  useEffect(() => {
    console.log("SECOND", imageIndex, secondary);
    if (secondary) {
      const newRow = new Buffer(8);
      buildNewRow(newRow, secondary);
      setNewRow(newRow, 0, undefined);
    }
  }, [secondary]);

  useEffect(() => {
    if (row && convertedImageBuffer) {
      setPreviewImage(getBase64Image([convertedImageBuffer], 0));
      setImage(convertedImageBuffer);
    }
  }, [convertedImageBuffer]);

  useEffect(() => {
    (async () => {
      if (newImageFile) {
        const arrayBuffer = await handleFileSelect(newImageFile);
        const image = await Jimp.read(Buffer.from(arrayBuffer));
        image.scaleToFit(256, 128);
        setCroppedImage(image);
        setImageSettings({ ...imageSettings, dither: true, contrast: -0.12 });
      } else {
        setImageSettings({
          ...imageSettings,
          dither: false,
          invert: false,
          contrast: 0.12,
        });
      }
    })();
  }, [newImageFile]);

  useEffect(() => {
    (async () => {
      if (croppedImage) {
        (async () => {
          const buffer = await composeImage(
            croppedImage,
            128,
            64,
            imageSettings.contrast,
            imageSettings.invert,
            imageSettings.dither,
            imageSettings.textEnabled,
            imageSettings.text,
            imageSettings.fontName
          );
          setConvertedImageBuffer(buffer);
        })();
      } else if (imageSettings.text.length) {
        const buffer = await composeText(
          128,
          64,
          imageSettings.dither,
          imageSettings.text,
          imageSettings.fontName,
          imageSettings.contrast
        );
        setConvertedImageBuffer(buffer);
      }
    })();
  }, [croppedImage, imageSettings]);

  const deleteImage = () => {
    setConvertedImageBuffer(new Buffer(1024));
    setNewImageFile(undefined);
    setCroppedImage(undefined);
    setPreviewImage(getBase64Image(images, imageIndex));
  };

  return (
    <Wrapper ref={dragRef} opacity={opacity}>
      <ImagePreview
        ref={drop}
        multiplier={1}
        onClick={() => setShowSettings(true)}
        src={previewImage}
      />
      <Modal visible={showSettings} setClose={() => setShowSettings(false)}>
        <DropWrapper>
          <DeleteImage src="close.png" onClick={deleteImage} />
          <Drop {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <DropHere>Drop Here</DropHere>
            ) : (
              <ImagePreview multiplier={2} src={previewImage} />
            )}
          </Drop>
        </DropWrapper>
        <ImageSettings
          textOnly={!newImageFile}
          show={showSettings}
          setSettings={setImageSettings}
          settings={imageSettings}
        />
        <Row>
          <Column>
            {row && (
              <ActionSettings
                pages={pages}
                row={row}
                title={"Short Press"}
                setRow={setRow}
                addPage={addPage}
              />
            )}
          </Column>
          <Column>
            {secondary && (
              <ActionSettings
                pages={pages}
                title="Long Press"
                row={secondary}
                setRow={setSecondary}
                addPage={addPage}
              />
            )}
          </Column>
        </Row>
      </Modal>
    </Wrapper>
  );
};
