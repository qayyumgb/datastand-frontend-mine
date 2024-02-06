interface Window {
  top: string;
  left: string;
  isVisible: boolean;
}

export interface WorkbenchWindows {
  comments: Window;
  labelSet: Window;
  suggestions: Window;
  tokenizers: Window;
  tokenLayers: Window;
}
