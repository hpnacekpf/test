import { PureComponent } from "react";

class ScrollIntoView extends PureComponent {
  // componentDidMount = () => window.scrollTo(0, 0);

  render = () => this.props.children
}

export default ScrollIntoView;