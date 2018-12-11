import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import Footer from './Footer';
import Item from './Item';

class List extends React.Component {

  onPressComment = (item) => {
    console.log("it pressed again!")
    this.props.onPressComment(item.key)
  };

  renderItem = ({ item }) => <Item {...item} onPressList={() => this.onPressComment(item)} />;
  keyExtractor = item => item.key;
  render() {
    const { onPressFooter, ...props } = this.props;
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        ListFooterComponent={footerProps => (
          <Footer {...footerProps} onPress={onPressFooter} />
        )}
        renderItem={this.renderItem}
        {...props}
      />
    );
  }
}
export default List;
