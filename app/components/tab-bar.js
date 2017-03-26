
import React, { Component } from 'react';
import { Tabs, Tab, Icon } from 'react-native-elements';

import Map from './map';
import Report from './report';

import style from '../styles/tab-bar';

class TabBar extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      selectedTab: 'map',
    };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(selectedTab) {
    this.setState({selectedTab});
  }

  render() {
    const { selectedTab } = this.state;

    return (
      <Tabs>
        <Tab
          titleStyle={style.titleStyle}
          selectedTitleStyle={style.selectedTitleStyle}
          selected={selectedTab === 'map'}
          title={selectedTab === 'map' ? 'MAP' : null}
          renderIcon={() => <Icon containerStyle={style.renderIcon} color={'#5e6977'} name='map' size={33} />}
          renderSelectedIcon={() => <Icon color={'#6296f9'} name='map' size={30} />}
          onPress={() => this.changeTab('map')}>
          <Map />
        </Tab>
        <Tab
          titleStyle={style.titleStyle}
          selectedTitleStyle={style.selectedTitleStyle}
          selected={selectedTab === 'report'}
          title={selectedTab === 'report' ? 'REPORT' : null}
          renderIcon={() => <Icon containerStyle={style.renderIcon} color={'#5e6977'} name='report' size={33} />}
          renderSelectedIcon={() => <Icon color={'#6296f9'} name='report' size={30} />}
          onPress={() => this.changeTab('report')}>
          <Report />
        </Tab>
      </Tabs>
    );
  }
}

export default TabBar;
