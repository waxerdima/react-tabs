import 'tabs.scss';

import TabPanel from 'components/tab_panel';
import TabList from 'components/tab_list';

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: parseInt(this.props.active) || 1
    }
  }

  changeTab(tab) {
    this.setState({
      active: tab + 1
    }, () => {
      this.props.onChange && this.props.onChange(tab + 1);
    });
  }

  children() {
    var panelIndex = 0;
    return React.Children.map(this.props.children, function(tab) {
      if (TabList === tab.type) {
        return React.cloneElement(tab, {
          active: this.state.active,
          changeTab: this.changeTab.bind(this)
        });
      }
      if (TabPanel === tab.type) {
        panelIndex++;
        return React.cloneElement(tab, {
          active: panelIndex === this.state.active
        });
      }
    }, this);
  }

  render() {
    return (
      <div className='react-tabs'>
        {this.children()}
      </div>
    );
  }
}