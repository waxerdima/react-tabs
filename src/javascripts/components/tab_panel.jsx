export default class TabPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let stylePanel = {
      display: this.props.active ? 'block' : 'none'
    };

    return (
      <div className='tab-panel' style={stylePanel}>
        {this.props.children}
      </div>
    );
  }
}

