import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode; name?: string };

/** One broken section must not blank the page (FR-16). */
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.error(`Section "${this.props.name ?? 'unknown'}" failed`, error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
