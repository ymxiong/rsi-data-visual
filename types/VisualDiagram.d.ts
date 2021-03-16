import React from 'react';

export type VisualDiagramProps = {
  test: string;
};

export type VisualDiagramHandle = {
  setView: (test: string) => boolean;
};

export declare const VisualDiagram: React.ForwardRefRenderFunction<
  VisualDiagramHandle,
  VisualDiagramProps
>;
