"use client";

declare module "react-mic" {
  import * as React from "react";

  export interface ReactMicProps {
    record: boolean;
    className?: string;
    style?: React.CSSProperties;
    backgroundColor?: string;
    strokeColor?: string;
    mimeType?: string;
    onStop?: (recordedData: { blob: Blob; startTime: number; stopTime: number; blobURL: string }) => void;
    onData?: (data: any) => void;
  }

  export class ReactMic extends React.Component<ReactMicProps> {}
}
