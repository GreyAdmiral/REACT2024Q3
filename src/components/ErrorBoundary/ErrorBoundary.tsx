import { Component, ErrorInfo, PropsWithChildren } from 'react';
import { ErrorPage } from '@pages/ErrorPage/ErrorPage';

interface ErrorBoundaryState {
   hasError: boolean;
   error: Error | null;
}

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
   constructor(props: PropsWithChildren) {
      super(props);
      this.state = { hasError: false, error: null };
   }

   static getDerivedStateFromError(error: Error) {
      return { hasError: true, error: error };
   }

   componentDidCatch(_error: Error, info: ErrorInfo) {
      info.componentStack && console.error(`Component Stack: ${info.componentStack}.`);
      info.digest && console.error(`Digest: ${info.digest}.`);
   }

   render() {
      if (this.state.hasError) {
         return <ErrorPage error={this.state.error} />;
      }

      return this.props.children;
   }
}
