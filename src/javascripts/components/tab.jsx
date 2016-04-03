import cx from 'classnames';

export default class Tab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className={cx('tab', {active: this.props.active})}
          onClick={this.props.changeTab.bind(this, this.props.index)}>
        {this.props.children}
      </li>
    );
  }
}