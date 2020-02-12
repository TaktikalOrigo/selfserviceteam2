import React from "react";
import { StandardError, handleError } from "@taktikal/error";

interface Props {
  children?: React.ReactNode;
  onError?: (error: StandardError) => void;
  FallbackComponent: React.ComponentType<{}>;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public readonly state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: any) {
    const [err] = handleError(error);
    this.setState({ hasError: true });

    if (this.props.onError) {
      this.props.onError(err);
    }
  }

  public render() {
    const { hasError } = this.state;
    const { children, FallbackComponent } = this.props;

    return hasError ? <FallbackComponent /> : children;
  }
}
