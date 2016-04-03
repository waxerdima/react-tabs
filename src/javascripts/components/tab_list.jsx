export default class TabList extends React.Component {
  constructor(props) {
    super(props);
  }

  children()  {
    return React.Children.map(this.props.children, function(tab, index) {
      return React.cloneElement(tab, {
        active: (index + 1) === (parseInt(this.props.active) || 1),
        index: index,
        changeTab: this.props.changeTab
      });
    }, this);
  }

  render() {
    return (
      <ul className='tab-list'>
        {this.children()}
      </ul>
    );
  }
}