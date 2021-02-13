import React, { Component } from 'react';
import {View,Text,ScrollView} from 'react-native'
import Accordion from 'react-native-collapsible/Accordion';


class AccordionScrollView extends Component {
  state = {
    activeSections: [],
  };

  _renderSectionTitle = section => {
    return (
      null
    );
  };

  _renderHeader = section => {
    return (
      <View key={section.title} style={{borderWidth:0.3}}>
        <Text >{section.title}</Text>
        <Text >{section.title}</Text>
        <Text >{section.title}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View key={section.title} >
        <Text>{section.content}</Text>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <Accordion
        sections={this.props.sections}
        activeSections={this.state.activeSections}
        renderSectionTitle={this._renderSectionTitle}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    );
  }
}
export default AccordionScrollView
