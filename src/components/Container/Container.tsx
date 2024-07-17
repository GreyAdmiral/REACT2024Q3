import { Component, ReactNode } from 'react';

interface ContainerProps extends React.PropsWithChildren {
   className?: string;
}

export class Container extends Component<ContainerProps> {
   constructor(props: ContainerProps) {
      super(props);
   }

   render(): ReactNode {
      const { className } = this.props;

      return <div className={className ? `${className}-container` : 'container'}>{this.props.children}</div>;
   }
}
