import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const profileImageSize = 36;
const padding = 12;

export default class Item extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};

  onPress = () => {
    console.log("it pressed!")
    this.props.onPressList();
  };

  componentDidMount() {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({ width, height });
      });
    }
  }

  createComments = (comments) => {
    let createdComments = []
    var i
    for (i = 0; i < comments.length; i++) {
      comment = comments[i]
      createdComments.push(<Comments comment={comment} key={i}/>)
    }
    return createdComments
  }

  render() {
    const {text, name, comments, imageWidth, imageHeight, uid, image } = this.props;

    // Reduce the name to something
    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;

    return (
      <View>
        <Header image={{ uri: image }} name={name} />
        <Image
          resizeMode="contain"
          style={{
            backgroundColor: '#D8D8D8',
            width: '100%',
            aspectRatio: aspect,
          }}
          source={{ uri: image }}
        />
        <TouchableHighlight
          underlayColor={'#eeeeee'}
          onPress={this.onPress}
        >
          <Metadata name={name} description={text} />
        </TouchableHighlight>
        {this.createComments(comments)}
      </View>
    );
  }
}

const Metadata = ({ name, description }) => (
  <View style={styles.padding}>
    <IconBar />
    <Text style={styles.text}>{name}</Text>
    <Text style={styles.subtitle}>{description}</Text>
  </View>
);

const Comments = ({comment}) => (
  <View style={styles.padding}>
    <Text style={styles.subtitle}>{comment}</Text>
  </View>
);

const Header = ({ name, image }) => (
  <View style={[styles.row, styles.padding]}>
    <View style={styles.row}>
      <Image style={styles.avatar} source={image} />
      <Text style={styles.text}>{name}</Text>
    </View>
    <Icon name="ios-more" />
  </View>
);

const Icon = ({ name }) => (
  <Ionicons style={{ marginRight: 8 }} name={name} size={26} color="black" />
);

const IconBar = () => (
  <View style={styles.row}>
    <View style={styles.row}>
      <Icon name="ios-heart-outline" />


        <Icon name="ios-chatbubbles-outline" />


      <Icon name="ios-send-outline" />
    </View>
    <Icon name="ios-bookmark-outline" />
  </View>
);

const styles = StyleSheet.create({
  text: { fontWeight: '600' },
  subtitle: {
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  padding: {
    padding,
  },
  avatar: {
    aspectRatio: 1,
    backgroundColor: '#D8D8D8',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797',
    borderRadius: profileImageSize / 2,
    width: profileImageSize,
    height: profileImageSize,
    resizeMode: 'cover',
    marginRight: padding,
  },
});
